const lang = require('./language.json');

/**
 * 
 * @param {String} textId 
 * @param {String} language 
 * @returns {String}
 */
module.exports = (textId, language) => {
    if (!lang[textId]) {
        console.error(`${textId} is not a valid text id`);
        return textId.replace(/_/g, " ").toLowerCase() + ` {${textId}}`;
    }

    if ((!lang[textId][language]) && (language != null)) {
        console.warn(`Language ${language} not found for ${textId}`);
    }

    return lang[textId][language] || lang[textId]["en-GB"];
}