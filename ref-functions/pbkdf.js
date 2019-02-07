var crypto = require('crypto-js');
var buffer = require('buffer/').Buffer;

// larger numbers mean better security, less
var config = {
  hashBytes: 32,
  saltBytes: 16,
  iterations: 500
};

var buf1 = new Buffer('123');
var buf2 = new Buffer('123')

function hashPassword(password, inSalt) {
  var salt = inSalt ? inSalt : crypto.lib.WordArray.random(config.saltBytes)
  var combined = crypto.PBKDF2(password, salt, { keySize: 256 / config.hashBytes, iteration: config.iterations })
  var buffer = new Buffer(combined.toString(), 'hex');
  //console.log('buffer json', buffer.toJSON(buffer), '\n buffer string',buffer.toString('hex') );
  return { 'hash': buffer.toJSON(), 'salt': salt }
}


function verifyPassword(password, savedHash) {
  console.log('old hash',savedHash)
  const newHash = hashPassword(password, savedHash.salt)
  console.log('new hash', newHash.hash)
  var compare = buffer.compare(newHash, savedHash);
  console.log('compare :', compare);
  if (compare === 0) {
    return true
  } else {
    return false
  }
}



module.exports = {
  hashPassword: hashPassword,
  verifyPassword: verifyPassword
};