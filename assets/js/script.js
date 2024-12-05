document.addEventListener('DOMContentLoaded', () => {
    let catalogoLocalStorage = localStorage.getItem('catalogo');

    if (catalogoLocalStorage) {
        let catalogoDesc = JSON.parse(catalogoLocalStorage);

        catalogo = catalogoDesc;

        for (item of catalogoDesc) {
            addProduto(item.nome, item.image, item.categoria, item.preco);
        }

        let noProducts = document.querySelector('.no-products')
        if (catalogoDesc.length > 0) {
            noProducts.style.display = 'none';
        }
    }
});

let catalogo = [];

const adicionarCadastro = document.getElementById("adicionarCadastro");

adicionarCadastro.addEventListener('click', () => {
    let nome = document.getElementById('nome').value;
    let image = document.getElementById('image').value;
    let categoria = document.getElementById('categoria').value;
    let preco = document.getElementById('preco').value;

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

    let noProducts = document.querySelector('.no-products')
    if (noProducts) {
        noProducts.style.display = 'none'; 
    }
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
    divIcons.appendChild(iconEdit);

    let iconDelete = document.createElement('i');
    iconDelete.classList.add('fa-solid', 'fa-trash', 'delete-button');
    iconDelete.addEventListener('click', deletar);
    divIcons.appendChild(iconDelete);

    divProd.appendChild(divIcons);

    document.getElementById('produtosList').appendChild(divProd);

    console.log(Array.from(document.getElementById('produtosList')).length);
}

function deletar() {
    let divPai = this.parentNode;
    let divProd = divPai.parentNode;
    let catalogoDiv = divProd.parentNode;

    let index = Array.from(catalogoDiv).indexOf(divProd);

    catalogo.splice(index, 1);

    divProd.remove();

    let noProducts = document.querySelector('.no-products')
    if (Array.from(catalogoDiv).length === 0) {
        noProducts.style.display = 'block'; 
    };

    salvarLocalStorage();
}


let modalCadastro = document.getElementById("modalCadastro");
let openModalCadastro = document.getElementById("openModalCadastro");
let closeCadastro = document.getElementsByClassName("closeCadastro")[0];

openModalCadastro.onclick = function() {
  modalCadastro.style.display = "flex";
}

closeCadastro.onclick = function() {
  modalCadastro.style.display = "none";
}

// Corrigir o evento window.onclick para não sobrescrever
window.onclick = function(event) {
  if (event.target === modalCadastro) {
    modalCadastro.style.display = "none";
  }
}
