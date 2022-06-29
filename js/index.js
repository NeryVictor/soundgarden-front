// Declarando variavel que irá receber através do metodo (.querySelector) um elemento html por ID
const eventos = document.querySelector('#eventos');

// Declarando varivel (parametros) que ira retornar o primeiro valor associado ao (id)
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

// Função assíncrona que irá solicitar(GET) da API a lista de todos os eventos cadastrados.
listaEventos = async (evento) => {

    // URL base para acessar a API
    BASE_URL = "https://xp41-soundgarden-api.herokuapp.com"; 

    // Declara o bloco com (try...catch) onde o try marca qual o bloco-função será testado.
    // E o catch retorna uma excessao caso houver.
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        // Declarando variavel que irá receber o objeto (function) assíncrono, através do método fetch. 
        // Este irá listar através do endpoint base (URL) + diretorio especifico (events).
        const resposta = await fetch(`${BASE_URL}/events/`, requestOptions)

        // Declarando variavel que irá receber uma resposta da API em formato json.
        const conteudo = await resposta.json();
        console.log(conteudo)

        // Declarando variaveis que irão receber o método que irá criar novos elementos(articles).
        const evento1 = document.createElement('article');
        // Adicionando atributos ao alemento (article).
        evento1.setAttribute('class', 'evento card p-5 m-3');

        const evento2 = document.createElement('article');
        evento2.setAttribute('class', 'evento card p-5 m-3');

        const evento3 = document.createElement('article');
        evento3.setAttribute('class', 'evento card p-5 m-3');

        // Atribui a propriedade que define através de uma sintaxe HTML os elementos descendentes (filhos). 
        // Os elementos recebem uma varievel que possui como valor dados fornecidos pela API.
        // Estes formam os elementos (articles) que representam os card dos proximos eventos.
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

    
    // O catch retorna uma excessao caso houver. Faz parte da declaração (try...catch)
    catch (erro) {
        console.log(erro);
        alert('Não foi possivel carregar os eventos!');
    }
}
listaEventos();