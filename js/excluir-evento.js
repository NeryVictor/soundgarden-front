const inputNome = document.querySelector("#nome");
const inputAtracao = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const inputPoster = document.querySelector("#banner")
const form = document.querySelector(".col-6");

const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com'
const parametros = new URLSearchParams(window.location.search)
const parametroID = parametros.get("id");



const listarEvento = async () => {
    const optionEvents = {
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const respostaEvento = await fetch(`${BASE_URL}/events/${parametroID}`,optionEvents)

const eventos = await respostaEvento.json()
const dataEvento = new Date(eventos.scheduled);

inputNome.value = eventos.name;
inputPoster.value = eventos.poster;
inputAtracao.value = eventos.attractions;
inputDescricao.value = eventos.description;
inputData.value = dataEvento.toLocaleDateString('en-GB') + " " + dataEvento.toLocaleTimeString('en-GB').slice(0, -3);
inputLotacao.value = eventos.number_tickets;
};

listarEvento();

form.onclick = async (evento) => {
    evento.preventDefault();
    try{
        const option = {
            method: "DELETE"
        };

        const retorno = await fetch(`${BASE_URL}/events/${parametroID}`, option)
        alert("Evento excluido!")
    }catch{
        alert("Erro ao tentar excluir!")
    }
    window.location.href = "admin.html"
}