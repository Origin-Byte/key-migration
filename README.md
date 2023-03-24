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