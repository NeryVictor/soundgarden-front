const eventos = document.querySelector('#eventos');
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

listaEventos = async (evento) => {
    BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const resposta = await fetch(`${BASE_URL}/events/`, requestOptions)
        const conteudo = await resposta.json();
        console.log(conteudo)

        const evento1 = document.createElement('article');
        evento1.setAttribute('class', 'evento card p-5 m-3');

        const evento2 = document.createElement('article');
        evento2.setAttribute('class', 'evento card p-5 m-3');

        const evento3 = document.createElement('article');
        evento3.setAttribute('class', 'evento card p-5 m-3');

        evento1.innerHTML = `
        <h2>${conteudo[0].name} - ${conteudo[0].scheduled}</h2>
        <h4>${conteudo[0].attractions}</h4>
        <p>${conteudo[0].description}</p>
        <a href="./reservar-ingresso.html?id=${conteudo[0]._id}" class="btn btn-primary">reservar ingresso</a>`

        evento2.innerHTML = `
        <h2>${conteudo[1].name} - ${conteudo[1].scheduled}</h2>
        <h4>${conteudo[1].attractions}</h4>
        <p>${conteudo[1].description}</p>
        <a href="./reservar-ingresso.html?id=${conteudo[1]._id}" class="btn btn-primary">reservar ingresso</a>`

        evento3.innerHTML = `
        <h2>${conteudo[2].name} - ${conteudo[2].scheduled}</h2>
        <h4>${conteudo[2].attractions}</h4>
        <p>${conteudo[2].description}</p>
        <a href="./reservar-ingresso.html?id=${conteudo[2]._id}" class="btn btn-primary">reservar ingresso</a>`

        eventos.appendChild(evento1);
        eventos.appendChild(evento2);
        eventos.appendChild(evento3);
    }

// Alerta de erro, api nao esta fornecendo os dados dos eventos!!!

    // catch (erro) {
    //     console.log(erro);
    //     alert('Não foi possivel carregar os eventos!');
    // }
}
listaEventos();