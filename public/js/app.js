
console.log('Javascript loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const resultOne = document.querySelector('#result-1')
const resultTwo = document.querySelector('#result-2')
const resultTree = document.querySelector('#result-3')
const resultFourth = document.querySelector('#result-4')
const resultFive = document.querySelector('#result-5')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    
    const location = search.value


    resultOne.textContent = 'loading ...'
    resultTwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            resultOne.textContent = data.error
        } else {
            $(document).ready(function() {
                $(".lds-roller").hide();
            });

           
            resultOne.textContent = data.location
            resultTwo.textContent = data.forecast
            resultTree.textContent = data.forecast.name
            
           
           
            
            
                    
        }
    })
})
})

