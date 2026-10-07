// Herald round trip against a local drand-like chain (same scheme as quicknet:
// bls-unchained-g1-rfc9380), since the real drand relays are not reachable from CI.
import { bls12_381 } from "@noble/curves/bls12-381";
import { sha256 } from "@noble/hashes/sha2";
import { ChainClient, ChainInfo, roundAt, verifyBeacon, QUICKNET, extractSignature } from "../src/lib/drand";
import { sealLetter, openLetter, inspectSealed, roundForDate } from "../src/lib/herald";

const toHex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
const sk = bls12_381.utils.randomPrivateKey();
const pk = bls12_381.getPublicKeyForShortSignatures(sk);
let now = Date.now();
const realNow = Date.now;
Date.now = () => now;

const info: ChainInfo = {
  public_key: toHex(pk), period: 3, genesis_time: Math.floor(now / 1000) - 3000,
  hash: "00".repeat(32), schemeID: "bls-unchained-g1-rfc9380",
};
const sign = (round: number) => {
  const b = new Uint8Array(8);
  new DataView(b.buffer).setBigUint64(0, BigInt(round));
  return toHex(bls12_381.signShortSignature(sha256(b), sk));
};
const client: ChainClient = {
  chain: () => ({ info: async () => info }),
  get: async (round) => {
    if (round > roundAt(now, info)) throw new Error("beacon not yet emitted");
    return { round, signature: sign(round) };
  },
};

let pass = 0, fail = 0;
const check = (name: string, ok: boolean) => { if (ok) pass++; else { fail++; console.log("FAIL", name); } };
async function throws(name: string, f: () => Promise<unknown>, re?: RegExp) {
  try { await f(); check(name, false); } catch (e) { check(name + " (" + (e as Error).message + ")", !re || re.test((e as Error).message)); }
}

const letter = "To my family: the hardware wallet is in the blue box. Ask Keeper 3 for the PIN hint. ✉️";
const opensAt = new Date(now + 60_000);
const sealed = await sealLetter({ letter, opensAt, threshold: 3, keepers: 5, client });
check("5 shares", sealed.shares.length === 5);
check("round after date", sealed.opensAt.getTime() >= opensAt.getTime());
check("header", inspectSealed(sealed.sealed).round === sealed.round);
check("sealed text has no plaintext", !sealed.sealed.includes("blue box"));

await throws("too early", () => openLetter({ sealed: sealed.sealed, shares: sealed.shares.slice(0, 3), client }), /too early/i);

now += 120_000; // time passes
const opened = await openLetter({ sealed: sealed.sealed, shares: [sealed.shares[4], sealed.shares[0], sealed.shares[2]], client });
check("opens with 3 of 5 after date", opened === letter);
const openedAll = await openLetter({ sealed: sealed.sealed, shares: sealed.shares, client });
check("opens with all 5", openedAll === letter);
await throws("2 shares not enough", () => openLetter({ sealed: sealed.sealed, shares: sealed.shares.slice(0, 2), client }));

const other = await sealLetter({ letter: "other", opensAt: new Date(now + 1000), threshold: 2, keepers: 3, client });
now += 10_000;
await throws("wrong letter's shares", () => openLetter({ sealed: sealed.sealed, shares: other.shares.slice(0, 2), client }));

// Wrong beacon (another round's signature) must not decrypt.
const liar: ChainClient = { chain: client.chain, get: async (round) => ({ round, signature: sign(round + 1) }) };
await throws("wrong beacon rejected", () => openLetter({ sealed: sealed.sealed, shares: sealed.shares.slice(0, 3), client: liar }));

// Beacon verification against a chain key.
check("verify good beacon", verifyBeacon(info, 42, sign(42)));
check("verify bad beacon", !verifyBeacon(info, 42, sign(43)));
check("extract signature from JSON", extractSignature(JSON.stringify({ round: 1, signature: "ab" })) === "ab");

// Quicknet round arithmetic.
const d = new Date("2027-01-01T00:00:00Z");
const r = roundForDate(QUICKNET, d);
check("quicknet round time >= date", (QUICKNET.genesis_time + (r - 1) * 3) * 1000 >= d.getTime());
check("quicknet round minimal", (QUICKNET.genesis_time + (r - 2) * 3) * 1000 < d.getTime());


// Re-seal (Herald Tick): same Keeper shares, later date.
{
  const first = await sealLetter({ letter: "v1", opensAt: new Date(now + 5_000), threshold: 2, keepers: 3, client });
  const resealed = await sealLetter({ letter: "v2 moved later", opensAt: new Date(now + 3_600_000), threshold: 0, keepers: 0, client, existingShares: first.shares.slice(1, 3) });
  check("reseal keeps shares", resealed.shares.length === 0 && resealed.threshold === 2);
  now += 10_000;
  await throws("resealed not open yet", () => openLetter({ sealed: resealed.sealed, shares: first.shares.slice(0, 2), client }), /too early/i);
  now += 3_700_000;
  check("resealed opens with old shares", (await openLetter({ sealed: resealed.sealed, shares: [first.shares[0], first.shares[2]], client })) === "v2 moved later");
}

Date.now = realNow;
console.log(`herald: ${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
