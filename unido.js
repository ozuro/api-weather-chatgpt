// Definir tu clave de API de OpenAI
const openaiApiKey = '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';

// Función para obtener una respuesta del modelo GPT-3
async function getGPT3Response(prompt) {
    try {
        // Crear una solicitud al modelo de OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: 'You are a helpful assistant that provides information.' }, { role: 'user', content: prompt }],
            }),
        });

        const responseData = await response.json();
        return responseData.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching data from GPT-3:', error);
        return 'Lo siento, ocurrió un error al obtener la respuesta.';
    }
}

// Función principal para preguntar a GPT-3 sobre personas en Estados Unidos
async function askGPT3AboutPeopleInUSA() {
    const numResults = 100;
    const peopleInUSA = [];

    for (let i = 0; i < numResults; i++) {
        try {
            const respuesta = await fetch("https://randomuser.me/api");
            const data = await respuesta.json();
            const user = data.results[0];

            const userLocation = user.location.country.toLowerCase();
            if (userLocation === 'united states') {
                peopleInUSA.push(`${user.name.first} ${user.name.last}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    if (peopleInUSA.length > 0) {
        const peopleList = peopleInUSA.join(', ');
        const prompt = `Jimmy Hart en que pais vive de acuerdo a la api: ${peopleList}.`;
        const response = await getGPT3Response(prompt);
        console.log('Respuesta generada por GPT-3:', response);
    } else {
        console.log('No se encontraron personas en Estados Unidos.');
    }
}

askGPT3AboutPeopleInUSA();
