async function peticion() {
    const numResults = 100; // Number of data sets to fetch
    const container = document.getElementById("contenido");

    for (let i = 0; i < numResults; i++) {
        try {
            const respuesta = await fetch("https://randomuser.me/api");
            const data = await respuesta.json();

            container.innerHTML += `
                <div>
                    <img src="${data.results[0].picture.large}" width="200px"/>
                    <p>Nombre: ${data.results[0].name.first} ${data.results[0].name.last}</p>
                    <p> celular: ${data.results[0].phone}</p>
                    <p> pais: ${data.results[0].location.country  }</p>
                </div>
            `;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

peticion();