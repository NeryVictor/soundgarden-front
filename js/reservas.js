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


// const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

// const inputNome = document.querySelector('#nome')
// const inputEmail = document.querySelector('#email')
// const inputEventos = document.querySelector('#evento')
// const inputData = document.querySelector('#data')
// const inputLotacao = document.querySelector('#lotacao')
// const divForms = document.querySelector('#lista-reservas')


// const urlParam = new URLSearchParams(window.location.search)
// const myParam = urlParam.get('id')

// window.onload = async () => {
//     const resposta = await fetch(`${BASE_URL}/bookings/event/${myParam}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     const respostaFormatada = await resposta.json()

//     console.log(respostaFormatada);

//     const reservasFiltradas = respostaFormatada.filter( item => item.event !== null)

//     console.log(reservasFiltradas);

//     reservasFiltradas.forEach(item => {

//         const brData = new Date(item.event.scheduled);

//         const zeroEsquerdaDate = ()=>{
//             if(brData.getDate() <= 9){
//                 const zero = Number (brData.getDate())
//             return '0' + zero
//             }else{
//                 return brData.getDate()
//             }
//         }
//         const zeroEsquerdaMonth = ()=>{
//             if(brData.getMonth() <= 9){
//                 const zero = Number (brData.getMonth() + 1)
//             return '0' + zero
//             }else{
//                 return brData.getMonth() + 1
//             }
//         }
//         const zeroEsquerdaHours = ()=>{
//             if(brData.getHours() <= 9){
//                 const zero = Number (brData.getHours())
//             return '0' + zero
//             }else{
//                 return brData.getHours()
//             }
//         }
//         const zeroEsquerdaMinutes = ()=>{
//             if(brData.getMinutes() <= 9){
//                 const zero = Number (brData.getMinutes())
//             return '0' + zero
//             }else{
//                 return brData.getMinutes()
//             }
//         }
        
//         divForms.innerHTML += `<form class="col-6 form-reservas">
//         <div class="mb-3">
//             <label for="nome" class="form-label">Nome</label>
//             <input type="text" class="form-control name" id="nome" aria-describedby="nome" value=${item.owner_name} disabled>
//         </div>
//         <div class="mb-3">
//             <label for="atracoes" class="form-label">Email</label>
//             <input type="email" class="form-control" id="email" aria-describedby="email" value=${item.owner_email} disabled>
//         </div>
//         <div class="mb-3">
//             <label for="evento" class="form-label">Evento</label>
//             <input type="text" class="form-control evento" id="evento" aria-describedby="evento" value=${item.event.description} disabled>
//         </div>
//         <div class="mb-3">
//             <label for="data" class="form-label">Data</label>
//             <input type="datetime" name="data" id="data" class="form-control"
//                 placeholder="00/00/00 00:00" value=${zeroEsquerdaDate()}/${zeroEsquerdaMonth()}/${brData.getFullYear()} ${zeroEsquerdaHours()}:${zeroEsquerdaMinutes()} disabled>
//         </div>
//         <div class="mb-3">
//             <label for="lotacao" class="form-label">Quantidade de ingressos</label>
//             <input type="number" class="form-control" id="lotacao" aria-describedby="lotacao" value=${item.number_tickets} disabled>
//         </div>
//     </form>`

//     })

    
// }