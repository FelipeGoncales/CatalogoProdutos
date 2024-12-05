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