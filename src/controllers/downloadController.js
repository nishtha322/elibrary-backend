const downloadService = require("../services/downloadService");

async function getDownloadHistory(req, res) {
    try {
        const downloads = await downloadService.getUserDownloadHistory(
            req.user.id
        );

        res.status(200).json({
            message: "Download history retrieved successfully",
            downloads
        });
    } catch (error) {
        console.error("Error getting download history:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getDownloadHistory
};