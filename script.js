const board = document.getElementById("board");
const colors = ["blue", "yellow", "red", "green"];
const samePages = [1,5,9,13,17,21,25,29];
let cells = [];

for (let row = 0; row < 5; row++) { // 5 linhas
  for (let col = 0; col < 6; col++) { // 6 colunas
    let i = row * 6 + col + 1;
    if (row % 2 === 1) {
      i = row * 6 + (6 - col);
    }
    if (i === 31) break; // parar no 31
    const cell = document.createElement("div");
    cell.className = "cell";
    if (i === 1) {
      cell.textContent = "スタート";
      cell.classList.add("start");
      cell.dataset.num = 0;
    } else if (i === 30) {
      cell.textContent = "ゴール";
      cell.classList.add("goal");
      cell.dataset.num = 30;
    } else {
      cell.textContent = i - 1;
      cell.classList.add(colors[(i - 2) % 4]);
      cell.dataset.num = i - 1;
    }
    cell.id = `cell-${i - 1}`;

    const markerContainer = document.createElement("div");
    markerContainer.className = "markers";
    cell.appendChild(markerContainer);

    if (i > 1 && i < 30) {
      if (samePages.includes(i - 1)) {
        cell.onclick = () => window.open("pagina_externa.html", "_blank");
      } else {
        cell.onclick = () => window.open(`pergunta_${i - 1}.html`, "_blank");
      }
    }
    board.appendChild(cell);
    cells.push(cell);
  }
}

const animals = ["capivara", "arara", "tucano", "quati", "tamandua", "boto"];
const groups = {};
let selectedAnimal = 1;

const animalContainer = document.getElementById("animal-select");
animals.forEach((name, index) => {
  const img = document.createElement("img");
  img.src = `imagens/${name}.png`;
  img.onclick = () => selectAnimal(index + 1, img);
  if (index === 0) img.classList.add("selected");
  animalContainer.appendChild(img);
});

function selectAnimal(num, img) {
  selectedAnimal = num;
  document.querySelectorAll("#animal-select img").forEach(el => el.classList.remove("selected"));
  img.classList.add("selected");
}

for (let i = 1; i <= 6; i++) {
  groups[i] = { position: 0 };
  const marker = document.createElement("img");
  marker.src = `imagens/${animals[i - 1]}.png`;
  marker.className = "marker";
  groups[i].marker = marker;
  document.querySelector(`#cell-0 .markers`).appendChild(marker);
}

function moveSelected(step) {
  moveGroup(selectedAnimal, step);
}

function moveGroup(groupNum, step) {
  let pos = groups[groupNum].position + step;
  if (pos < 0) pos = 0;
  if (pos > 30) pos = 30; // máximo agora é 30
  groups[groupNum].position = pos;
  document.querySelector(`#cell-${pos} .markers`).appendChild(groups[groupNum].marker);
}
