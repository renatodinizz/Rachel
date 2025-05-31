// script.js

// Seleciona todos os cards (exceto o final e o overlay)
const cards = Array.from(document.querySelectorAll('.card.polaroid'));
const firstCard = document.querySelector('.first-card');
const finalCard = document.getElementById('final-card');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let currentIndex = -1; // -1 é o primeiro card (mensagem inicial)

// Função para remover o card atual com animação
function removeCard(direction) {
  const currentCard = currentIndex === -1 ? firstCard : cards[currentIndex];

  // Define a classe de animação
  currentCard.classList.add(direction === 'left' ? 'slide-left' : 'slide-right');

  // Aguarda o fim da animação para esconder
  setTimeout(() => {
    currentCard.classList.add('hidden');
    currentIndex++;

    // Se não há mais cards, mostra o final
    if (currentIndex >= cards.length) {
      finalCard.classList.remove('hidden');
    }
  }, 600);
}

// Eventos nos botões
leftBtn.addEventListener('click', () => {
  if (currentIndex < cards.length) removeCard('left');
});
rightBtn.addEventListener('click', () => {
  if (currentIndex < cards.length) removeCard('right');
});
