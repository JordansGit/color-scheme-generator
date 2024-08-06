const colorPicker = document.getElementById('color-picker')
const colorSchemeModeMenu = document.getElementById('color-scheme-menu')
const submitColorScheme = document.getElementById('color-scheme-submit')

let colorHexCode = colorPicker.value.substring(1)
let colorSchemeMode = colorSchemeModeMenu.value


// Get Colour Hex Code  
colorPicker.addEventListener('input', function(e) {
  colorHexCode = e.target.value.substring(1)
})

// Get Colour Scheme Mode 
colorSchemeModeMenu.addEventListener('input', function(e) {
  colorSchemeMode = e.target.value
})

// Get Colour Scheme Values and display them. 
submitColorScheme.addEventListener('click', function(e) {
  e.preventDefault()

  fetch(`https://www.thecolorapi.com/scheme?hex=${colorHexCode}&mode=${colorSchemeMode}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      render(data)
      setBgColours(data) // set bg colours after colour classes have been created
    })
})


function setBgColours(colorData) {
  colorData.colors.forEach(color => {
    document.getElementsByClassName(`bg-${color.hex.clean}`)[0].style.backgroundColor = color.hex.value
  })
}

function render(colorData) {
  const displayColorScheme = document.getElementById('display-color-scheme')
  const hexFooterEl = document.getElementById('hex-footer')

  let displayColorSchemeHtml = ''
  let displayHexValueHtml = ''

  colorData.colors.forEach(color => {
    displayColorSchemeHtml += `
      <div class="bg-${color.hex.clean}"></div>
    `
    displayHexValueHtml += `
      <div class="bg-${color.hex.value}">${color.hex.value}</div>
    `
  })

  displayColorScheme.innerHTML = displayColorSchemeHtml 
  hexFooterEl.innerHTML = displayHexValueHtml
}