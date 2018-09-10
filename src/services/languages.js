export default class Languages {
    getInitialLanguage(language) {
        if (language === 'en') {
            return 'gb'
        }
        return language
    }

    getCountryById(countryId, langsList) {
        const country = langsList.filter(item => item.iso === countryId.toUpperCase());

        return country[0] && country[0].name;
    }

    getLangById(countryId) {
        if (countryId === 'gb') {
            return 'en'
        }
        return countryId
    }

    getLanguages(langsList) {
        return langsList.map(item => {
            return { text: item.name, value: item.iso }
        });
    }
}