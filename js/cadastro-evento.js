// Declarando todos os elementos da html

const inputNome = document.querySelector('#nome')
const inputAtracao = document.querySelector('#atracoes')
const inputDescricao = document.querySelector('#descricao')
const inputData = document.querySelector('#data')
const inputLotacao = document.querySelector('#lotacao')
const form = document.querySelector('form')

const modal = document.querySelector('.modalCadastro')
const btnfechar = document.querySelector('#btnFechar')
const cadastroFeito = document.querySelector('.cadastroFeito')

btnFechar.onclick = () => {
    modal.style.display = 'none';
}

form.onsubmit = async (evento) => {
    evento.preventDefault();
    const data = new Date(inputData.value).toISOString();

    var raw = {
        name: inputNome.value,
        "poster": "link da imagem",
        attractions: inputAtracao.value.split(','),
        description: inputAtracao.value,
        scheduled: data,
        number_tickets: inputLotacao.value,
    }

    var request = {
        method: 'post',
        body: JSON.stringify(raw),
        redirect:'follow', 
        headers: {
            "Content-Type": "application/json",
        }
    }
    await fetch("https://xp41-soundgarden-api.herokuapp.com/events", request)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => alert('Não foi possivel cadastrar evento.\nPreencha os dados e tente novamente'));

modal.style.display = "block";
cadastroFeito.innerHTML = `<b>${inputNome.value}</b> cadastrado com sucesso !`;

btnFechar.onclick = () => {
    window.location.href = 'admin.html';
}

// LIMPANDO O FORMULÁRIO APÓS CRIAR EVENTO
inputNome.value = '';
inputAtracao.value = '';
inputDescricao.value = '';
inputData.value = '';
inputIngresso.value = '';
}
