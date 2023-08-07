const { Command } = require('./core/command/Command.js')

const { ipcRenderer } = require('electron')

document.addEventListener('keydown', (event) => {
    if (event.key === "Control") {
        ipcRenderer.send('ctrlPressed');
    }
})

document.addEventListener('click', (event) => {
    // If the clicked element is not the input box, hide it
    searchBoxContainer = document.getElementById('search-box-container')
    if (!searchBoxContainer.contains(event.target)) {
        hideSearchBox()   
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideSearchBox()
    }
})

function hideSearchBox() {
    let searchBoxContainer = document.getElementById('search-box-container')
    searchBoxContainer.style.opacity = '0';
        setTimeout(() => {
            searchBoxContainer.style.display = 'none'
        }, 300)
}

ipcRenderer.on('toggleSearchBarVisibility', () => {
    const searchBoxContainer = document.getElementById('search-box-container');
    if (searchBoxContainer.style.display === 'none' || searchBoxContainer.style.display === '') {
        searchBoxContainer.style.display = 'flex'
        setTimeout(() => {
            searchBoxContainer.style.opacity = '1'
        }, 10)
        searchBoxContainer.focus()
    } else if (searchBoxContainer.style.display === 'flex') {
        searchBoxContainer.style.opacity = '0'
        setTimeout(() => {
            searchBoxContainer.style.display = 'none'
        }, 300)
    }
})
