document.addEventListener('DOMContentLoaded', () => {
  let catalogoLocalStorage = localStorage.getItem('catalogo');

  if (catalogoLocalStorage) {
    let catalogoDesc = JSON.parse(catalogoLocalStorage);

    catalogo = catalogoDesc;

    for (item of catalogoDesc) {
      addProduto(item.nome, item.image, item.categoria, item.preco);
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
  pPreco.textContent = preco;
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
  divIcons.appendChild(iconDelete);

  divProd.appendChild(divIcons);

  document.getElementById('produtosList').appendChild(divProd);
}





function search() {
  const inputSearch = document.getElementById("inputSeach").value.toLowerCase();
  const searchedList = document.getElementById("searchedList");
  
  // Limpar a lista de resultados anteriores
  searchedList.innerHTML = "";

  // Filtrar os itens no catálogo
  const filterItems = catalogo.filter(item => item.nome.toLowerCase().includes(inputSearch));
  
  // Adicionar os itens filtrados à lista
  for (const item of filterItems) {
    const li = document.createElement('li');
    li.textContent = item.nome;
    searchedList.appendChild(li);
  }
}

let modalCadastro = document.getElementById("modalCadastro");
let openModalCadastro = document.getElementById("openModalCadastro");
let closeCadastro = document.getElementsByClassName("closeCadastro")[0];

openModalCadastro.onclick = function() {
  modalCadastro.style.display = "block";
}

closeCadastro.onclick = function() {
  modalCadastro.style.display = "none";
}

let modalSearch = document.getElementById("modalSearch");
let openModalSearch = document.getElementById("openModalSearch");
let closeSearch = document.getElementsByClassName("closeSearch")[0];

openModalSearch.onclick = function() {
  modalSearch.style.display = "block";
}

closeSearch.onclick = function() {
  modalSearch.style.display = "none";
}

// Corrigir o evento window.onclick para não sobrescrever
window.onclick = function(event) {
  if (event.target === modalCadastro) {
    modalCadastro.style.display = "none";
  }
  if (event.target === modalSearch) {
    modalSearch.style.display = "none";
  }
}
