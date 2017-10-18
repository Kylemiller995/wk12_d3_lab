console.log("hi")
var url = "https://restcountries.eu/rest/v2/all"
var countriesArray = []

var addCountriesToList = function(countries) {
  var ul = document.getElementById('countries')
  countries.forEach(function(x){
    li = document.createElement('li');
    li.innerText =x.name
    ul.appendChild(li)
  })
}


var makeRequest = function (url) {
  var request = new XMLHttpRequest();
  request.open("GET", url)

  request.addEventListener("load", function() {
    var countries = JSON.parse(this.responseText)
    // addCountriesToList( countries )
    addCountriesToDrop( countries )
    console.log(countries)
    var dropMenu = document.getElementById('countries-drop')
    var jsonString = localStorage.getItem('country')
    var parsed = JSON.parse(jsonString)
    dropMenu.value = parsed.name
  })
  request.send()
}

// var button= document.getElementById('btn')
// button.addEventListener('click',function() {
//   makeRequest(url)
// })

var buttonClear = document.getElementById('clear')
buttonClear.addEventListener("click", function() {
  var ul = document.getElementById('countries')
  ul.innerHTML = ""
})


var addCountriesToDrop = function(countries) {
  var dropMenu = document.getElementById('countries-drop')
  dropMenu.addEventListener("change", function(e){
    console.log(e)
    var countryObj = countries[e.target.selectedIndex]
    clearBorders()
    arrayTings(countryObj)
    var pTag = document.getElementById('p-tag')
    pTag.innerText = "the country is " + countryObj.name + " and pop is " + countryObj.population
    var jsonStringed = JSON.stringify(countryObj)
    localStorage.setItem("country", jsonStringed)
  })
  countries.forEach(function(country){
    var option = document.createElement('option')
    option.innerText = country.name
    dropMenu.appendChild(option)
    this.countriesArray.push(country)
  })
}


var fillCountryData = function() {
  var dropMenu = document.getElementById('countries-drop')
  var pTag = document.getElementById('p-tag')
  var countryObj = dropMenu.value
}

var onLoad = function(){
}

var arrayTings = function(countryObj) {
  var borders = countryObj.borders

  var borderingCountries = []
  this.countriesArray.forEach(function(country){
    borders.forEach(function(borderingCountry){
      if (country.alpha3Code === borderingCountry) borderingCountries.push(country)
    })
  })
  console.log(borderingCountries);
  var drop = document.getElementById('ulthing')
  console.log(drop)
  borderingCountries.forEach(function(country){
    var p  = document.createElement('li')
    p.innerText = country.name
    drop.appendChild(p)
  })
}

var clearBorders = function() {
  var ul = document.getElementById('ulthing')
  while (ul.firstChild){
    ul.removeChild(ul.firstChild)
  }
}

makeRequest(url)
console.log(countriesArray)
