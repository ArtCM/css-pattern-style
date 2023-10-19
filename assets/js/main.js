const accordeonItems = document.querySelectorAll('.accordeon-item-name');

// Adicione um evento de clique a cada elemento
accordeonItems.forEach(item => {
  item.addEventListener('click', () => {
    // Encontre o elemento pai (accordeon-item)
    const parent = item.parentElement;

    // Percorra todos os elementos do acordeão e feche os conteúdos
    const allAcordeonItems = document.querySelectorAll('.accordeon-item');
    allAcordeonItems.forEach(acordeonItem => {
      acordeonItem.querySelector('.accordeon-item-content').classList.add('d-none');
      acordeonItem.querySelector('.accordeon-item-name').classList.remove('accordeon-item-name-select');
    });

    // Abra o conteúdo do item clicado
    parent.querySelector('.accordeon-item-content').classList.remove('d-none');
    parent.querySelector('.accordeon-item-name').classList.add('accordeon-item-name-select');
  });
});


// Selecione o input checkbox
const checkboxMenu = document.getElementById("checkbox-menu");

// Selecione o elemento com a classe 'nav__mob-accordeon'
const navMobAccordeon = document.querySelector(".nav__mob-accordeon");

// Adicione um evento de clique ao input checkbox
checkboxMenu.addEventListener("click", () => {
    // Verifique se o checkbox está marcado
    if (checkboxMenu.checked) {
    // Se marcado, remova a classe 'd-none' do elemento 'nav__mob-accordeon'
    navMobAccordeon.classList.remove("d-none");
    } else {
    // Se não marcado, adicione a classe 'd-none' ao elemento 'nav__mob-accordeon'
    navMobAccordeon.classList.add("d-none");
    }
});

const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownMenuItems = document.querySelectorAll(".dropdown-menu-item");

// Adicione um ouvinte de evento para mostrar/ocultar o menu
dropdownMenuItems.forEach(item => {
  item.addEventListener("click", () => {
    // Verifique se o menu está oculto (classe 'd-none' presente)
    if (dropdownMenu.classList.contains("d-none")) {
      dropdownMenu.classList.remove("d-none");
    } else {
      dropdownMenu.classList.add("d-none");
    }
  });
});

// Adicione um ouvinte de evento para fechar o menu se um clique ocorrer em outro lugar da página
document.addEventListener("click", (event) => {
  if (!dropdownMenu.contains(event.target) && !dropdownMenuItems[0].contains(event.target)) {
    dropdownMenu.classList.add("d-none");
  }
});


// Formulario

const formulario = document.querySelector('#contactform');
const telefoneInput = document.querySelector("#phone");
const objetoEnviado = {};
let mensagem = ""



formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const url = "https://api.paineldocorretor.com.br/indicacoes?hash=yAD9qB";

    let dadosFormulario = new FormData(formulario)


    dadosFormulario.forEach((valor, chave) => {
        objetoEnviado[chave] = valor;
    });

    console.log(objetoEnviado)

    if (objetoEnviado.Nome === "") {
        mensagem += "O campo Nome está em Branco \n"
    }
    if (objetoEnviado.FoneCelular === "") {
        mensagem += "O campo Celular está em Branco \n"
    }
    if (objetoEnviado.Email === "") {
        mensagem += "O campo Email está em Branco ou foi preenchido incorretamente \n"
    }
    if (objetoEnviado.Cidade === "") {
        mensagem += "O campo Cidade está em Branco \n"
    }

    if (mensagem === "") {
        console.log("enviou")
         fetch(url ,{
             headers:{
                 'Content-Type' : 'application/json'
             },
             method: 'POST',
             body: JSON.stringify(objetoEnviado)
         })
         .then(element =>{
             alert("Obrigado por se registrar, entraremos em contato em breve!");
             window.location.href = "sucesso.html";
         })
         .catch( e => console.log(e))
    } else {
        alert(mensagem)
        mensagem ="";
    }
})


telefoneInput.addEventListener('input', function () {
    console.log('teste')
    let valorDigitado = telefoneInput.value;
    console.log(valorDigitado)
    valorDigitado = valorDigitado.replace(/\D/g, "");

    if (valorDigitado.length >= 2) {
        valorDigitado = "(" + valorDigitado.substring(0, 2) + ") " + valorDigitado.substring(2);
    }

    if (valorDigitado.length >= 10) {

        valorDigitado = valorDigitado.substring(0, 10) + "-" + valorDigitado.substring(10);
    }

    telefoneInput.value = valorDigitado;

})


