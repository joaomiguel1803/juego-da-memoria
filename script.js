// === 10 cartas (5 pares) ===
const cardArray = [
  { name: 'gato',     img: 'imagens/gato.png' },
  { name: 'gato',     img: 'imagens/gato.png' },
  { name: 'cachorro', img: 'imagens/cachorro.png' },
  { name: 'cachorro', img: 'imagens/cachorro.png' },
  { name: 'papagaio', img: 'imagens/papagaio.png' },
  { name: 'papagaio', img: 'imagens/papagaio.png' },
  { name: 'peixe',    img: 'imagens/peixe.png' },
  { name: 'peixe',    img: 'imagens/peixe.png' },
  { name: 'coelho',   img: 'imagens/coelho.png' },
  { name: 'coelho',   img: 'imagens/coelho.png' }
];

// Embaralhar as cartas
cardArray.sort(() => Math.random() - 0.5);

const grid = document.getElementById('grid');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pairsFound = 0;

function createBoard() {
  cardArray.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.dataset.index = index;
    cardEl.dataset.name = card.name;

    // faces
    const front = document.createElement('div');
    front.classList.add('face', 'front');

    const back = document.createElement('div');
    back.classList.add('face', 'back');

    cardEl.append(front, back);
    cardEl.addEventListener('click', onFlip);
    grid.appendChild(cardEl);
  });
}

function onFlip() {
  if (lockBoard) return;
  if (this === firstCard) return; // evita clicar duas vezes na mesma carta

  // vira visualmente e carrega a imagem
  this.classList.add('flip');
  const idx = this.dataset.index;
  const { img, name } = cardArray[idx];
  this.querySelector('.back').innerHTML = `<img src="${img}" alt="${name}">`;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  // segunda carta
  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    // marca como combinadas
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard.removeEventListener('click', onFlip);
    secondCard.removeEventListener('click', onFlip);
    pairsFound += 1;
    resetTurn();

    if (pairsFound === cardArray.length / 2) {
      setTimeout(() => alert('Parabéns! Todos os pares encontrados!'), 300);
    }
  } else {
    // desvira após um tempinho
    setTimeout(() => {
      unflip(firstCard);
      unflip(secondCard);
      resetTurn();
    }, 700);
  }
}

function unflip(cardEl) {
  cardEl.classList.remove('flip');
  const back = cardEl.querySelector('.back');
  if (back) back.innerHTML = '';
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Inicializa
createBoard();