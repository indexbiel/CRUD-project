let idEmEdicao = null;

function salvarProduto(event) {
    // Previne reload da página se vier de um form submit
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const foto = document.getElementById("foto").value;
    const nome = document.getElementById("nome").value;
    const valor = document.getElementById("valor").value;
    const quantidade = document.getElementById("quantidade").value;

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    if (idEmEdicao !== null) {
        // CORRIGIDO: agora usa findIndex e idEmEdicao
        const index = produtos.findIndex(p => p.id === idEmEdicao);

        if (index !== -1) {
            produtos[index] = {
                id: idEmEdicao,
                foto,
                nome,
                valor,
                quantidade
            };
        }

        idEmEdicao = null;

    } else {
        const novoProduto = {
            id: Date.now(),
            foto,
            nome,
            valor,
            quantidade
        };

        produtos.push(novoProduto);
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));
    document.getElementById("form-produto").reset();
    listarProdutos();
}

function listarProdutos() {
    const lista = document.getElementById("listarProdutos");
    lista.innerHTML = "";

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    produtos.forEach(produto => {
        lista.innerHTML += `
        <article class="item">
            <div class="product-img">
                <img src="${produto.foto}" alt="${produto.nome}">
            </div>

            <div class="product-info">
                <h3>${produto.nome}</h3>
                <p>Produto cadastrado no sistema.</p>
                <button class="btn-mais">Ler mais</button>
            </div>

            <div class="produto-dados">
                <span class="quantidade">Qtd: ${produto.quantidade}</span>
                <span class="valor">R$ ${produto.valor}</span>
            </div>

            <div class="icons">
                <button class="btn-delete" onclick="excluirProduto(${produto.id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
                <button class="btn-edit" onclick="editarProduto(${produto.id})">
                    <span class="material-symbols-outlined">edit</span>
                </button>
            </div>
        </article>
        `;
    });
}

function excluirProduto(id) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos = produtos.filter(produto => produto.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    listarProdutos();
}

function editarProduto(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    document.getElementById("foto").value = produto.foto;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("valor").value = produto.valor;
    document.getElementById("quantidade").value = produto.quantidade;

    idEmEdicao = id;
}

// ADICIONA ISSO SE USAR A SOLUÇÃO A:
document.getElementById("form-produto").addEventListener("submit", salvarProduto);

window.onload = listarProdutos;
