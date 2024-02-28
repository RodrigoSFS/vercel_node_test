const fs = require('fs');

// reading files        The function takes a error (err) if it was one, and the data that we read from the file.
// this will result a buffer, a buffer is a package of data that is being sent to us when we read the file.
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err){
        console.log(err);
    }
    // console.log(data);
    console.log(data.toString());

});

// JavaScript is Asyncronous, and to print the data it takes time, that's why the 'last line' appears fisrt.
console.log('last line');

// writing files
// three arguments, relative path, what you want to write, and the callback function.
fs.writeFile('./docs/blog1.txt', 'hello, world', () => {
    console.log('file was written');
});

// It creates a file.
fs.writeFile('./docs/blog2.txt', 'hello, world, again!', () => {
    console.log('file was written');
});

// directoriies
//Two where and name.
//If the folder already exists, it will happen a error.
//If it exists, it will be removed.
if (!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder created');
    });
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder deleted');
    })
}

// deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
    //method that deletes a file.
    fs.unlink('./docs/deleteme.txt', (err) => {
        console.log(err);
    })
    console.log('file deleted');
}