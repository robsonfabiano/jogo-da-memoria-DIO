const cards = document.querySelectorAll('.card'); //Seleciona todos os cards e os mantém em uma lista (cards)
let hasFlippedCard = false;
let primeiraCarta, segundaCarta;
let lockBoard = false;

//Função que aponta para a carta que está sendo selecionada
//adicionando a classe flip que vira a mesma.
function flipCard() {
    if(lockBoard) return;
    if(this === primeiraCarta) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        primeiraCarta = this;
        return;
    }
    segundaCarta = this;
    hasFlippedCard = false; /* Zera o flip card*/
    checkForMatch();
}

/* Função que checa se as duas cartas são iguais*/
function checkForMatch() {
    if (primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        disableCards();/* chama a função que mantém as duas cartas iguais viradas*/
        return;
    }
    unflipCards(); /* Desvira as duas cartas caso sejem diferentes*/
}

/*Função que desabilita o click nas cartas clicadas*/
function disableCards() {
    primeiraCarta.removeEventListener('click', flipCard);
    segundaCarta.removeEventListener('click', flipCard);

    resetBoard();
}

/* Função que desvira as duas cartas retirando a classe flip com um timeout para isto*/
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip')

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

/* Função que embaralha as cartas inserindo um random na ordem em que as 
cartas são postas no flexbox CSS*/
(function embaralhar() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})(); /*Função imediata*/

cards.forEach((card) => { //Para cada card
    card.addEventListener('click', flipCard); /*percorrer a lista até encontrar a carta clicada e chamar a função flipCard*/
})
