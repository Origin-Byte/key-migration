# key-migration

Library for migrating Sui addresses to new version from user public keys.

Projects which rely on persisting data across wipes generally rely on being able to restore data by airdropping objects into a list of saved addresses. This will break in `Sui 0.28` as the saved addresses will no longer be valid addresses. This library allows you to generate `pre-0.28` and `0.28` addresses for a user-provided public key so that they can be updated.

This library exposes two functions:

* `generateEd25519Address(public_key): [oldAddress, newAddress]`
* `generateSecp256k1Address(public_key): [oldAddress, newAddress]`

Correct working of the library can be verified using:

```
npm install
node tests.js
```

## Obtaining Public Keys from Private Keys

Installing the CLI (you will need to install [Node](https://nodejs.org/en)):

```
git clone https://github.com/Origin-Byte/key-migration.git
cd key-migration
npm i
```

If you have a private key from `sui.keystore` you can call the CLI without providing the signature schema as there is a prepended byte that can be used to select the correct schema.

```
node public-key.js {PRIVATE_KEY}
```

If you need to provide the schema, valid inputs are `ED25519` and `Secp256k1`.

```
node public-key.js {PRIVATE_KEY} ED25519
```

`public-key.js` assumes that all keys are encoded in `base64` unless they are prepended with `0x` in which case they will be interpreted as hexadecimal.