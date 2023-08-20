// Define tu clave de API de OpenAI
const apiKey = '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';

// Define el mensaje del usuario
const userMessage = 'hola';

// Envía una solicitud ChatCompletion para contar hasta 100
async function getChatResponse() {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
            temperature: 0,
        }),
    });

    const responseData = await response.json();
    return responseData.choices[0].message.content;
}

// Llama a la función para obtener la respuesta
getChatResponse()
    .then(responseText => {
        console.log('Respuesta completa recibida:', responseText);
    })
    .catch(error => {
        console.error('Ocurrió un error:', error);
    });
