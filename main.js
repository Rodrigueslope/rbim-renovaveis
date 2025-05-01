// Script principal para todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Atualizar ano no copyright do footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Placeholder para logo
    const logoImg = document.getElementById('logo');
    if (logoImg && logoImg.src.includes('logo-placeholder.png')) {
        // Comentário para integração futura:
        // Substitua o placeholder pelo logo real da RBIM quando disponível
        console.log('Logo placeholder detectado. Substitua pelo logo real da RBIM.');
    }
});

// Função para formatar data e hora
function formatDateTime(date) {
    const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

// Função para formatar números com separador de milhares
function formatNumber(number, decimals = 0) {
    return number.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}
