const webImageExtensions = [
  ".jpg",  // JPEG
  ".jpeg", // Alternativo para JPEG
  ".png",  // PNG
  ".gif",  // GIF
  ".webp", // WebP
  ".svg",  // SVG
  ".bmp",  // BMP
  ".ico",  // Ícones
  ".tiff", // TIFF
  ".avif"  // AVIF
];

document.addEventListener('DOMContentLoaded', () => {
    let catalogoLocalStorage = localStorage.getItem('catalogo');

    if (catalogoLocalStorage) {
        let catalogoDesc = JSON.parse(catalogoLocalStorage);

        catalogo = catalogoDesc;

        for (item of catalogoDesc) {
            addProduto(item.nome, item.image, item.categoria, item.preco);
        }

        atualizarMensagemNenhumProduto()
    }
});

let catalogo = [];

const adicionarCadastro = document.getElementById("adicionarCadastro");

adicionarCadastro.addEventListener('click', () => {
    let nome = document.getElementById('nome').value;
    let image = document.getElementById('image').value;
    let categoria = document.getElementById('categoria').value;
    let preco = document.getElementById('preco').value;

    if (!nome || !image || !categoria || !preco) {
        exibirMensagem('Todos os campos devem ser preenchidos.', 'error')
        return;
    };
    if (preco <= 0) {
        exibirMensagem('Insira um valor válido.', 'error');
        return;
    };
    if (!webImageExtensions.some(extension => image.endsWith(extension))) {
        exibirMensagem('Digite um endereço de imagem válido.', 'error');
        return;
    }

    let item = {};
    item['nome'] = nome;
    item['image'] = image;
    item['categoria'] = categoria;
    item['preco'] = preco;

    catalogo.push(item);

    console.log(item);
    console.log(catalogo);

    modalCadastro.style.display = "none";

    addProduto(nome, image, categoria, preco);

    atualizarMensagemNenhumProduto();

    exibirMensagem('Produto adicionado com sucesso.', 'sucess');

    salvarLocalStorage();
});

function salvarLocalStorage() {
    let catalogoJSON = JSON.stringify(catalogo);

    localStorage.setItem('catalogo', catalogoJSON);
}

function addProduto(nome, image, categ, preco) {
    let divProd = document.createElement('div');
    divProd.classList.add('prod');

    let divImage = document.createElement('div');
    divImage.style.backgroundImage = `url(${image})`;
    divImage.classList.add('div-img');
    divProd.appendChild(divImage);

    let divTextos = document.createElement('div');
    divTextos.classList.add('div-textos');

    let pDescricao = document.createElement('p');
    pDescricao.classList.add('descricao');
    pDescricao.textContent = nome;
    divTextos.appendChild(pDescricao);

    let pPreco = document.createElement('p');
    pPreco.classList.add('preco');

    let precoInteiro = Math.round(preco * 100);
    let valorInteiro = Math.floor(precoInteiro / 100);
    let centavos = precoInteiro % 100;

    if (centavos < 10) {
        centavos = '0' + centavos;
    }
    if (centavos == 0) {
        centavos = '00';
    };

    pPreco.textContent = 'R$' + valorInteiro + ',' + centavos;
    divTextos.appendChild(pPreco);

    let pCategoria = document.createElement('p');
    pCategoria.classList.add('categoria');
    pCategoria.textContent = categ;
    divTextos.appendChild(pCategoria);

    divProd.appendChild(divTextos);

    let divIcons = document.createElement('div');
    divIcons.classList.add('div-icons');

    let iconEdit = document.createElement('i');
    iconEdit.classList.add('fa-solid', 'fa-pen', 'edit-button');
    iconEdit.addEventListener('click', abrirEditar);
    divIcons.appendChild(iconEdit);

    let iconDelete = document.createElement("i");
    iconDelete.classList.add("fa-solid", "fa-trash", "delete-button");
    iconDelete.addEventListener("click", deletar);
    divIcons.appendChild(iconDelete);

    divProd.appendChild(divIcons);

    document.getElementById('produtosList').appendChild(divProd);
}

function atualizarMensagemNenhumProduto() {
    let noProducts = document.querySelector('.no-products'); 

    if (catalogo.length === 0) {
        noProducts.style.display = 'block';
        noProducts.textContent = 'Nenhum produto encontrado para o termo pesquisado.';
    } else {
        noProducts.style.display = 'none';
    };
};

function abrirEditar() {
    let divProd = this.parentNode.parentNode;
    let catalogoDiv = document.getElementById('produtosList');

    let produtos = Array.from(catalogoDiv.children).filter(el => el.classList.contains('prod'));
    let index = produtos.indexOf(divProd);

    if (index !== -1) {
        let produto = catalogo[index];

        document.getElementById('nome-editar').value = produto.nome;
        document.getElementById('image-editar').value = produto.image;
        document.getElementById('categoria-editar').value = produto.categoria;
        document.getElementById('preco-editar').value = produto.preco;

        const modalEditar = document.getElementById('modalEditar');
        modalEditar.dataset.index = index; 

        modalEditar.style.display = "flex";
    } else {
        alert("Erro ao localizar o produto para edição.");
    }
}

