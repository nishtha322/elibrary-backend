// aiService.js
const axios = require("axios");

async function generateBookSummary(book, reviews = []) {
    let readerFeedback = "No reader reviews are available yet.";

    if (reviews.length > 0) {
        readerFeedback = reviews
            .map(
                (item, index) =>
                    `Reader ${index + 1} - Rating: ${item.rating}/5
Review: ${item.review || "No written review"}`
            )
            .join("\n\n");
    }

    const response = await axios.post(
        "https://ai-api.userfacet.com/v1/chat/completions",
        {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        `You are an assistant that creates concise, accurate summaries of books.

Your response must contain exactly two sections:

1. Book Summary
2. What Readers Are Saying

For "Book Summary", summarize only the book content provided.

For "What Readers Are Saying", summarize only the actual reader reviews provided. Do not invent opinions or information that is not present in the reviews.

If there are no reviews, say that no reader reviews are available yet.`
                },
                {
                    role: "user",
                    content: `Create a concise summary of the following book.

Title: ${book.title}
Author: ${book.author}

Book content:
${book.content}

Reader reviews and ratings:
${readerFeedback}`
                }
            ],
            max_tokens: 1200,
            temperature: 0.3
        },
      {
    timeout: 15000,
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