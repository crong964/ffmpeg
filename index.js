const { spawn } = require('node:child_process');
const ls = spawn('ls');
const fs = require("fs")
ls.stdout.on('data', (data) => {
    var ls = data.toString().split(`\n`);
    var w = fs.createWriteStream("index.html")
    for (let i = 0; i < ls.length; i++) {
        const element = ls[i];
        if (element.indexOf("html") >= 0) {
            w.write(`<a target="_blank" href="${element}">${element}</a><br>`)
        }

    }
    w.end()
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});