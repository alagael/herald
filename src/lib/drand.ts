// Minimal drand client, standing in for the "drand-client" package that tlock-js imports.
// Chain info for quicknet is pinned, so sealing works fully offline.
// Opening needs the beacon for the target round: fetched from public drand relays,
// verified locally with BLS, or pasted by hand when the network is unreachable.

import { bls12_381 } from "@noble/curves/bls12-381";
import { sha256 } from "@noble/hashes/sha2";

export interface ChainInfo {
  public_key: string;
  period: number;
  genesis_time: number;
  hash: string;
  groupHash?: string;
  schemeID: string;
  metadata?: { beaconID: string };
}

export interface RandomnessBeacon {
  round: number;
  randomness?: string;
  signature: string;
}

export interface ChainClient {
  chain(): { info(): Promise<ChainInfo> };
  get(round: number): Promise<RandomnessBeacon>;
}

export async function fetchBeacon(client: ChainClient, round: number): Promise<RandomnessBeacon> {
  return client.get(round);
}

/** Unix time in ms at which `round` is emitted. */
export function roundTime(info: ChainInfo, round: number): number {
  const r = round < 0 ? 0 : round;
  return (info.genesis_time + (r - 1) * info.period) * 1000;
}

/** The latest round emitted at unix time `time` (ms). */
export function roundAt(time: number, info: ChainInfo): number {
  if (time < info.genesis_time * 1000) throw new Error("Cannot request a round before the genesis time");
  return Math.floor((time - info.genesis_time * 1000) / (info.period * 1000)) + 1;
}

/** drand quicknet (mainnet, 3 s rounds, BLS signatures on G1, RFC 9380). Same values as tlock-js. */
export const QUICKNET: ChainInfo = {
  public_key:
    "83cf0f2896adee7eb8b5f01fcad3912212c437e0073e911fb90022d3e760183c8c4b450b6a0a6c3ac6a5776a2d1064510d1fec758c921cc22b0e17e63aaf4bcb5ed66304de9cf809bd274ca73bab4af5a6e9c76a4bc09e76eae8991ef5ece45a",
  period: 3,
  genesis_time: 1692803367,
  hash: "52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971",
  groupHash: "f477d5c89f21a17c863a7f937c6a6d15859414d2be09cd448d4279af331c5d3e",
  schemeID: "bls-unchained-g1-rfc9380",
  metadata: { beaconID: "quicknet" },
};

export const QUICKNET_RELAYS = [
  "https://api.drand.sh",
  "https://api2.drand.sh",
  "https://api3.drand.sh",
  "https://drand.cloudflare.com",
];

export function beaconUrls(info: ChainInfo, round: number, relays = QUICKNET_RELAYS): string[] {
  return relays.map((r) => `${r}/${info.hash}/public/${round}`);
}

function hexToBytes(hex: string): Uint8Array {
  const h = hex.trim().replace(/^0x/, "");
  if (h.length % 2 || /[^0-9a-f]/i.test(h)) throw new Error("Invalid hex");
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function roundMessage(round: number): Uint8Array {
  const b = new Uint8Array(8);
  new DataView(b.buffer).setBigUint64(0, BigInt(round));
  return sha256(b);
}

/** Verify an unchained G1 (RFC 9380) beacon signature against the chain public key. */
export function verifyBeacon(info: ChainInfo, round: number, signatureHex: string): boolean {
  if (info.schemeID !== "bls-unchained-g1-rfc9380") throw new Error(`Unsupported scheme ${info.schemeID}`);
  try {
    return bls12_381.verifyShortSignature(hexToBytes(signatureHex), roundMessage(round), hexToBytes(info.public_key));
  } catch {
    return false;
  }
}

export type ManualBeaconProvider = (round: number, urls: string[]) => Promise<string>;

/** Client for a fixed chain: fetches beacons from relays, falls back to a manual provider. */
export class PinnedChainClient implements ChainClient {
  constructor(
    private readonly info: ChainInfo = QUICKNET,
    private readonly manual?: ManualBeaconProvider,
    private readonly relays: string[] = QUICKNET_RELAYS,
  ) {}

  chain() {
    return { info: async () => this.info };
  }

  async get(round: number): Promise<RandomnessBeacon> {
    const urls = beaconUrls(this.info, round, this.relays);
    for (const url of urls) {
      try {
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) continue;
        const json = (await res.json()) as RandomnessBeacon;
        if (json.round === round && verifyBeacon(this.info, round, json.signature)) return json;
      } catch {
        /* try the next relay */
      }
    }
    if (!this.manual) throw new Error("Could not reach drand to fetch the beacon for this round.");
    const pasted = await this.manual(round, urls);
    const signature = extractSignature(pasted);
    if (!verifyBeacon(this.info, round, signature)) throw new Error("That beacon signature is not valid for this round.");
    return { round, signature };
  }
}

/** Accepts either the raw signature hex or the JSON returned by a drand relay. */
export function extractSignature(input: string): string {
  const t = input.trim();
  if (t.startsWith("{")) {
    const j = JSON.parse(t) as RandomnessBeacon;
    return j.signature;
  }
  return t;
}
