// Herald: a last letter that opens only after a drand round AND with k-of-n Keeper shares.
//
//   letter --AES-256-GCM(random key)--> inner ciphertext --tlock(round)--> sealed letter (age armor)
//   random key --SLIP-39 k-of-n--> Keeper shares
//
// Opening requires both: the drand beacon for the round (proves the date has passed)
// and at least k Keeper shares (to rebuild the AES key).

import { Buffer } from "buffer";
import { createTimelockEncrypter } from "../../vendor/tlock-js/src/drand/timelock-encrypter";
import { createTimelockDecrypter } from "../../vendor/tlock-js/src/drand/timelock-decrypter";
import { encryptAge, decryptAge } from "../../vendor/tlock-js/src/age/age-encrypt-decrypt";
import { encodeArmor, decodeArmor, isProbablyArmored } from "../../vendor/tlock-js/src/age/armor";
import { ChainClient, ChainInfo, roundAt, roundTime } from "./drand";
import { combineMnemonics, generateMnemonics, shareFromMnemonic } from "./slip39";

const HEADER = "ALAGAEL HERALD v1";

export interface SealResult {
  sealed: string;
  shares: string[];
  round: number;
  opensAt: Date;
  threshold: number;
}

function b64(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}
function unb64(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** First drand round at or after `date`. */
export function roundForDate(info: ChainInfo, date: Date): number {
  const r = roundAt(date.getTime(), info);
  return roundTime(info, r) < date.getTime() ? r + 1 : r;
}

export async function sealLetter(opts: {
  letter: string;
  opensAt: Date;
  threshold: number;
  keepers: number;
  client: ChainClient;
  /** Re-seal with the key held by existing Keepers (at least their threshold of shares). Keepers keep their shares. */
  existingShares?: string[];
}): Promise<SealResult> {
  const { letter, opensAt, client } = opts;
  let { threshold, keepers } = opts;
  if (!letter.trim()) throw new Error("Write the letter first.");
  const info = await client.chain().info();
  if (opensAt.getTime() <= Date.now()) throw new Error("The opening date must be in the future.");
  const round = roundForDate(info, opensAt);

  let key: Uint8Array;
  const reuse = opts.existingShares?.map((s) => s.trim()).filter(Boolean) ?? [];
  if (reuse.length) {
    key = await combineMnemonics(reuse, "", true);
    if (key.length !== 32) throw new Error("These shares are not Herald Keeper shares.");
    const s = shareFromMnemonic(reuse[0]);
    threshold = s.memberThreshold;
    keepers = 0; // unknown: the original count is not stored in the shares
  } else {
    if (threshold < 1 || threshold > keepers || keepers > 16) throw new Error("Choose between 1 and 16 Keepers, with a threshold no larger than the Keeper count.");
    if (threshold === 1 && keepers > 1) throw new Error("A threshold of 1 with several Keepers gives each Keeper the full key. Use at least 2.");
    key = crypto.getRandomValues(new Uint8Array(32));
  }
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const aesKey = await crypto.subtle.importKey("raw", key as BufferSource, "AES-GCM", false, ["encrypt"]);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, new TextEncoder().encode(letter)));
  const inner = new TextEncoder().encode(JSON.stringify({ v: 1, alg: "AES-256-GCM", iv: b64(iv), ct: b64(ct) }));

  const age = await encryptAge(Buffer.from(inner), createTimelockEncrypter(client as never, round));
  const armored = encodeArmor(age);

  const shares = reuse.length ? [] : (await generateMnemonics(key, { groups: [[threshold, keepers]], iterationExponent: 0 }))[0];
  key.fill(0);

  const opens = new Date(roundTime(info, round));
  const sealed = [
    `# ${HEADER}`,
    `# Opens after: ${opens.toISOString()} (drand quicknet round ${round})`,
    `# Needs: ${threshold}${keepers ? ` of ${keepers}` : ""} Keeper shares`,
    armored.trim(),
    "",
  ].join("\n");
  return { sealed, shares, round, opensAt: opens, threshold };
}

/** Reads the header of a sealed letter without decrypting anything. */
export function inspectSealed(sealed: string): { round: number | null; opensAt: string | null; needs: string | null } {
  const round = /round (\d+)/.exec(sealed)?.[1];
  const opens = /Opens after: (\S+)/.exec(sealed)?.[1];
  const needs = /Needs: (.+)/.exec(sealed)?.[1];
  return { round: round ? Number(round) : null, opensAt: opens ?? null, needs: needs ?? null };
}

export async function openLetter(opts: { sealed: string; shares: string[]; client: ChainClient }): Promise<string> {
  const body = opts.sealed.split("\n").filter((l) => !l.startsWith("#")).join("\n").trim();
  const cipher = isProbablyArmored(body) ? decodeArmor(body) : body;

  // 1. Combine Keeper shares first: cheap, and gives a clear error before touching the network.
  const shares = opts.shares.map((s) => s.trim()).filter(Boolean);
  if (!shares.length) throw new Error("Paste the Keeper shares.");
  const key = await combineMnemonics(shares, "", true);

  // 2. Time-lock: needs the drand beacon for the round.
  const inner = await decryptAge(cipher, createTimelockDecrypter(opts.client as never));
  const parsed = JSON.parse(new TextDecoder().decode(inner as unknown as Uint8Array)) as { v: number; iv: string; ct: string };
  if (parsed.v !== 1) throw new Error("Unknown Herald format.");

  const aesKey = await crypto.subtle.importKey("raw", key as BufferSource, "AES-GCM", false, ["decrypt"]);
  key.fill(0);
  try {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(parsed.iv) as BufferSource }, aesKey, unb64(parsed.ct) as BufferSource);
    return new TextDecoder().decode(pt);
  } catch {
    throw new Error("These Keeper shares belong to a different letter.");
  }
}
