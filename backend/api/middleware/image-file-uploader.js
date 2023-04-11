const path = require('path')
const multer = require('multer')
const { createId } = require('@paralleldrive/cuid2')


const FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']


const makeMulterStorage = ({ dest }) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dest)
        },
        filename: (req, file, cb) => {
            file.rawFileName = `${createId()}-${new Date().toISOString().replace(/:/g, '-')}`
            file.extname = path.extname(file.originalname)
            cb(null, `${file.rawFileName}${path.extname(file.originalname)}`)
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

    return (fieldName) => upload.single(fieldName)
}

const imageUpload = makeMulterStorage({ dest: path.join(__dirname, '..', '..', 'uploaded-files') })


module.exports = {
    makeMulterStorage,
    imageUpload
}