const showBtn = document.getElementById("showBtn");
const calcBtn = document.getElementById("calcBtn");
const clearBtn = document.getElementById("clearBtn");

const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");

const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");

const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const resultError = document.getElementById("resultError");

const figureContainer = document.getElementById("figureContainer");
const results = document.getElementById("results");

const calcPerimeter = document.getElementById("calcPerimeter");
const calcArea = document.getElementById("calcArea");
const calcHeight = document.getElementById("calcHeight");

function getSelectedType() {
  return document.querySelector('input[name="inputType"]:checked').value;
}

function renderFigure(type) {
  if (type === "diagonals") {
    figureContainer.innerHTML = `
      <div>
        <svg viewBox="0 0 320 250" aria-label="Ромб с диагоналями">
          <polygon points="160,30 280,125 160,220 40,125"
                   fill="#e8f1ff" stroke="#245bb1" stroke-width="3"/>
          
          <line x1="160" y1="30" x2="160" y2="220"
                stroke="#d93025" stroke-width="3" stroke-dasharray="6 5"/>
          <line x1="40" y1="125" x2="280" y2="125"
                stroke="#0f9d58" stroke-width="3" stroke-dasharray="6 5"/>
          
          <text x="170" y="128" font-size="18" fill="#d93025">d1</text>
          <text x="150" y="115" font-size="18" fill="#0f9d58">d2</text>
        </svg>
        <div class="figure-note">Вводятся диагонали ромба: d1 и d2</div>
      </div>
    `;
  } else {
    figureContainer.innerHTML = `
      <div>
        <svg viewBox="0 0 320 250" aria-label="Ромб со стороной и углом">
          <polygon points="100,40 240,85 220,210 80,165"
                   fill="#fff4d9" stroke="#c27a00" stroke-width="3"/>
          
          <line x1="100" y1="40" x2="240" y2="85"
                stroke="#245bb1" stroke-width="4"/>
          
          <path d="M 120 165 A 28 28 0 0 1 100 136"
                fill="none" stroke="#d93025" stroke-width="3"/>
          
          <text x="165" y="55" font-size="18" fill="#245bb1">a</text>
          <text x="107" y="137" font-size="18" fill="#d93025">α</text>
        </svg>
        <div class="figure-note">Вводятся сторона a и угол α (в градусах)</div>
      </div>
    `;
  }
}

function updateInputFields() {
  const type = getSelectedType();

  clearAllErrors();
  results.textContent = "Результаты появятся здесь";
  results.classList.add("empty");

  if (type === "diagonals") {
    label1.textContent = "Диагональ d1";
    label2.textContent = "Диагональ d2";
    value1.placeholder = "Введите d1";
    value2.placeholder = "Введите d2";
  } else {
    label1.textContent = "Сторона a";
    label2.textContent = "Угол α (в градусах)";
    value1.placeholder = "Введите сторону a";
    value2.placeholder = "Введите угол α";
  }

  renderFigure(type);
}

function clearAllErrors() {
  error1.textContent = "";
  error2.textContent = "";
  resultError.textContent = "";

  value1.classList.remove("error");
  value2.classList.remove("error");
}

function clearInputs() {
  value1.value = "";
  value2.value = "";
  clearAllErrors();
  results.textContent = "Результаты появятся здесь";
  results.classList.add("empty");
}

function validateInputs() {
  clearAllErrors();

  const type = getSelectedType();
  const v1 = Number(value1.value);
  const v2 = Number(value2.value);

  let isValid = true;

  if (value1.value.trim() === "") {
    error1.textContent = "Поле не должно быть пустым";
    value1.classList.add("error");
    isValid = false;
  } else if (isNaN(v1) || v1 <= 0) {
    error1.textContent = "Введите число больше 0";
    value1.classList.add("error");
    isValid = false;
  }

  if (value2.value.trim() === "") {
    error2.textContent = "Поле не должно быть пустым";
    value2.classList.add("error");
    isValid = false;
  } else if (isNaN(v2) || v2 <= 0) {
    error2.textContent = "Введите число больше 0";
    value2.classList.add("error");
    isValid = false;
  }

  if (type === "sideAngle" && !isNaN(v2) && (v2 <= 0 || v2 >= 180)) {
    error2.textContent = "Угол должен быть больше 0 и меньше 180 градусов";
    value2.classList.add("error");
    isValid = false;
  }

  if (!calcPerimeter.checked && !calcArea.checked && !calcHeight.checked) {
    resultError.textContent = "Выберите хотя бы одну вычисляемую характеристику";
    isValid = false;
  }

  return isValid;
}

function roundNumber(num) {
  return Number(num.toFixed(3));
}

function calculateRhombus() {
  if (!validateInputs()) {
    results.textContent = "Исправьте ошибки ввода";
    results.classList.remove("empty");
    return;
  }

  const type = getSelectedType();
  const x = Number(value1.value);
  const y = Number(value2.value);

  let side;
  let perimeter;
  let area;
  let height;

  if (type === "diagonals") {
    const d1 = x;
    const d2 = y;

    side = Math.sqrt((d1 * d1 + d2 * d2) / 4);
    perimeter = 4 * side;
    area = (d1 * d2) / 2;
    height = area / side;
  } else {
    const a = x;
    const angleDeg = y;
    const angleRad = angleDeg * Math.PI / 180;

    side = a;
    perimeter = 4 * a;
    area = a * a * Math.sin(angleRad);
    height = a * Math.sin(angleRad);
  }

  let output = "";

  if (calcPerimeter.checked) {
    output += `
      <div class="result-item">
        Периметр: <span class="result-value">${roundNumber(perimeter)}</span>
      </div>
    `;
  }

  if (calcArea.checked) {
    output += `
      <div class="result-item">
        Площадь: <span class="result-value">${roundNumber(area)}</span>
      </div>
    `;
  }

  if (calcHeight.checked) {
    output += `
      <div class="result-item">
        Высота ромба: <span class="result-value">${roundNumber(height)}</span>
      </div>
    `;
  }

  results.innerHTML = output;
  results.classList.remove("empty");
}

showBtn.addEventListener("click", updateInputFields);
calcBtn.addEventListener("click", calculateRhombus);
clearBtn.addEventListener("click", clearInputs);

value1.addEventListener("input", () => {
  value1.classList.remove("error");
  error1.textContent = "";
});

value2.addEventListener("input", () => {
  value2.classList.remove("error");
  error2.textContent = "";
});

updateInputFields();