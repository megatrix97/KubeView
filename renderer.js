const { ipcRenderer } = require('electron')
document.addEventListener('keydown', (event) => {
    if (event.key === "Control") {
        console.log("Received Control click event")
        ipcRenderer.send('ctrlPressed');
    }
})

document.addEventListener('click', (event) => {
    // If the clicked element is not the input box, hide it
    searchBox = document.getElementById('search-box')
    if (!searchBox.contains(event.target)) {
        hideSearchBox()   
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideSearchBox(event)
    }
})

function hideSearchBox() {
    let searchBox = document.getElementById('search-box')
    searchBox.style.opacity = '0';
        setTimeout(() => {
            searchBox.style.display = 'none'
        }, 300)
}

ipcRenderer.on('toggleSearchBarVisibility', () => {
    const searchBox = document.getElementById('search-box');
    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'block'
        setTimeout(() => {
            searchBox.style.opacity = '1'
        }, 10)
        searchBox.focus()
    } else if (searchBox.style.display === 'block') {
        searchBox.style.opacity = '0'
        setTimeout(() => {
            searchBox.style.display = 'none'
        }, 300)
    }
})