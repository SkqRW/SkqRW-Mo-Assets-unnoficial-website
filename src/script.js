// Variables globales
let currentTab = 'full-renderer';
let allAssets = {};
let filteredAssets = {};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupSearch();
    setupModal();
    updateTotalStats();
    loadAssets();
});

function updateTotalStats() {
    const totalStats = document.getElementById('total-stats');
    if (totalStats && window.ASSETS_DATA) {
        const total = getAssetStats();
        totalStats.textContent = `${total} total assets available`;
    }
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Actualizar botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Actualizar contenido
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            
            currentTab = tabId;
            
            // Cargar contenido si no está cargado
            if (!allAssets[tabId]) {
                loadTabAssets(tabId);
            } else {
                applySearch();
            }
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(applySearch, 300);
    });
}

function setupModal() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showModal(imageSrc, imageName) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    
    modalImg.src = imageSrc;
    modalImg.alt = imageName;
    modal.style.display = 'block';
}

async function loadAssets() {
    // Cargar los assets de la pestaña activa
    await loadTabAssets(currentTab);
}

async function loadTabAssets(tabId) {
    try {
        const categoryData = getAssetsForCategory(tabId);
        if (!categoryData || categoryData.files.length === 0) {
            throw new Error(`No assets found for category: ${tabId}`);
        }
        
        const assets = categoryData.files.map(file => ({
            name: file.name,
            author: file.author || 'Not yet implemented',
            path: file.path,
            url: file.url,
            size: file.size
        }));
        
        allAssets[tabId] = assets;
        filteredAssets[tabId] = [...assets];
        renderAssets(tabId, assets);
    } catch (error) {
        console.error('Error loading assets:', error);
        const tabContent = document.getElementById(tabId);
        tabContent.innerHTML = `<div class="loading">Error loading assets for ${tabId}. ${error.message}</div>`;
    }
}

function renderAssets(tabId, assets) {
    const tabContent = document.getElementById(tabId);
    
    if (assets.length === 0) {
        tabContent.innerHTML = '<div class="loading">No assets found in this category.</div>';
        return;
    }

    const html = `
        <div class="stats">
            Showing ${assets.length} assets
        </div>
        <div class="image-grid">
            ${assets.map(asset => `
                <div class="image-card">
                    <img src="${asset.url}" alt="${asset.name}" loading="lazy">
                    <div class="image-name">${asset.name}</div>
                    <br> <br>
                    <div class="image-name">${asset.author}</div>
                    <br> <br>
                    <h6 class="image-name"> ${asset.path} </h6>
                </div>
            `).join('')}
        </div>
    `;

    tabContent.innerHTML = html;
}

function applySearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!allAssets[currentTab]) return;

    if (searchTerm === '') {
        filteredAssets[currentTab] = [...allAssets[currentTab]];
    } else {
        filteredAssets[currentTab] = searchAssets(currentTab, searchTerm);
    }

    renderAssets(currentTab, filteredAssets[currentTab]);
}

// Función para obtener estadísticas de assets
function getAssetStats() {
    let totalAssets = 0;
    Object.keys(ASSETS_DATA).forEach(categoryId => {
        totalAssets += ASSETS_DATA[categoryId].count;
    });
    return totalAssets;
}