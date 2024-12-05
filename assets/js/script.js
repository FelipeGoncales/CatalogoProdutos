function search() {
    const inputSearch = document.getElementById("inputSeach").value.toLowerCase()
    const searchedList = document.getElementById("searchedList")
    const filterItems = items.filter(item => item.toLowerCase().includes(inputSearch))
    for (item of filterItems) {
        const li = document.createElement('li')
        li.textContent = item
        searchedList.appendChild(li)
    }
}

let modalCadastro = document.getElementById("modalCadastro")
let openModalCadastro = document.getElementById("openModalCadastro")
var closeCadastro = document.getElementsByClassName("closeCadastro")

openModalCadastro.onclick = function() {
    modalCadastro.style.display = "block"
  }
  
  closeCadastro.onclick = function() {
    modalCadastro.style.display = "none"
  }
  
  window.onclick = function(event) {
    if (event.target == modalCadastro) {
      modalCadastro.style.display = "none"
    }
  }

let modalSearch = document.getElementById("modalSearch")
let openModalSearch = document.getElementById("openModalSearch")
var closeSearch = document.getElementsByClassName("closeSearch")

openModalSearch.onclick = function() {
    modalSearch.style.display = "block";
}

closeSearch.onclick = function() {
    modalSearch.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalSearch) {
    modalSearch.style.display = "none";
    }
}