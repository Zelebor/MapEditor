document.addEventListener('DOMContentLoaded', () => {
  const map = document.getElementById('map');
  const allies = document.getElementById('allies');
  const decorations = document.getElementById('decorations');
  const enemies = document.getElementById('enemies');
  const uploadInput = document.getElementById('upload-sprite');

  // Создание сетки карты
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    map.appendChild(cell);
  }

  // Добавление спрайтов в панель
  const sprites = {
    allies: ['ally1.png', 'ally2.png'],
    decorations: ['tree.png', 'rock.png'],
    enemies: ['goblin.png', 'orc.png']
  };

  for (const category in sprites) {
    sprites[category].forEach(sprite => {
      const spriteElement = document.createElement('div');
      spriteElement.classList.add('sprite');
      spriteElement.innerHTML = `<img src="sprites/${sprite}" alt="${sprite}">`;
      document.getElementById(category).appendChild(spriteElement);
    });
  }

  // Перетаскивание спрайтов
  let draggedSprite = null;

  document.querySelectorAll('.sprite').forEach(sprite => {
    sprite.addEventListener('dragstart', (e) => {
      draggedSprite = e.target.cloneNode(true);
    });
  });

  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    cell.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedSprite) {
        cell.appendChild(draggedSprite);
        draggedSprite = null;
      }
    });
  });

  // Обработка кликов по спрайтам
  map.addEventListener('click', (e) => {
    if (e.target.classList.contains('sprite')) {
      const sprite = e.target;
      const menu = document.createElement('div');
      menu.innerHTML = `
        <button onclick="rotateSprite(${sprite})">↻</button>
        <button onclick="deleteSprite(${sprite})">🗑️</button>
      `;
      sprite.appendChild(menu);
    }
  });

  // Загрузка пользовательских спрайтов
  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const spriteElement = document.createElement('div');
        spriteElement.classList.add('sprite');
        spriteElement.innerHTML = `<img src="${event.target.result}" alt="${file.name}">`;
        document.getElementById('decorations').appendChild(spriteElement);
      };
      reader.readAsDataURL(file);
    }
  });
});

function rotateSprite(sprite) {
  const img = sprite.querySelector('img');
  img.style.transform = img.style.transform ? '' : 'rotate(90deg)';
}

function deleteSprite(sprite) {
  sprite.remove();
}
