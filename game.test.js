const test = require('node:test');
const assert = require('node:assert/strict');
const { createGame } = require('./game');
test('correct guesses reveal repeated letters and win', () => {
  const game = createGame('APPLE');
  for (const letter of 'aple') assert.equal(game.guess(letter), true);
  assert.equal(game.won, true);
  assert.equal(game.misses, 0);
  assert.equal(game.guess('Z'), false);
});
test('six unique misses lose and prevent more guesses', () => {
  const game = createGame('APPLE');
  for (const letter of 'BCDFGH') game.guess(letter);
  assert.equal(game.misses, 6);
  assert.equal(game.lost, true);
  assert.equal(game.guess('A'), false);
});
test('duplicates and invalid input do not consume chances', () => {
  const game = createGame('APPLE');
  assert.equal(game.guess('z'), true);
  for (const letter of ['Z', '!', '', 'AB']) assert.equal(game.guess(letter), false);
  assert.equal(game.misses, 1);
  assert.equal(game.won, false);
});
