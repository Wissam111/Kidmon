const sharp = require("sharp");
const path = require('path')
const fs = require('fs');


module.exports.makeReduceImageSize = ({ destPath }) => {
    return async (req, res, next) => {
        try {
            if (req.file.size == 0) {
                return res.status(400).json({
                    message: 'image cant be empty'
                })
            }

            const { rawFileName, filename, extname, path: filePath, destination } = req.file;
            const newFileName = rawFileName + '-' + new Date().getTime() + extname;
            const newFilePath = path.join(destPath, newFileName)
            const { image } = req.user

            await sharp(filePath)
                .webp({ quality: 100 })
                .withMetadata()
                .resize(500, 500)
                .rotate()
                .toFile(newFilePath);


            // delete old images
            if (image) {
                const oldImagePath = path.join(destPath, image)
                fs.unlink(oldImagePath, (err) => {
                });
            }
            fs.unlink(filePath, (err) => {
            });


            req.file.path = newFilePath
            req.file.destination = destPath
            req.file.filename = newFileName
            next()
        } catch (e) {
            console.log(e);
            next(new Error('Error while compression'))
        }
    }
}