const translationFile = require('./translation.js')

const LANGS = {
    en: "EN",
    he: "HE",
    ar: "AR"
}

const translate = (key, lang) => {
    return translationFile[lang][key]
}


module.exports = {
    LANGS,
    translate
}