listaEventos = async (evento) => {
    BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
    try {
        document.querySelector('#loading').style.display = 'block';

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const resposta = await fetch(`${BASE_URL}/events/`, requestOptions)
        const conteudo = await resposta.json();

        conteudo.forEach((evento, i) => {

            const todoEventos = document.querySelector('tbody');
            const novo = document.createElement('tr');
            novo.innerHTML = ` <th scope="row">${i + 1}</th>
        <td>${evento.scheduled}</td>
        <td>${evento.name}</td>
        <td>${evento.attractions}</td>
        <td>
            <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
            <a href="editar-evento.html?id=${evento._id}&nome=${evento.name}&banner=${evento.poster}&descricao=${evento.description}&data=${evento.scheduled}&ingressos=${evento.number_tickets}&atracoes=${evento.attractions}"" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${evento._id}&nome=${evento.name}&banner=${evento.poster}&descricao=${evento.description}&data=${evento.scheduled}&ingressos=${evento.number_tickets}&atracoes=${evento.attractions}" class="btn btn-danger">Excluir</a>
        </td >
    </tr > `

            todoEventos.appendChild(novo);
        });

        document.querySelector('#loading').style.display = 'none';

    } catch (erro) {
        console.log(erro);
        alert('Não foi possivel carregar os eventos! Tente novamente');
        document.querySelector('#loading').style.display = 'none';
    }
}
listaEventos();