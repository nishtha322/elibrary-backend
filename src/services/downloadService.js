// downloadService.js
const downloadRepository = require("../repositories/downloadRepository");

async function getUserDownloadHistory(userId) {
    return downloadRepository.getDownloadsByUserId(userId);
}

module.exports = {
    getUserDownloadHistory
};