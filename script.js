document.addEventListener('DOMContentLoaded', loadShortcuts);
let editIndex = -1;

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

function openEditModal(index) {
    const shortcuts = getShortcuts();
    const shortcut = shortcuts[index];
    document.getElementById('editSiteName').value = shortcut.name;
    document.getElementById('editSiteUrl').value = shortcut.url;
    document.getElementById('editSiteThumbnail').value = shortcut.thumbnail;
    document.getElementById('editModal').style.display = 'block';
    editIndex = index;
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    const name = document.getElementById('editSiteName').value;
    const url = document.getElementById('editSiteUrl').value;
    const thumbnail = document.getElementById('editSiteThumbnail').value;

    const shortcuts = getShortcuts();
    shortcuts[editIndex] = { name, url, thumbnail };
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    closeModal();
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
            <button onclick="openEditModal(${index})">Edit</button>
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
