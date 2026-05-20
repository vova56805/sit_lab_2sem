// Вертикальная перестановка (расшифровка) + полный перебор предложенных ключей

const cipherText =
  "жаипбив_вз__Д_ьсогнввас_ила_естант_я_жл_ха,ев-доЧрв_нсьое.орежТИкееытедикнионоыд_";

const keys = [
  "комета",
  "метеорит",
  "лодка",
  "астрофизика",
  "аудитория",
  "тренировка",
  "генетика",
  "плавание",
  "сервер",
  "эксперимент",
  "экология",
  "субъект",
];


const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const alphaPos = new Map([...alphabet].map((ch, i) => [ch, i]));

function getReadOrder(key) {
  const k = key.toLowerCase();
  const arr = [...k].map((ch, idx) => {
    if (!alphaPos.has(ch)) {
      throw new Error(`Ключ содержит неизвестный символ "${ch}"`);
    }
    return { idx, pos: alphaPos.get(ch) };
  });

 
  arr.sort((a, b) => a.pos - b.pos || a.idx - b.idx);

  return arr.map((x) => x.idx);
}

function decryptVerticalTransposition(cipher, key) {
  const cols = key.length;
  const L = cipher.length;
  const rows = Math.ceil(L / cols);

 
  const rem = L % cols;
  const colLens =
    rem === 0
      ? new Array(cols).fill(rows)
      : Array.from({ length: cols }, (_, c) => (c < rem ? rows : rows - 1));

  const order = getReadOrder(key);

 
  const columns = new Array(cols).fill("");
  let p = 0;
  for (const colIdx of order) {
    const len = colLens[colIdx];
    columns[colIdx] = cipher.slice(p, p + len);
    p += len;
  }

 
  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const col = columns[c];
      if (r < col.length) out += col[r];
    }
  }

  return out;
}


for (const key of keys) {
  const raw = decryptVerticalTransposition(cipherText, key);


  console.log(`Ключ: ${key}`);
  console.log("Расшифровка:", raw);
  console.log("------------------------------------------------------------------------------------------");
}