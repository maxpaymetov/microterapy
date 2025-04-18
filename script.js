const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function drawIntro() {
  ctx.fillStyle = 'red';
  ctx.font = '18px Courier New';
  ctx.fillText('Microterapy: Ужасы больницы', 120, 180);
  ctx.fillText('Нажми любую клавишу...', 150, 210);
}

function fetchLeaderboard() {
  fetch('backend/leaderboard.json')
    .then(res => res.json())
    .then(data => {
      const board = document.getElementById('leaderboard');
      board.innerHTML = '<h3>Leaderboard</h3>';
      data.forEach(player => {
        board.innerHTML += `<p>${player.name} — ${player.ending} — ${player.kills} монстров</p>`;
      });
    });
}

drawIntro();
fetchLeaderboard();

document.addEventListener('keydown', () => {
  // Запуск игры (переход к основной логике)
});
