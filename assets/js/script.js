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
        alert('Todos os campos devem ser preenchidos');
        return;
    };

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

    let valorInteiro = parseInt(preco);

    let centavos = parseInt(((preco - valorInteiro)*100));

    
    if (centavos < 10 && centavos != 0) {
        centavos = '0'+String(centavos);
    };
    if (centavos == 0) {
        centavos = '00';
    };

    pPreco.textContent = 'R$'+valorInteiro+','+centavos;
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

    let iconDelete = document.createElement('i');
    iconDelete.classList.add('fa-solid', 'fa-trash', 'delete-button');
    iconDelete.addEventListener('click', deletar);
    divIcons.appendChild(iconDelete);

    divProd.appendChild(divIcons);

    document.getElementById('produtosList').appendChild(divProd);
}

function deletar() {
    let divPai = this.parentNode;
    let divProd = divPai.parentNode;
    let catalogoDiv = document.getElementById('produtosList');

    let index = Array.from(catalogoDiv).indexOf(divProd);

    if (catalogo.splice(index, 1)) {
        alert('deu bom')
    }

    divProd.remove();

    atualizarMensagemNenhumProduto();

    salvarLocalStorage();
}


function atualizarMensagemNenhumProduto() {
    let noProducts = document.querySelector('.no-products'); 

    if (catalogo.length === 0) {
        noProducts.style.display = 'block';
    } else {
        noProducts.style.display = 'none';
    };
};


function abrirEditar() {
    let divProd = this.parentNode.parentNode;
    let catalogoDiv = document.getElementById('produtosList');

    let produtos = Array.from(catalogoDiv.children);

    let index = produtos.indexOf(divProd);

    let produto = catalogo[index];

    let nomeEditar = document.getElementById('nome-editar');
    let imageEditar = document.getElementById('image-editar');
    let categoriaEditar = document.getElementById('categoria-editar');
    let precoEditar = document.getElementById('preco-editar');

    nomeEditar.value = produto.nome;
    imageEditar.value = produto.image;
    categoriaEditar.value = produto.categoria;
    precoEditar.value = produto.preco;

    const modalEditar = document.getElementById('modalEditar');
    modalEditar.style.display = "flex";
}




let modalCadastro = document.getElementById("modalCadastro");
let openModalCadastro = document.getElementById("openModalCadastro");
let closeCadastro = document.getElementById("closeCadastro");

openModalCadastro.onclick = function() {
  modalCadastro.style.display = "flex";
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
