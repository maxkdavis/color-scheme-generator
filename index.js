const inputColorPickerEl = document.getElementById('seed-color');
const selectedColorEl = document.querySelector('.selected-color');
const schemeSelectorEl = document.getElementById('scheme-options');
const btnSubmitEl = document.querySelector('.btn-submit');
const colorsContainerEl = document.querySelector('.colors-container');

btnSubmitEl.addEventListener('click', function (e) {
  e.preventDefault();
  colorsContainerEl.innerHTML = ``; //resets entire UI in the colors container

  let scheme = schemeSelectorEl.value;
  let seedColor = inputColorPickerEl.value;

  getColors(cleanHex(seedColor), scheme); // passes a clean string to our getColors function by first called cleanHex()
});

function cleanHex(hexString) {
  let clippedHexStr = hexString.slice(1); //to remove '#' to we can pass into fetch api
  return clippedHexStr;
}

async function getColors(color, scheme) {
  const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`);
  const colorsData = await response.json();
  // console.log(colorsData);
  renderColors(colorsData.colors);
}

//list out our return scheme hex codes
function renderColors(colorsArray) {
  colorsArray.forEach(function (color) {
    //create each vertical container
    const colorColumnContainer = document.createElement('div');
    colorColumnContainer.classList.add('color-column');
    colorsContainerEl.appendChild(colorColumnContainer);
    //create the color <div>
    const colorColumn = document.createElement('div');
    colorColumn.classList.add('color');
    colorColumn.setAttribute('style', `background-color: ${color.hex.value}`);
    colorColumnContainer.appendChild(colorColumn);
    //create the color text
    const colorText = document.createElement('p');
    colorText.classList.add('seed-color');
    colorText.textContent = `${color.hex.value}`;
    colorColumnContainer.appendChild(colorText);
  });
}
