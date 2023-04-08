
const fs = require('fs');
const path = require('path')
const util = require('util');
const unlink = util.promisify(fs.unlink);
const rename = util.promisify(fs.rename);

const filesDir = path.join(__dirname, '..', '..', 'uploaded-files')

exports.moveFile = async ({ path }) => {
    if (!path) return
    await rename(path, filesDir)
    console.log('File Moved');
}


exports.deleteFile = async ({ path }) => {
    if (!path) return
    await unlink(req.file.path)
    console.log('File deleted');
}