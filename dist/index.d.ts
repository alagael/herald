export interface ChainInfo {public_key: string; period: number; genesis_time: number; hash: string; groupHash?: string; schemeID: string; metadata?: {beaconID: string};}
export interface RandomnessBeacon {round: number; signature: string; randomness?: string; previous_signature?: string;}
export interface ChainClient {chain(): {info(): Promise<ChainInfo>}; get(round: number): Promise<RandomnessBeacon>;}
export interface SealResult {sealed: string; shares: string[]; round: number; opensAt: Date; threshold: number;}
export function sealLetter(options: {letter: string; opensAt: Date; threshold: number; keepers: number; client: ChainClient; existingShares?: string[]}): Promise<SealResult>;
export function openLetter(options: {sealed: string; shares: string[]; client: ChainClient}): Promise<string>;
export function inspectSealed(sealed: string): {round: number | null; opensAt: string | null; needs: string | null};
export function roundForDate(info: ChainInfo, date: Date): number;
export function verifyBeacon(info: ChainInfo, round: number, signatureHex: string): boolean;
export const QUICKNET: ChainInfo;
export const QUICKNET_RELAYS: string[];
export class PinnedChainClient implements ChainClient {
  constructor(info?: ChainInfo, manual?: (round: number, urls: string[]) => Promise<string>, relays?: string[]);
  chain(): {info(): Promise<ChainInfo>};
  get(round: number): Promise<RandomnessBeacon>;
}
