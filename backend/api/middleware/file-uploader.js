const path = require('path')
const multer = require('multer')
const { createId } = require('@paralleldrive/cuid2')


const FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
const defaultPath = path.join(__dirname, '..', '..', 'uploaded-files')

const generateFileName = (req) => {
    return `${createId()}-${new Date().toISOString().replace(/:/g, '-')}`
}



const makeFileUploader = ({ dest = defaultPath, getFileName = generateFileName, fieldName }) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dest)
        },
        filename: (req, file, cb) => {
            file.rawFileName = getFileName(req)
            file.extname = path.extname(file.originalname)
            cb(null, `${file.rawFileName}${file.extname}`)
        },
    })


    const fileFilter = (req, file, cb) => {
        if (FILE_TYPES.includes(file.mimetype)) {
            return cb(null, true)
        }
        return cb(new Error(`Wrong file type: ${file.mimetype}`), null)
    }

    const fileLimits = {
        fileSize: 1024 * 1024 * 20
    }


    const upload = multer({
        storage: storage,
        limits: fileLimits,
        fileFilter: fileFilter
    })

    return upload.single(fieldName)
}




module.exports = {
    fileUploader: makeFileUploader
}