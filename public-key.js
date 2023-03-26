import { Ed25519Keypair, Secp256k1Keypair } from '@mysten/sui.js';
import { generateEd25519Address, generateSecp256k1Address } from './index.js';

let privateKey = process.argv[2];
if (!privateKey) {
    console.error("Must provide a private key:");
    console.error("public-key.js {PRIVATE_KEY}");
    process.exit();
}

if (privateKey.startsWith("0x")) {
    privateKey = Buffer.from(privateKey.slice(2), 'hex');
} else {
    privateKey = Buffer.from(privateKey, 'base64');
}

// If `privateKey` length is 33 (or 65 for legacy keys) then there is likely a prepended schema byte
if (privateKey.length == 33 | privateKey.length == 65) {
    let schema = privateKey[0];
    privateKey = privateKey.slice(1, 33);

    if (schema === 0) {
        console.log("Found prepended schema byte, assuming `ED25519`");
        let publicKey = Ed25519Keypair.fromSecretKey(privateKey);
        displayAddresses(publicKey, generateEd25519Address(publicKey.getPublicKey()));
    } else if (schema === 1) {
        console.log("Found prepended schema byte, assuming `Secp256k1`");
        let publicKey = Secp256k1Keypair.fromSecretKey(privateKey);
        displayAddresses(publicKey, generateSecp256k1Address(publicKey.getPublicKey()));
    } else {
        console.error("Found prepended schema byte but unknown schema");
    }
} else if (privateKey.length == 32 | privateKey.length == 64) {
    // Could not identify schema based on prepended byte
    let schema = process.argv[3];
    if (!schema) {
        console.error("Must provide a valid encryption schema (`ED25519` or `Secp256k1`):");
        console.error("public-key.js {PRIVATE_KEY} ED25519");
        process.exit();
    }

    if (schema != 'ED25519' && schema != `Secp256k1`) {
        console.error("Did not provide valid signature schema (`ED25519` or `Secp256k1`)");
        console.error(`Provided: ${schema}`);
        process.exit();
    }

    privateKey = privateKey.slice(0, 32);
    if (schema == 'ED25519') {
        let publicKey = Ed25519Keypair.fromSecretKey(privateKey);
        displayAddresses(publicKey, generateEd25519Address(publicKey.getPublicKey()));
    } else if (schema === 'Secp256k1') {
        let publicKey = Secp256k1Keypair.fromSecretKey(privateKey);
        displayAddresses(publicKey, generateSecp256k1Address(publicKey.getPublicKey()));
    }
} else {
    console.error("Private key must be 32 bytes");
}

function displayAddresses(publicKey, addresses) {
    console.log(`publicKey: ${publicKey.getPublicKey().toString()}`);
    console.log(`oldAddress: ${addresses[0]}`);
    console.log(`newAddress: ${addresses[1]}`);
}