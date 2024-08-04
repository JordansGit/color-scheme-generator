const colorPicker = document.getElementById('color-picker')
const colorSchemeModeMenu = document.getElementById('color-scheme-menu')
const submitColorScheme = document.getElementById('color-scheme-submit')

let colorHexCode = colorPicker.value.substring(1)
let colorSchemeMode = colorSchemeModeMenu.value

console.log(colorHexCode)
console.log(colorSchemeMode)

colorPicker.addEventListener('input', function(e) {
  colorHexCode = e.target.value.substring(1)
})

colorSchemeModeMenu.addEventListener('input', function(e) {
  colorSchemeMode = e.target.value
})

submitColorScheme.addEventListener('click', function(e) {
  e.preventDefault()
  let displayColorScheme = document.getElementById('display-color-scheme')
  let displayColorSchemeHtml = ''

  // get colour scheme 
  fetch(`https://www.thecolorapi.com/scheme?hex=${colorHexCode}&mode=${colorSchemeMode}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    data.colors.forEach(color => {
      console.log(color.hex)

      displayColorSchemeHtml += `
        <div class="bg-${color.hex.clean}">${color.hex.clean}</div>
      `
    })
    console.log(displayColorScheme)
    displayColorScheme.innerHTML = displayColorSchemeHtml 

  })


})

