const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

listaEventos = async (evento) => {
    BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        };


        const resposta = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${id}`, requestOptions)
        const conteudo = await resposta.json();

        console.log(conteudo)

        conteudo.forEach((evento, i) => {
            reservas = document.querySelector('tbody');
            novaReserva = document.createElement('tr');
            novaReserva.innerHTML = `<th scope="row">${i + 1}</th>
            <td>${evento.owner_name}</td>
            <td>${evento.owner_email}</td>
            <td>${evento.number_tickets}</td>
            <td><a href='excluir-reserva.html?id=${evento._id}&nome=${evento.owner_name}&email=${evento.owner_email}&ingressos=${evento.number_tickets}' </a></td>
`

            reservas.appendChild(novaReserva);
        })



    }
    catch (erro) {
        console.log(erro);
        alert('Este evento ainda possui nenhuma reserva realizada!');
    }
}
listaEventos();

deletarReserva = async () => {
    try {
        let requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        };

        const resposta = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/${id}`, requestOptions)
        const conteudo = await resposta.json();

        console.log(conteudo)
    }
    catch {
        alert('Não foi possível deletar essa reserva!')
    }


}