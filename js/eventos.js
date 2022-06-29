listaEventos = async (evento) => {
    BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
    try {
        //loading: block
        document.querySelector('#loading').style.display = 'block';
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const resposta = await fetch(`${BASE_URL}/events/`, requestOptions)
        const conteudo = await resposta.json();
        console.log(conteudo)



        conteudo.forEach((evento) => {
            todosEventos = document.querySelector('#eventos');
            novoEvento = document.createElement('article');
            novoEvento.setAttribute('class', 'evento card p-5 m-3');
            novoEvento.innerHTML = ` <h2>${evento.name} - ${new Date(evento.scheduled).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</h2>
        <h4>${evento.attractions}</h4>
        <p>${evento.description}</p>
        <a href="reservar-ingresso.html?id=${evento._id}" class="reservar btn btn-primary">reservar ingresso</a>`


            document.querySelector('#loading').style.display = 'none';

            todosEventos.appendChild(novoEvento);
        })
    }
    catch (erro) {
        console.log(erro);
        alert('Não foi possivel carregar os eventos!');
    }
}
listaEventos();


reservarEvento = () => {
    var raw = {
        owner_name: "Clark Ralf Leona",
        owner_email: "email@email.com",
        number_tickets: 1,
        event_id: "624620d08a5e899418d2192b"
    }

    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
        }
    };

    fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('Não foi possivel cadastrar evento'));
}