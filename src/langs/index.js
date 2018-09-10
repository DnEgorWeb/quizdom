import LocalizedStrings from 'react-localization'

let currentExport
try {
    const langs = {}
    const req = require.context('.', true, /.*\.json$/)
    req.keys().forEach((key) => {
        const lang = key.replace(/^.+\/([^/]+)\/.*/, '$1')
        langs[lang] = { ...langs[lang], ...req(key), }
    })
    currentExport = new LocalizedStrings(langs)
} catch (e) {
    currentExport = { setLanguage: () => {}, }
}

export default currentExport