document.addEventListener('DOMContentLoaded', loadShortcuts);

function addShortcut() {
    const name = document.getElementById('siteName').value;
    const url = document.getElementById('siteUrl').value;
    const thumbnail = document.getElementById('siteThumbnail').value;

    const shortcuts = getShortcuts();
    shortcuts.push({ name, url, thumbnail });
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    renderShortcuts();
    clearForm();
}

function deleteShortcut(index) {
    const shortcuts = getShortcuts();
    shortcuts.splice(index, 1);
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    renderShortcuts();
}

function getShortcuts() {
    const shortcuts = localStorage.getItem('shortcuts');
    return shortcuts ? JSON.parse(shortcuts) : [];
}

function renderShortcuts() {
    const shortcutsGrid = document.getElementById('shortcutsGrid');
    shortcutsGrid.innerHTML = '';
    const shortcuts = getShortcuts();
    shortcuts.forEach((shortcut, index) => {
        const div = document.createElement('div');
        div.className = 'shortcut';
        div.innerHTML = `
            <img src="${shortcut.thumbnail}" alt="${shortcut.name}">
            <a href="${shortcut.url}" target="_blank">${shortcut.name}</a>
            <button onclick="deleteShortcut(${index})">Delete</button>
        `;
        shortcutsGrid.appendChild(div);
    });
}

function clearForm() {
    document.getElementById('siteName').value = '';
    document.getElementById('siteUrl').value = '';
    document.getElementById('siteThumbnail').value = '';
}

function loadShortcuts() {
    renderShortcuts();
}
