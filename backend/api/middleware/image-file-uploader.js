const path = require('path')
const multer = require('multer')


const FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']


module.exports.makeMulterStorage = ({ dest }) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dest)
        },
        filename: (req, file, cb) => {
            if (!req.user) {
                return cb(new Error('User must be provided'), null)
            }
            file.rawFileName = `${req.user._id}-${new Date().getTime()}`
            file.extname = path.extname(file.originalname)
            cb(null, `${file.rawFileName}${path.extname(file.originalname)}`)
            cb(null, 'aa')
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