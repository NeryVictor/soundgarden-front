// Declarando variaveis (input---) que irão receber através do metodo (.querySelector) 
// elementos html pelo atributo ID (#) e o elemento (form).
const inputNome = document.querySelector('#nome')
const inputAtracao = document.querySelector('#atracoes')
const inputDescricao = document.querySelector('#descricao')
const inputData = document.querySelector('#data')
const inputLotacao = document.querySelector('#lotacao')
const form = document.querySelector('form')

// Declarando variaveis (modal, btnFechar, cadastroFeito) que irão receber através do metodo (.querySelector) 
// elementos html por ID (#) e classe(.).
const modal = document.querySelector('.modalCadastro')
const btnFechar = document.querySelector('#btnFechar')
const cadastroFeito = document.querySelector('.cadastroFeito')

// Evento (onclick) na variavel (btnFechar), onde ao clicar ira aplicar a propriedade (style.display) de valor none.
btnFechar.onclick = () => {
    modal.style.display = 'none';
}

// Quando a variavel (form) for submetida (onsubmit), ira execultar uma função assíncrona.
form.onsubmit = async (evento) => {
    evento.preventDefault();
    const data = new Date(inputData.value).toISOString();

    // Declarando a variavel (raw) que ira receber os dados Cadastro Novo Evento e criar um objeto conforme a API indica.
    var raw = {
        name: inputNome.value,
        "poster": "link da imagem",
        attractions: inputAtracao.value.split(','),
        description: inputAtracao.value,
        scheduled: data,
        number_tickets: inputLotacao.value,
    }
    
    // Declarando variavel (request) que converte os dados recebidos pela var (raw) para formato JSON (JSON.stringify).
    // E através do metodo POST envia os dados para API.    
    var request = {
        method: 'post',
        body: JSON.stringify(raw),
        redirect:'follow', 
        headers: {
            "Content-Type": "application/json",
        }
    }
    // Aguarda (await) o metodo (fetch) socitiar (request) o POST dos dados na API (endpoint).
    await fetch("https://xp41-soundgarden-api.herokuapp.com/events", request)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => alert('Não foi possivel cadastrar evento.\nPreencha os dados e tente novamente'));

// Na variavel (modal) aplica a propriedade (style.display) com valor block.
modal.style.display = "block";

// Na variavel (cadastroFeito) aplica a propriedade (innerHTML) que define a sintaxe dos elementos atribuidos a mesma. 
// E exibe um modal especifico para quando a função tiver sua promise resolvida. 
cadastroFeito.innerHTML = `Evento <b>${inputNome.value}</b> cadastrado!`;

// Evento (onclick) na variavel (btnFechar), onde ao clicar ira aplicar a propriedade (location.href) direcionando para pagina admin.html.
btnFechar.onclick = () => {
    window.location.href = 'admin.html';
}

}