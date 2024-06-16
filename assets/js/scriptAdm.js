let listaCadastros = JSON.parse(localStorage.getItem('listaCadastros')) || [];
atualizarlistaCadastros();

document.getElementById('titulo').innerHTML = "Saúde e Bem-Estar";

function validaFormulario() {
    let nome = document.getElementById('nome').value;

    if (!nome) {
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
    document.getElementById('fazAtividadeFisica').value = '';
}

function atualizarlistaCadastros() {
    let tableBody = document.getElementById('listaCadastros');
    tableBody.innerHTML = '';

    listaCadastros.forEach((Cadastro, indice) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${Cadastro.codigo}</td>
            <td>${Cadastro.nome}</td>
            <td>${Cadastro.cpf}</td>
            <td>${Cadastro.telefone}</td>
            <td>${Cadastro.email}</td>
            <td>${Cadastro.fazAtividadeFisica}</td>
            <td>
                <button onclick="editarCadastro(${indice})" class="btn btn-primary me-2">Editar</button>
                <button onclick="excluirCadastro(${indice})" class="btn btn-danger">Excluir</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

}

function salvar() {
    if (validaFormulario()) {
        let codigo = document.getElementById('codigo').value;
        let nome = document.getElementById('nome').value;
        let cpf = document.getElementById('cpf').value;
        let telefone = document.getElementById('telefone').value;
        let email = document.getElementById('email').value;
        let fazAtividadeFisica = document.getElementById('fazAtividadeFisica').value;

        let indiceEdicao = -1;
        let objExistente = listaCadastros.find((element, index) => {
            if (element.codigo === codigo) {
                indiceEdicao = index;
                return true;
            }
            return false;
        });

        if (indiceEdicao >= 0) {
            listaCadastros[indiceEdicao] = { codigo, nome, cpf, telefone, email, fazAtividadeFisica };
        } else {
            listaCadastros.push({ codigo, nome, cpf, telefone, email, fazAtividadeFisica });
        }

        salvarLista();
        limparFormulario();
        atualizarlistaCadastros();

        let myModalEl = document.getElementById('modalCadastro');
        let myModal = bootstrap.Modal.getInstance(myModalEl);
        myModal.hide();

    }
}

function editarCadastro(indice) {
    let Cadastro = listaCadastros[indice];
    document.getElementById('codigo').value = Cadastro.codigo;
    document.getElementById('nome').value = Cadastro.nome;
    document.getElementById('cpf').value = Cadastro.cpf;
    document.getElementById('telefone').value = Cadastro.telefone;
    document.getElementById('email').value = Cadastro.email;
    document.getElementById('fazAtividadeFisica').value = Cadastro.fazAtividadeFisica;

    let modalProdutoEl = document.getElementById('modalCadastro');
    let modalProduto = bootstrap.Modal.getInstance(modalProdutoEl);
    modalProduto.show();
}

function excluirCadastro(indice) {
    if (confirm(`Tem certeza que deseja excluir a Cadastro ${listaCadastros[indice].nome}?`)) {
        listaCadastros.splice(indice, 1);
        salvarLista();
        atualizarlistaCadastros();
    }
}