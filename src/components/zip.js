'use strict'

/**
 * Helper class for creating the Zip file.
 */
import archiver from 'archiver'
import path from 'path'
import fs from 'fs'

export async function create(fullFilePath, files) {
    var output = fs.createWriteStream(fullFilePath);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    output.on('end', function() {
        console.log('Data has been drained');
    });

    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);

    for (var i = 0; i < files.length; i++) {
        let file = files[i]
        let filename = path.basename(file)
        archive.file(file, { name: filename })
    }

    archive.finalize();
}