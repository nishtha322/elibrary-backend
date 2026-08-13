// aiService.js
const axios = require("axios");

async function generateBookSummary(book) {
    const response = await axios.post(
        "https://ai-api.userfacet.com/v1/chat/completions",
        {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an assistant that creates concise, accurate summaries of books."
                },
                {
                    role: "user",
                    content: `Create a concise summary of the following book.

Title: ${book.title}
Author: ${book.author}

Book content:
${book.content}`
                }
            ],
            max_tokens: 1000,
            temperature: 0.3
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.AI_API_TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data.choices[0].message.content;
}

module.exports = {
    generateBookSummary
};