"use strict";
(function() {
  let todos = [];

  const MESSAGES = {
    networkError: 'Trouble connecting to the network.  Please try again',
    default: 'Something went wrong.  Please try again',
  };

  populateTodos();
  addAbilityToRefresh();

  function populateTodos() {
    fetchTodos()
    .then( rawTodos => {
      todos = rawTodos;
      render();
      renderStatus('');
    })
    .catch( error => {
      renderStatus(error);
    });
  }

  function addAbilityToRefresh() {
    const buttonEl = document.querySelector('.refresh');
    buttonEl.addEventListener('click', () => {
      populateTodos();
    });
  }

  function fetchTodos() {
    return fetch('/api/todos')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    })
  }

  function render() {
    const html = todos.map( (todo, index) => `
      <li
        data-index="${index}"
        data-id="${todo.id}"
        class="todo ${ todo.done ? "complete" : "" }"
      >
        ${todo.task}
      </li>
    `).join('');
    const todosEl = document.querySelector('.todos');
    todosEl.innerHTML = html;
  }

  function renderStatus(message) {
    const statusEl = document.querySelector('.status');
    if( !message ) {
      statusEl.innerText = '';
      return;
    }
    const key = message?.error ? message.error : 'default';
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }

})();

