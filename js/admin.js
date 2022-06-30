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

        // Recebe array em formato json (conteudo) e execulta uma função para cada (forEach) elemento deste array.
        conteudo.forEach((evento, i) => {

            // Declarando variavel que irá receber através do metodo (.querySelector) um elemento html.
            const todoEventos = document.querySelector('tbody');

            // Declarando variavel que irá receber o método (document.createElement) e criar novos elementos(tr).
            const novo = document.createElement('tr');

             // Atribui a propriedade que define através de uma sintaxe HTML os elementos filhos (th, td). 
             // Os elementos recebem uma varievel que possui como valor dados fornecidos pela API.
            //  Estes exibem a tabela de eventos com cabeçalho (scheduled, name, attractions),
            //  colunas indicadoras (evento) e para cada um deste, foram criados os elementos (a) com atributo (href),
            //  que irão fazer uma ancora cada um para sua respectiva pagina html (reservas.html, editar-evento.html, excluir-evento.html).
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

        // O catch retorna uma excessao caso houver. Faz parte da declaração (try...catch).
        //  Irá retornar um (alert) para o usuario, caso os dados da tabela (Gerenciamento de Eventos) nao sejam recebidos.
    } catch (erro) {
        console.log(erro);
        alert('Não foi possivel carregar os eventos! Tente novamente');
    }
}
// Chamando a função (listaEventos) assíncrona criada.
listaEventos();