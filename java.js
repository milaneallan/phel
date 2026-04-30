// script.js - Funcionalidades interativas

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os cards
    const cards = document.querySelectorAll('.skin-card');
    
    // Adiciona efeito de clique nos cards
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Evita que o clique no botão dispare o card
            if(e.target.classList.contains('btn-buy')) {
                e.stopPropagation();
                const skinName = card.querySelector('h3')?.innerText || 'Aphelios';
                showNotification(`Você está visualizando ${skinName}!`);
                return;
            }
            
            // Efeito de clique no card
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
            
            // Pega informações da skin
            const skinName = card.querySelector('h3')?.innerText || 'Skin';
            const skinRarity = card.querySelector('span')?.innerText || 'Especial';
            
            // Mostra modal com informações (opcional)
            showModal(skinName, skinRarity);
        });
    });
    
    // Função para mostrar notificação
    function showNotification(message) {
        // Remove notificação existente
        const oldNotif = document.querySelector('.custom-notification');
        if(oldNotif) oldNotif.remove();
        
        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>✨ ${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Estiliza notificação
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #c9a03d, #f4d03f);
            color: #1a1a2e;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        // Adiciona evento de fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 10px;
            color: #1a1a2e;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-fecha após 3 segundos
        setTimeout(() => {
            if(notification && notification.remove) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    // Função para mostrar modal
    function showModal(skinName, skinRarity) {
        // Remove modal existente
        const oldModal = document.querySelector('.custom-modal');
        if(oldModal) oldModal.remove();
        
        // Cria modal
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${skinName}</h2>
                <p>Raridade: ${skinRarity}</p>
                <p>Skin disponível na loja por tempo limitado!</p>
                <button class="btn-buy modal-btn">Ver na Loja</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Estiliza modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            padding: 2rem;
            border-radius: 20px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            border: 1px solid rgba(201,160,61,0.3);
            position: relative;
            animation: slideInUp 0.3s ease;
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 2rem;
            cursor: pointer;
            background: none;
            border: none;
            color: #c9a03d;
        `;
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if(e.target === modal) modal.remove();
        });
        
        const modalBtn = modal.querySelector('.modal-btn');
        modalBtn.addEventListener('click', () => {
            showNotification(`Redirecionando para a loja...`);
            modal.remove();
        });
    }
    
    // Adiciona animações CSS dinâmicas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes slideInUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .custom-notification {
            font-family: 'Montserrat', sans-serif;
        }
        
        .modal-content h2 {
            font-family: 'Cinzel', serif;
            color: #f4d03f;
            margin-bottom: 1rem;
        }
        
        .modal-content p {
            margin: 0.5rem 0;
            color: #c9c9e0;
        }
        
        .modal-btn {
            margin-top: 1rem;
            width: auto;
            padding: 0.5rem 1.5rem;
        }
    `;
    document.head.appendChild(style);
    
    // Detecta quando as imagens carregam
    cards.forEach(card => {
        const imgUrl = getComputedStyle(card).getPropertyValue('--bg-image').replace(/url\(["']?|["']?\)/g, '');
        if(imgUrl && imgUrl !== 'none') {
            const img = new Image();
            img.onload = () => {
                card.classList.add('loaded');
            };
            img.src = imgUrl;
        }
    });
    
    // Efeito de parallax suave no header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if(header) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Adiciona suporte para imagens quebradas
window.addEventListener('error', (e) => {
    if(e.target.tagName === 'IMG' || (e.target.style && e.target.style.backgroundImage)) {
        const card = e.target.closest?.('.skin-card') || e.target.parentElement?.closest('.skin-card');
        if(card) {
            card.style.backgroundImage = 'linear-gradient(135deg, #2a2a3e, #1a1a2e)';
            card.style.backgroundSize = 'cover';
        }
    }
}, true);
