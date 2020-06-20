


document.addEventListener('DOMContentLoaded', () => {

    // load sentiment analysis JSON  
    fetch('../assets/json/ALFINN165.json')
    .then(ALFINN => ALFINN.json())
    .then(ALFINN => {
        console.log(ALFINN)
    })
    .catch(err => console.error(err));

    const form = document.querySelector("#review_form")
    form.addEventListener('submit', handleFormSubmit)
     

    

})

const handleFormSubmit = function(event) {
    event.preventDefault()
    this.reset(); 

    const starRating = document.querySelector('input[name="star_rating"]:checked').value
    const firstName = event.target.first_name.value
    const lastName = event.target.last_name.value
    const reviewText = event.target.review_text.value

    console.log(starRating)
    console.log(firstName);
    console.log(lastName);
    console.log(reviewText);

}


const sentimentAnalyser = function(text) {


    return //hash containing the overall result and a sub-hash of the percentage of each minus5 to plus5 result, and finally a hash of those without neutral words  
}