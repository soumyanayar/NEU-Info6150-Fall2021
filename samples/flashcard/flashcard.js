"use strict";
(function() {
  const cards = [];
  activateControls();
  activateAddCard();
  activateUseCard();


  function activateControls() {
    const controls = document.querySelector('.controls');
    const add = document.querySelector('.controls .controls__add');
    const use = document.querySelector('.controls .controls__use');
    controls.addEventListener('click', (e) => {
      e.preventDefault();

      if(e.target.dataset?.action === 'use') {
        enableUseCard();
      }
      if(e.target.dataset?.action === 'add') {
        enableAddCard();
      }
    });
  }

  function activateAddCard() {
    const form = document.querySelector('.add-card-form');
    const button = document.querySelector('.add-card-form button');
    const promptEl = document.querySelector('.add-card-form__prompt');
    const bodyEl = document.querySelector('.add-card-form__body');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const prompt = promptEl.value;
      const body = bodyEl.value;
      cards.push({ prompt, body });
      promptEl.value = "";
      bodyEl.value = "";
      renderMessage(`Card for ${prompt} added`);
    });
  }

  function enableAddCard() {
    const add = document.querySelector('.add-card');
    const use = document.querySelector('.use-card');
    use.classList.remove('active');
    add.classList.add('active');
  }

  function activateUseCard() {
    const card = document.querySelector('.use-card .card');
    card.addEventListener('click', (e) => {
      card.classList.toggle('flipped');
    });
  }

  function enableUseCard() {
    const add = document.querySelector('.add-card');
    const use = document.querySelector('.use-card');
    use.classList.add('active');
    add.classList.remove('active');

    const promptEls = document.querySelectorAll('.use-card .card__prompt');
    const bodyEl = document.querySelector('.use-card .card__body');
    const { body, prompt } = pickRandomCard();
    promptEls.forEach( el => {
      el.innerText = prompt;
    });
    bodyEl.innerText = body;

  }

  function renderMessage(message) {
    const messageEl = document.querySelector('.message');
    messageEl.innerText = message;
  }

  function pickRandomCard() {
    return cards[ Math.floor(Math.random() * cards.length) ];
  }

})();
