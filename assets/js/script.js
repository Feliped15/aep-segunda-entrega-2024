let mybutton = document.getElementById("backToTopBtn");
let listaCadastros = [];

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}


mybutton.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

function validaFormulario() {
    let codigo = document.getElementById('codigo').value;
    let nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;

    if (!codigo || !nome || !cpf || !telefone || !email) {
        alert('Por favor, preencha todos os campos corretamente.');
        return false;
    } else {
        return true;
    }
}

function salvarLista() {
    localStorage.setItem('listaCadastros', JSON.stringify(listaCadastros));
}

function limparFormulario() {
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
}

function salvar() {
    if (validaFormulario()) {
        let codigo = document.getElementById('codigo').value;
        let nome = document.getElementById('nome').value;
        let cpf = document.getElementById('cpf').value;
        let telefone = document.getElementById('telefone').value;
        let email = document.getElementById('email').value;

        listaCadastros = JSON.parse(localStorage.getItem('listaCadastros')) || [];
        let indiceEdicao = -1;
        let objExistente = listaCadastros.find((element, index) => {
            if (element.codigo === codigo) {
                indiceEdicao = index;
                return true;
            }
            return false;
        });

        if (indiceEdicao >= 0) {
            listaCadastros[indiceEdicao] = { codigo, nome, cpf, telefone, email };
        } else {
            listaCadastros.push({ codigo, nome, cpf, telefone, email });
        }

        salvarLista();
        limparFormulario();

        let myModalEl = document.getElementById('modalCadastro');
        let myModal = bootstrap.Modal.getInstance(myModalEl);
        myModal.hide();

    }
}