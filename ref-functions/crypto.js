const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
  var theSalt = await bcrypt.genSalt(saltRounds)
  var hash = await bcrypt.hash(password, theSalt);
  var code = { hash: hash, salt: theSalt }
  return code;
}

async function verifyPassword(password,hash){
  var verifier = await bcrypt.compare(password, hash);
  return verifier
}
// setTimeout(async () => {
//   console.log('hash', await hashPassword('erererdfdfgrgdf')
//   );
// }, 1000)

// setTimeout(async () => {
//   console.log('match', await verifyPassword('adsdefgfef',  '$2b$10$l6DaQIbHB4aaGddevouPPOKsMXwU1IHk5BWykGPQRLmUBZrvgio.W')
//   );
// }, 1000)

module.exports = {
  hashPassword: hashPassword,
  verifyPassword: verifyPassword
}