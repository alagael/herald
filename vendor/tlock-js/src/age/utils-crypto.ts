import {hkdf} from "@noble/hashes/hkdf"
import {sha256} from "@noble/hashes/sha256"
import {hmac} from "@noble/hashes/hmac"
import {Buffer} from "buffer"

export function createMacKey(fileKey: Uint8Array, macMessage: string, headerText: string): Uint8Array {
    // empty string salt as per the spec!
    const hmacKey = hkdf(sha256, fileKey, "", Buffer.from(macMessage, "utf8"), 32)
    return Buffer.from(hmac(sha256, hmacKey, Buffer.from(headerText, "utf8")))
}

// returns a string of n bytes read from a CSPRNG like /dev/urandom.
export async function random(n: number): Promise<Uint8Array> {
    // Alagael patch: Web Crypto exists in every browser and in Node 19+, so use it everywhere.
    return globalThis.crypto.getRandomValues(new Uint8Array(n))
}
