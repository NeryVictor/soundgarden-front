// PEGANDO OS INPUTS DO HTML
const inputNome = document.querySelector('#nome');
const inputBanner = document.querySelector('#banner');
const inputAtracao = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputIngressos = document.querySelector('#lotacao');
const btnEnviar = document.querySelector('#enviar');
const btnConfirmar = document.querySelector('#btnConfirmar');

// PEGANDO OS PARAMETROS VIA URL
const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");
const nome = parametros.get("nome");
const banner = parametros.get("banner");
const atracoes = parametros.get("atracoes");
const descricao = parametros.get("descricao");
const data = parametros.get("data");
const ingressos = parametros.get("ingressos");

// ATRIBUINDO OS PARAMETROS AOS RESPECTIVOS INPUTS

inputNome.value = nome;
inputBanner.value = banner;
inputAtracao.value = atracoes;
inputDescricao.value = descricao;
inputData.value = new Date(data).toISOString();
inputIngressos.value = ingressos;

btnEnviar.onclick = (evento) => {
    evento.preventDefault();
    document.querySelector('.fundo').style.display = 'block';
}

btnConfirmar.onclick = () => {
    editar();
    document.querySelector('.fundo').style.display = 'none';

}

const editar = async () => {

    if (inputNome.value == '' || inputData.value == '' || inputIngressos.value == '') {
        alert('Verifique os dados digitados');
        return;
    }

    const raw = {
        name: inputNome.value,
        poster: inputBanner.value,
        attractions: inputAtracao.value.split(','),
        description: inputDescricao.value,
        scheduled: new Date(inputData.value).toISOString(),
        number_tickets: inputIngressos.value,
    }

    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(raw),
        headers: {
            "Content-Type": "application/json",
        }
    };

    const resposta = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            window.location.href = './admin.html';
        })
        .catch(error => console.log('error', error));

}