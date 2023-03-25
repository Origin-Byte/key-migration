import { blake2b } from '@noble/hashes/blake2b';
import { sha3_256 } from '@noble/hashes/sha3';
import { bytesToHex } from '@noble/hashes/utils';
import {
    Ed25519PublicKey,
    Secp256k1PublicKey,
    SIGNATURE_SCHEME_TO_FLAG
} from '@mysten/sui.js';

function normalize(value, addressLength) {
    let address = value.toLowerCase();
    return `0x${address.padStart(addressLength * 2, '0')}`;
}

function oldAddress(flag, publicKey) {
    let tmp = new Uint8Array(publicKey.data.length + 1);
    tmp.set([SIGNATURE_SCHEME_TO_FLAG[flag]]);
    tmp.set(publicKey.toBytes(), 1);
    return bytesToHex(sha3_256(tmp)).slice(0, 40);
}

function newAddress(flag, publicKey) {
    let tmp = new Uint8Array(publicKey.data.length + 1);
    tmp.set([SIGNATURE_SCHEME_TO_FLAG[flag]]);
    tmp.set(publicKey.toBytes(), 1);
    return bytesToHex(blake2b(tmp, { dkLen: 32 })).slice(0, 64);
}

export function generateEd25519Address(publicKey) {
    if (!(publicKey instanceof Ed25519PublicKey)) {
        throw new Error("publicKey was not instance of `Ed25519PublicKey`");
    }

    return [
        normalize(oldAddress('ED25519', publicKey), 20),
        normalize(newAddress('ED25519', publicKey), 32),
    ];
}

export function generateSecp256k1Address(publicKey) {
    if (!(publicKey instanceof Secp256k1PublicKey)) {
        throw new Error("publicKey was not instance of `Secp256k1PublicKey`");
    }

    return [
        normalize(oldAddress('Secp256k1', publicKey), 20),
        normalize(newAddress('Secp256k1', publicKey), 30),
    ];
}