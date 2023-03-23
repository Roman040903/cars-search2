const carContainer = document.querySelector('.cars')
const searchInput = document.querySelector('input')
const clearBtn = document.querySelector('button')

showCars(cars)

searchInput.oninput = handleSearch

clearBtn.onclick = () => {
  searchInput.value = '';
  handleSearch()
}
function handleSearch() {
  const value = searchInput.value.trim().toLowerCase()

  if (!value) {
    showCars(cars)
  } else if (value.length > 1) {
    const selectedCars = []

    for (let i = 0; i < cars.length; i++) {
      if (cars[i].make.toLowerCase().includes(value)
        || cars[i].model.toLowerCase().includes(value)
        || cars[i].year.toString().endsWith(value)) {

        selectedCars.push(cars[i])
      }
    }
    showCars(selectedCars)
    showSelection(value)
  }
}

function showSelection(value) {
  const titles = carContainer.querySelectorAll('h4')
  const texts = carContainer.querySelectorAll('p')
  const reTitles = new RegExp(`(${value})`, 'ig')
  const reYears = new RegExp(`${value}$`)

  for (let i = 0; i < titles.length; i++) {
    titles[i].innerHTML = titles[i].innerHTML.replaceAll(reTitles, `<span class="selection">$1</span>`)
    texts[i].innerHTML = texts[i].innerHTML.replace(reYears, `<span class="selection">${value}</span>`)
  }
}

function showCars(cars) {
  let html = ''

  for (let i = 0; i < cars.length; i++) {
    html += `
      <li class="car">
        <img src="https://media.wired.com/photos/63b8d0a771c6b526845f15a6/16:9/w_2400,h_1350,c_limit/CES-2023-PEUGEOT_INCEPTION_CONCEPT_2301CN202.jpg" alt="car">
        <h4>${cars[i].make} ${cars[i].model}</h4>
        <p>The best car in ${cars[i].year}</p>
        <h5 class="price">${cars[i].price}$</h5>
      </li>
    `
  }

  carContainer.innerHTML = html

}