const axios = require('axios');
// import OpenAI from 'openai';

// Define your OpenAI API key
const apiKey = ' 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';

// Define the user message
const userMessage = 'hola ';


async function getCurrentWeather(location) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=6e576a6ae5e74f09880182222232008&q=${location}&aqi=no`
    );
    const weatherInfo = await response.json();
    console.log(weatherInfo)
    return JSON.stringify(weatherInfo);
   
  }



// Send a ChatCompletion request to count to 100
async function getChatResponse(question) {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
            temperature: 0,
            functions: [
                      {
                        name: "getCurrentWeather",
                        // description: "Get the current weather in a given location",
                        parameters: {
                          type: "object",
                          properties: {
                            location: {
                              type: "string",
                              description: "The city, eg: Madrid, Barcelona",
                            },
                          },
                          required: ["location"],
                        },
                      },
                    ],
                    function_call: "auto",
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        }
    );

    // return response.data.choices[0].message.content;
    let message = response.data.choices[0].message;

    console.log(message.function_call);
    if (message.function_call) {
            let functionName = message.function_call.name;
            const parameters = JSON.parse(message.function_call.arguments);
            let functionResponse = await getCurrentWeather(parameters.location);
        
            //   let secondResponse = await openai.createChatCompletion({
            //     model: "gpt-3.5-turbo",
            //     messages: [
            //       {
            //         role: "user",
            //         content: `
            //         Responde en castellano en este formato: 
            //         El pronóstico del tiempo en {location} es {tiempo general}
            //         Temperatura: {temperatura en celsius}
            //         Sensación de mucho calor: Sí | No
            //         Viento: Ninguno | Poco | Mucho | Pelgroso
            //         Paraguas: Sí | No
            //         `,
            //       },
            //       message,
            //       { role: "function", name: functionName, content: functionResponse },
            //     ],
            //   });
            const secondResponse = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: `
                            Responde en castellano en este formato: 
                            El pronóstico del tiempo en {location} es {tiempo general}
                            Temperatura: {temperatura en celsius}
                            Sensación de mucho calor: Sí | No
                            Viento: Ninguno | Poco | Mucho | Pelgroso
                            Paraguas: Sí | No
                            ` ,
                        },
                            message,
                            { role: "function", name: functionName, content: functionResponse },
                        
                        ],

                    temperature: 0,
                
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );
  
      return secondResponse.data.choices[0].message;
    }

}

getChatResponse("¿Cuál es el tiempo en peru?")
  .then((response) => console.log({ response }))
  .catch((err) => console.log(err));


// // Call the function to get the response
// getChatResponse()
//     .then(responseText => {
//         console.log('mensaje de chtgpt', responseText);
//     })
//     .catch(error => {
//         console.error('An error occurred:', error);
//     });