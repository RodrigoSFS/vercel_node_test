const fs = require('fs');

// where we're reading data from. The second argument is a Optiot Object that is going to encode it.
const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// .on is a event listener
// just like in Java, it will happen when a event happens.
// In that case, the event is when we receive a buffer of 'data'.
// readStream.on('data', (chunk) => {
//     console.log('----- NEW CHUNK -----');
//     // console.log(chunk.toString());
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

// piping
readStream.pipe(writeStream);