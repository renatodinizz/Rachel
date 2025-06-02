const cards = document.querySelectorAll('.card');
let currentIndex = 0;

function showCard(index) {
  cards.forEach(card => card.classList.add('hidden'));
  const card = cards[index];
  if (card) card.classList.remove('hidden');
}

function handleSwipe(card, direction) {
  card.style.transition = 'transform 1s ease, opacity 1s ease';
  card.style.opacity = '0';
  card.style.transform = `translateX(${direction === 'left' ? '-' : ''}100%)`;
  setTimeout(() => {
    currentIndex++;
    showCard(currentIndex);
  }, 1000);
}

function enableSwipe(card) {
  let startX = 0;
  let isDragging = false;

  const onMouseMove = e => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 50) {
      handleSwipe(card, deltaX > 0 ? 'right' : 'left');
      removeListeners();
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    removeListeners();
  };

  const removeListeners = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  card.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  card.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  card.addEventListener('touchend', e => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) > 50) {
      handleSwipe(card, deltaX > 0 ? 'right' : 'left');
    }
  });
}

// Ativar swipe em todos os cards exceto último
cards.forEach((card, index) => {
  if (index < cards.length - 1) enableSwipe(card);
});

// Botão para sair do primeiro card
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('btn-primeiro').disabled = false;
  }, 3000);

  document.getElementById('btn-primeiro').addEventListener('click', () => {
    const card = cards[currentIndex];
    handleSwipe(card, 'right');
  });

  showCard(currentIndex);
});