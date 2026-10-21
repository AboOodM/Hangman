(function () {
  'use strict';
  const words = [
    ['Nature', 'SUNFLOWER'], ['Nature', 'MOUNTAIN'], ['Nature', 'RAINBOW'],
    ['Adventure', 'JOURNEY'], ['Adventure', 'COMPASS'], ['Adventure', 'EXPLORE'],
    ['Everyday magic', 'WONDER'], ['Everyday magic', 'MELODY'],
    ['Animals', 'DOLPHIN'], ['Animals', 'PENGUIN'], ['Food', 'AVOCADO'], ['Space', 'GALAXY']
  ];
  function createGame(word) {
    const guesses = new Set();
    return {
      word, guesses,
      get misses() { return [...guesses].filter(letter => !word.includes(letter)).length; },
      get won() { return [...word].every(letter => guesses.has(letter)); },
      get lost() { return this.misses >= 6; },
      guess(letter) {
        letter = letter.toUpperCase();
        if (!/^[A-Z]$/.test(letter) || this.won || this.lost || guesses.has(letter)) return false;
        guesses.add(letter);
        return true;
      }
    };
  }
  if (typeof module !== 'undefined') module.exports = { createGame };
  if (typeof document === 'undefined') return;
  let game;
  let previousWord;
  const byId = id => document.getElementById(id);
  function render() {
    byId('word').replaceChildren(...[...game.word].map(letter => {
      const cell = document.createElement('span');
      cell.className = 'letter' + (game.lost && !game.guesses.has(letter) ? ' revealed' : '');
      cell.textContent = game.guesses.has(letter) || game.lost ? letter : '';
      cell.setAttribute('aria-label', cell.textContent || 'blank');
      return cell;
    }));
    byId('word').setAttribute('aria-label', [...game.word].map(l => game.guesses.has(l) || game.lost ? l : 'blank').join(' '));
    byId('remaining').textContent = `${6 - game.misses} chances left`;
    byId('count').textContent = `${game.misses} / 6 misses`;
    byId('status').textContent = game.won ? 'Beautifully done! You found the word.' : game.lost ? `Out of chances! The word was ${game.word}. Try a new word.` : 'Pick a letter. Trust your curiosity.';
    document.querySelectorAll('[data-part]').forEach((part, i) => part.classList.toggle('visible', i < game.misses));
    document.querySelectorAll('.key').forEach(button => {
      const guessed = game.guesses.has(button.textContent);
      button.disabled = guessed || game.won || game.lost;
      button.className = 'key' + (guessed ? game.word.includes(button.textContent) ? ' correct' : ' wrong' : '');
    });
  }
  function guess(letter) { if (game.guess(letter)) render(); }
  function newGame() {
    const choices = words.filter(([, word]) => word !== previousWord);
    const [category, word] = choices[Math.floor(Math.random() * choices.length)];
    previousWord = word;
    game = createGame(word);
    byId('category').textContent = category;
    render();
  }
  for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'key'; button.textContent = letter;
    button.setAttribute('aria-label', `Guess ${letter}`);
    button.addEventListener('click', () => guess(letter));
    byId('keyboard').append(button);
  }
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || !/^[a-z]$/i.test(event.key)) return;
    guess(event.key);
  });
  byId('new-game').addEventListener('click', newGame);
  newGame();
})();
