# Hangman

A responsive, dependency-free browser game with category hints, physical and on-screen keyboard input, six chances, and new-word rounds.

## Run

From `/workspace/Hangman`:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open the served site in your browser. You can also open `index.html` directly. No package installation, secrets, or build step is required.

## Test

Requires Node.js 18 or newer:

```sh
node --test game.test.js
```

Edit `words` in `game.js` to add categories and uppercase English words.
