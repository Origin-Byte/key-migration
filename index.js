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

function oldEd25519Address(publicKey) {
    let tmp = new Uint8Array(Ed25519PublicKey.SIZE + 1);
    tmp.set([SIGNATURE_SCHEME_TO_FLAG['ED25519']]);
    tmp.set(publicKey.toBytes(), 1);
    return bytesToHex(sha3_256(tmp)).slice(0, 40);
}

function newEd25519Address(publicKey) {
    let tmp = new Uint8Array(Ed25519PublicKey.SIZE + 1);
    tmp.set([SIGNATURE_SCHEME_TO_FLAG['ED25519']]);
    tmp.set(publicKey.toBytes(), 1);
    return bytesToHex(blake2b(tmp, { dkLen: 32 })).slice(0, 64);
}

export function generateEd25519Address(publicKey) {
    if (!(publicKey instanceof Ed25519PublicKey)) {
        throw new Error("publicKey was not instance of `Ed25519PublicKey`");
    }

    return [
        normalize(oldEd25519Address(publicKey), 20),
        normalize(newEd25519Address(publicKey), 32),
    ];
}

function oldSecp256k1Address(publicKey) {
    let tmp = new Uint8Array(Secp256k1PublicKey.SIZE + 1);
    tmp.set([SIGNATURE_SCHEME_TO_FLAG['Secp256k1']]);
    tmp.set(publicKey.toBytes(), 1);
    return bytesToHex(sha3_256(tmp)).slice(0, 40);
}

function newSecp256k1Address(publicKey) {
    let tmp = new Uint8Array(Secp256k1PublicKey.SIZE + 1);
    tmp.set([SIGNATURE_SCHEME_TO_FLAG['Secp256k1']]);
    tmp.set(publicKey.toBytes(), 1);
    return bytesToHex(blake2b(tmp, { dkLen: 32 })).slice(0, 64);
}

export function generateSecp256k1Address(publicKey) {
    if (!(publicKey instanceof Secp256k1PublicKey)) {
        throw new Error("publicKey was not instance of `Secp256k1PublicKey`");
    }

    return [
        normalize(oldSecp256k1Address(publicKey), 20),
        normalize(newSecp256k1Address(publicKey), 30),
    ];
}