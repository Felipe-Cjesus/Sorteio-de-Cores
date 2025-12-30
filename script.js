const predefinedColors = [
    { name: 'Vermelho', value: '#f87171' },
    { name: 'Laranja', value: '#fb923c' },
    { name: 'Amarelo', value: '#facc15' },
    { name: 'Verde', value: '#4ade80' },
    { name: 'Ciano', value: '#22d3ee' },
    { name: 'Azul', value: '#60a5fa' },
    { name: 'Roxo', value: '#a78bfa' },
    { name: 'Rosa', value: '#f472b6' },
    { name: 'Coral', value: '#fca5a5' },
    { name: 'Verde Água', value: '#34d399' },
    { name: 'Preto', value: '#000000' },
    { name: 'Branco', value: '#ffffff' }
  ];

  const namesInput = document.getElementById('names');
  const resultsEl = document.getElementById('results');
  const customColorsEl = document.getElementById('customColors');
  const drawBtn = document.getElementById('drawBtn');
  const countdownEl = document.getElementById('countdown');
  const modeSwitch = document.getElementById('modeSwitch');
  const modeLabel = document.getElementById('modeLabel');

  modeSwitch.addEventListener('change', () => {
    const isCustom = modeSwitch.checked;
    modeLabel.textContent = isCustom ? 'Escolher cores' : 'Cores aleatórias';
    customColorsEl.style.display = isCustom ? 'flex' : 'none';
    customColorsEl.innerHTML = '';

    if (isCustom) {
      getNames().forEach(() => {
        const input = document.createElement('input');
        input.type = 'color';
        customColorsEl.appendChild(input);
      });
    }
  });

  function getNames() {
    return namesInput.value
      .split(/,\s*|\n\s*/)
      .map(n => n.trim())
      .filter(Boolean);
  }

  function drawColors() {
    const names = getNames();
    if (names.length === 0) return;

    if (!modeSwitch.checked && names.length > predefinedColors.length) {
      alert('Quantidade de nomes maior que o número de cores disponíveis.');
      return;
    }

    drawBtn.disabled = true;
    resultsEl.innerHTML = '';

    let count = 3;
    countdownEl.textContent = count;

    const countdownTimer = setInterval(() => {
      count--;
      countdownEl.textContent = count > 0 ? count : 'Pronto!';
      if (count < 0) clearInterval(countdownTimer);
    }, 700);

    const shuffleInterval = setInterval(() => {
      resultsEl.innerHTML = '';
      names.forEach(name => {
        const temp = document.createElement('div');
        temp.className = 'result';
        const r = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
        temp.style.background = r.value;
        temp.textContent = name;
        resultsEl.appendChild(temp);
      });
    }, 100);

    setTimeout(() => {
      clearInterval(shuffleInterval);
      countdownEl.textContent = '';
      resultsEl.innerHTML = '';

      let availableColors = [...predefinedColors];

      names.forEach((name, index) => {
        let color;
        let styleColorFont;
        if (modeSwitch.checked) {
          const value = customColorsEl.children[index]?.value || '#cccccc';
          color = { name: value.toUpperCase(), value };
        } else {
          const idx = Math.floor(Math.random() * availableColors.length);
          color = availableColors.splice(idx, 1)[0];
        }

        if(color.value == "#000000") {
          styleColorFont = "style='color: white'";
        }
        
        const div = document.createElement('div');
        div.className = 'result';
        div.style.background = color.value;
        div.innerHTML = `<div ${styleColorFont}>${name}</div><small ${styleColorFont}>${color.name}</small>`;
        resultsEl.appendChild(div);
      });

      drawBtn.disabled = false;
    }, 2200);
  }

  /* Testes simples (sanity checks) */
  console.assert(typeof drawColors === 'function', 'drawColors deve estar definida');
  console.assert(Array.isArray(predefinedColors), 'predefinedColors deve ser um array');