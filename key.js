import crypto from "crypto";
import secp256k1 from "secp256k1";
import createKeccakHash from "keccak";
import { checkServerIdentity } from "tls";

function createPrivateKey() {
    let privateKey;
    do{
        privateKey = crypto.randomBytes(32);
    } while (secp256k1.privateKeyVerify(privateKey) === false);
    return privateKey;
}

function createPublicKey(privateKey, compressed = false) {
    return Buffer.from( secp256k1.publicKeyCreate(privateKey, compressed));
}

function createAddress(publicKey) {
    const hash = createKeccakHash("keccak256").update(publicKey.slice(1)).digest("hex");
    return "0x" + hash.slice(24);
}


function toChecksumAddress (address) {
    address = address.toLowerCase().replace('0x', '')
    var hash = createKeccakHash('keccak256').update(address).digest('hex')
    var ret = '0x'
  
    for (var i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase()
      } else {
        ret += address[i]
      }
    }
  
    return ret
  }
const privateKey = createPrivateKey();
const publicKey = createPublicKey(privateKey);
const address = createAddress(publicKey);

const ChecksumAddress = toChecksumAddress(address);

console.log(address);
console.log(ChecksumAddress);