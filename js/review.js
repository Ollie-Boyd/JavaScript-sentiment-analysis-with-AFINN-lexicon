


document.addEventListener('DOMContentLoaded', () => {

    // load sentiment analysis JSON  
    fetch('../assets/json/ALFINN165.json')
    .then(ALFINN => ALFINN.json())
    .then(ALFINN => {
        console.log(ALFINN)
    })
    .catch(err => console.error(err));


    

})
