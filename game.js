let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')
//initialize empty url outside of function
let url = ''
// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file,
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available


// TODO when the page loads, select an element at random from the countriesAndCodes array
// TODO display the country's name in the randomCountryElement

//this function selects a random country from countriesAndCode array by looping through - then adds it to the url via template string

function gameStart (){
    //random country selection (the random function code/math is from stack overflow )
    let randomCountry = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)]
    //loop through array to select each country object
    countriesAndCodes.forEach(function (country){
        //display random country
        randomCountryElement.innerHTML = randomCountry.name
        //get alpha-2 from country object
        let alpha = randomCountry["alpha-2"].toLowerCase()
        //add alpha-2 to url to connect to specific country in API
        url=`https://api.worldbank.org/v2/country/${alpha}?format=json`
        console.log(url)
    })
}

gameStart()


// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"

submitButton.addEventListener('click', function (){
    let answer = userAnswerElement.value
    fetch(url)
        .then( (response) => {
            // response is all the things from the server
            console.log(response) // logging response to check if working
            // extract JSON
            return response.json()
        })
        .then( function(data) { //after extracting object from API loop through it for info

            data[1].forEach(function (countryInfo){
                //check if capital city matches user input
                if(answer  != countryInfo.capitalCity){
                    resultTextElement.innerHTML = `Incorrect. The Capital of ${countryInfo.name} is ${countryInfo.capitalCity}. Not ${userAnswerElement.value}`
                }
                else{
                    resultTextElement.innerHTML = `Correct! The Capital of ${countryInfo.name} is ${countryInfo.capitalCity}.`
                }
            })
        }) //if issues connecting to API error displays
        .catch( error => {
            console.log(error)
            alert('ERROR')
        })
})

// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 

playAgainButton.addEventListener('click', function(){
    //clears user input and result
    userAnswerElement.value = ''
    resultTextElement.innerHTML = ''
    //calls game start to select new random country & update url with it
    gameStart()
})