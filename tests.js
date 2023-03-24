import assert from 'assert';
import { generateEd25519Address, generateSecp256k1Address } from './index.js';
import { Ed25519PublicKey, Secp256k1PublicKey } from '@mysten/sui.js';

// Test cases from `sui/sdk/typescript/test/unit/cryptography/ed25519-publickey.test.js``
const ED_TEST_CASES = [
    [
        'UdGRWooy48vGTs0HBokIis5NK+DUjiWc9ENUlcfCCBE=',
        '3415400a4bfdf924aefa55446e5f4cd6e9a9399f',
        'd77a6cd55073e98d4029b1b0b8bd8d88f45f343dad2732fc9a7965094e635c55'
    ],
    [
        '0PTAfQmNiabgbak9U/stWZzKc5nsRqokda2qnV2DTfg=',
        '2e6dad710b343b8655825bc420783aaa5ade08c2',
        '7e8fd489c3d3cd9cc7cbcc577dc5d6de831e654edd9997d95c412d013e6eea23'
    ],
    [
        '6L/l0uhGt//9cf6nLQ0+24Uv2qanX/R6tn7lWUJX1Xk=',
        '607a2403069d547c3fbba4b9e22793c7d78abb1f',
        '3a1b4410ebe9c3386a429c349ba7929aafab739c277f97f32622b971972a14a2'
    ],
];

function testEd25519() {
    for (let keys of ED_TEST_CASES) {
        let [publicKey, oldAddress, newAddress] = keys;
        let [tOldAddress, tNewAddress] = generateEd25519Address(
            new Ed25519PublicKey(publicKey),
        );

        assert.strictEqual(oldAddress, tOldAddress);
        assert.strictEqual(newAddress, tNewAddress);
    }
}

// Test cases from `sui/sdk/typescript/test/unit/cryptography/secp256k1-publickey.test.js``
let SECP_TEST_CASES = [
    [
        'AwTC3jVFRxXc3RJIFgoQcv486QdqwYa8vBp4bgSq0gsI',
        '35057079b5dfc60d650768e2f4f92318f4ea5a77',
        'cdce00b4326fb908fdac83c35bcfbda323bfcc0618b47c66ccafbdced850efaa'
    ],
    [
        'A1F2CtldIGolO92Pm9yuxWXs5E07aX+6ZEHAnSuKOhii',
        '0187cf4234ff80862d5a1665d840df400fef29a0',
        'b588e58ed8967b6a6f9dbce76386283d374cf7389fb164189551257e32b023b2'
    ],
    [
        'Ak5rsa5Od4T6YFN/V3VIhZ/azMMYPkUilKQwc+RiaId+',
        '70eaff6b7973c57842c2272f00aa19af9f20dc1b',
        '694dd74af1e82b968822a82fb5e315f6d20e8697d5d03c0b15e0178c1a1fcfa0'
    ],
    [
        'A4XbJ3fLvV/8ONsnLHAW1nORKsoCYsHaXv9FK1beMtvY',
        'deb28f733d9f59910cb210d56a46614f9dd28360',
        '78acc6ca0003457737d755ade25a6f3a144e5e44ed6f8e6af4982c5cc75e55e7'
    ],
];

function testSecp256k1() {
    for (let keys of SECP_TEST_CASES) {
        let [publicKey, oldAddress, newAddress] = keys;
        let [tOldAddress, tNewAddress] = generateSecp256k1Address(
            new Secp256k1PublicKey(publicKey),
        );

        assert.strictEqual(oldAddress, tOldAddress);
        assert.strictEqual(newAddress, tNewAddress);
    }
}

testEd25519();
testSecp256k1();

console.log("Tests passed!");
