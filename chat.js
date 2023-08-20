const API_KEY = "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";
// const prompt = document.querySelector("#prompt");
// const button = document.querySelector("#generate");
// const output = document.querySelector("#output");
const p = "Hola, ¿cómo estás?";
async function getCompletion() {
  const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages:[
        {'role': 'user', 'content': 'Count to 100, with a comma between each number and no newlines. E.g., 1, 2, 3, ...'}
    ],
      
  
    
    //   prompt: prompt,
      max_tokens: 20,
    }),
  });

  const data = await response.json();
  console.log(data)
  return data;
}

getCompletion()


   

    // button.addEventListener("click", async () => {
    // console.log(prompt.value);

    // if (!prompt.value) window.alert("Please enter a prompt");

    // const response = await getCompletion(prompt.value);
    // console.log(response);
    // output.innerHTML = response.choices[0].text;
    // });








// function mostrarTexto() {
//     // Obtener el valor ingresado en el campo de entrada
//     var texto = document.getElementById("prompt").value;

//     // Mostrar el texto en el párrafo
//     document.getElementById("salida").innerText = texto;
// }