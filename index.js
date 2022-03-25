const archiver = require('archiver');
const fs = require('fs');

// https://stackoverflow.com/a/51518100

function zipDirectory(sourceDir, outPath) {
    return new Promise((resolve, reject) => {
        const archive = archiver('zip');
        const stream = fs.createWriteStream(outPath);

        stream.on('error', ex => reject(ex));
        stream.on('close', () => resolve());

        archive.directory(sourceDir, false);
        archive.on('error', err => reject(err));
        archive.pipe(stream);

        archive.finalize();
    });
}

zipDirectory("action_popup2", "action_popup2.xpi")
    .then(
        () => console.info("action_popup2.xpi done."),
        ex => console.error("FAILED! " + ex)
    );
