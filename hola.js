const axios = require('axios');

// Define your OpenAI API key
const apiKey = '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';

// Define the user message
const userMessage = 'que significa la temperatura 0 en las propiedades de la api de chatgpt ';

// Send a ChatCompletion request to count to 100
async function getChatResponse() {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
            temperature: 0,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        }
    );

    return response.data.choices[0].message.content;
}

// Call the function to get the response
getChatResponse()
    .then(responseText => {
        console.log('Full response received:', responseText);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });