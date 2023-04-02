const path = require('path');

const people = `
Name           |  NEUID   | Slack handle | github username
Harsha vardhani rachagiri   | 002105042   | @harsha vardhani     | HarshaV0211

`.split('\n') // convert to array of lines
.filter( line => !!line.replace(/\s/g,'' )); // Remove empty lines

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for ( person of people ) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;
