const abrirModal = document.querySelectorAll(".botao-reservar");
const modal = document.getElementById("modal");
const concluirReserva = document.querySelector(".concluir");
const cancelarReserva = document.querySelector(".fechar");
let nomeEvento = document.getElementById("nome-evento");
let dataEvento = document.getElementById("data-evento");
let idEvento = "";
let atracoesEvento = document.getElementById("atracoes-evento");
let ingressos = document.getElementById("ingressos");
// var estilo = document.getElementsByClassName('load');

let card = document.querySelector(".pagina_inicial");

// let tituloBanner = document.getElementById("nome-evento-banner");
// let botoesBanner = document.getElementById("botoes-banner");
// let indice = botoesBanner.texto.value;
// let timeout;

let form = document.querySelector('.form-modal');
let nome = document.querySelector('#nome');
// let sexo = document.querySelector('#sexo');
let email = document.querySelector('#email');
// let rg = document.querySelector('#rg');
let qtde = document.querySelector('#quantidade');
let btn_te = document.querySelector('.btn_todos_eventos');

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com/events";
const BASE_FAZER_RESERVA = "https://xp41-soundgarden-api.herokuapp.com/bookings";

var reservar = (id, nome, data, atracoes,disponivel) =>{
  modal.style.display = "block";
  nomeEvento.innerHTML = 'Evento: '+nome;
  dataEvento.innerHTML = 'Data: '+data;
  atracoesEvento.innerHTML = 'Atrações: '+atracoes;
  ingressos.innerHTML = 'Disponivel: '+disponivel
  idEvento = id;

}

concluirReserva.addEventListener("click", e => {
  modal.style.display = "none";
});

cancelarReserva.addEventListener("mousedown", e => {
  modal.style.display = "none";
});

var DataConvert = (x) =>{
  let data = x.split('T')[0]
  let hora = x.split('T')[1].slice(0,5)
  let ano = data.split('-')[0].slice(2,4)
  let mes = data.split('-')[1]
  let dia =data.split('-')[2]
  return dia+'/'+mes+'/'+ano+' '+hora;
}

var Listar = async () => {
  try{
    const resposta = await fetch(BASE_URL, { method: "GET" });
    const resJson = await resposta.json();
    btn_te.innerHTML = 'Veja todos os eventos'
    // estilo[0].style.display = 'none'
    // estilo[1].style.display = 'none'
    resJson.forEach((item,index) => {
  
      if(item.scheduled.length == 0 || item.name.length == 0 || item.attractions[0] == ''){
        item.attractions ='sem atração'
      }
      if(index<4){
        card.innerHTML += `<article class="cards_index evento card p-5 m-3">
        <h2 id="evento${index+1}">${item.name} - ${DataConvert(item.scheduled)}</h2>
        <h4>${item.attractions}</h4>
        <p class="p_card_index">${item.description}</p>
        <p class="p_card_index">Disponivel: ${item.number_tickets}</p>
        ${item.number_tickets!=0?
          `<button onclick ="reservar('${item._id}','${item.name}','${DataConvert(item.scheduled)}','${item.attractions}','${item.number_tickets}')" class="btn btn-primary botao-reservar">
          reservar ingresso
        </button>`
        :
          `<button style = "cursor: auto;" class="btn btn-dark botao-reservar">
          Esgotado
          </button>`
        }
  
      </article>`;
      
      }
    });
  }catch(e){
    alert('Erro! Tente novamente')
    window.location.reload()  
  }
 
  imgBanner1();
};
Listar();

form.onsubmit = async (e)=>{
  e.preventDefault();
  try{
    let para_comprar = Number(ingressos.innerHTML.split(': ')[1]);
    if(Number(qtde.value)>para_comprar){
      return alert('Quantidade indisponível!')
    }
    let dataraw = {
      "owner_name": nome.value,
      "owner_email": email.value,
      "number_tickets": qtde.value,
      "event_id": idEvento
    }
   
  
    const option = {
        method: 'POST',
        body: JSON.stringify(dataraw),
        headers:{
          "Content-Type": "application/json",
        },
        redirect: 'follow'
    }
    
    const resposta = await fetch(BASE_FAZER_RESERVA, option);
    console.log(await resposta.json());
    
    if(resposta.status != '201'){
        return alert('Ocorreu um erro. Verifique se todos os dados estão corretos!')
    }
  
    alert('Reservado com sucesso!')
    return window.location.reload()
  }catch(e){
    alert('Erro! Tente novamente')
    window.location.reload()  
  }
  
}