const salvarEdicao = () => {
    let nomeEditar = document.getElementById('nome-editar').value;
    let imageEditar = document.getElementById('image-editar').value;
    let categoriaEditar = document.getElementById('categoria-editar').value;
    let precoEditar = document.getElementById('preco-editar').value;

    if (!nomeEditar || !imageEditar || !categoriaEditar || !precoEditar) {
        exibirMensagem('Todos os campos devem ser preenchidos.', 'error');
        return;
    }
    if (precoEditar <= 0) {
        exibirMensagem('Insira um valor válido.', 'error');
        return;
    }
    if (!webImageExtensions.some(extension => imageEditar.endsWith(extension))) {
        exibirMensagem('Digite um endereço de imagem válido.', 'error');
        return;
    }

    const modalEditar = document.getElementById('modalEditar');
    let index = modalEditar.dataset.index;

    if (index !== undefined) {
        index = parseInt(index);

        catalogo[index] = {
            nome: nomeEditar,
            image: imageEditar,
            categoria: categoriaEditar,
            preco: precoEditar,
        };

        let catalogoDiv = document.getElementById('produtosList');
        let produtoDOM = catalogoDiv.children[index+1];
        produtoDOM.querySelector('.descricao').textContent = nomeEditar;
        produtoDOM.querySelector('.div-img').style.backgroundImage = `url(${imageEditar})`;
        produtoDOM.querySelector('.categoria').textContent = categoriaEditar;

        let precoInteiro = Math.round(precoEditar * 100);
        let valorInteiro = Math.floor(precoInteiro / 100);
        let centavos = precoInteiro % 100;
        
        if (centavos < 10) {
            centavos = '0' + centavos;
        }
        produtoDOM.querySelector('.preco').textContent = 'R$' + valorInteiro + ',' + centavos;
        

        salvarLocalStorage();

        exibirMensagem('Produto alterado com sucesso.', 'sucess');

        modalEditar.style.display = 'none';
    } else {
        exibirMensagem('Erro ao localizar o produto para edição.', 'error');
    }
};


const botaoSalvarEdicao = document.getElementById('editarProduto');
botaoSalvarEdicao.addEventListener('click', salvarEdicao);

let modalCadastro = document.getElementById("modalCadastro");
let openModalCadastro = document.getElementById("openModalCadastro");
let closeCadastro = document.getElementById("closeCadastro");

openModalCadastro.onclick = function() {
    modalCadastro.style.display = "flex";

    document.getElementById('nome').value = '';
    document.getElementById('image').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('preco').value = '';
}

closeCadastro.onclick = function() {
  modalCadastro.style.display = "none";
}


const modalEditar = document.getElementById('modalEditar');
let closeEditar = document.getElementById("closeEditar");

closeEditar.addEventListener('click', function() {
    modalEditar.style.display = 'none';
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    let query = searchInput.value.toLowerCase();
    let produtos = document.querySelectorAll(".prod");

    produtos.forEach(produto => {
        let nome = produto.querySelector(".descricao").textContent.toLowerCase();
        let categoria = produto.querySelector(".categoria").textContent.toLowerCase();

        if (nome.includes(query) || categoria.includes(query)) {
            produto.style.display = "flex";
        } else {
            produto.style.display = "none";
        }
    });

    let noProducts = document.querySelector(".no-products");
    let produtosVisiveis = Array.from(produtos).some(produto => produto.style.display === "flex");

    noProducts.style.display = produtosVisiveis ? "none" : "block";
});

let produtoParaDeletar = null;

function deletar() {
    let divProd = this.parentNode.parentNode;
    produtoParaDeletar = divProd;

    const modalDeletar = document.getElementById("modalDeletar");
    modalDeletar.style.display = "flex"; // Mostrar o modal
}

const modalDeletar = document.getElementById("modalDeletar");
const deleteSim = document.getElementById("deleteSim");
const deleteNao = document.getElementById("deleteNao");

deleteSim.addEventListener("click", () => {
    if (produtoParaDeletar) {
        let catalogoDiv = document.getElementById("produtosList");

        let produtos = Array.from(catalogoDiv.children).filter(el => el.classList.contains("prod"));

        let index = produtos.indexOf(produtoParaDeletar);

        if (index !== -1) {
            catalogo.splice(index, 1);
            produtoParaDeletar.remove();
            atualizarMensagemNenhumProduto();
            salvarLocalStorage();
        }
    }
    exibirMensagem('Produto deletado com sucesso.', 'sucess');
    produtoParaDeletar = null;
    modalDeletar.style.display = "none";
});

deleteNao.addEventListener("click", () => {
    produtoParaDeletar = null;
    modalDeletar.style.display = "none";
});

let mensagemEmExibicao = false;

function exibirMensagem(texto, tipo) {
    if (mensagemEmExibicao) return;

    mensagemEmExibicao = true;

    let pMensagem = document.getElementById('mensagemUsuario');
    pMensagem.textContent = texto;
    pMensagem.style.display = 'block';
    if (tipo === 'error') {
        pMensagem.style.backgroundColor = '#fa3f3c';
    } else if (tipo === 'sucess') {
        pMensagem.style.backgroundColor = '#42e3a2';
    };

    setTimeout(() => {
        pMensagem.style.display = 'none';
        mensagemEmExibicao = false;
    }, 4900);
}
