
let wordList;
        
        
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#review_form")
    fetch('../assets/json/AFINN165.json')
    .then(AFINN => AFINN.json()) //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    .then(AFINN => {
        form.addEventListener('submit', handleFormSubmit)
        wordList = AFINN
    })
    .catch(err => console.error(err));
    
})


    const handleFormSubmit = function(event) {
        event.preventDefault()


        const starRating = document.querySelector('input[name="star_rating"]:checked').value
        const firstName = event.target.first_name.value
        const lastName = event.target.last_name.value
        const reviewText = event.target.review_text.value

        sentimentAnalyser(reviewText);
        createResult(starRating, firstName, lastName, reviewText)
        document.querySelector("#review_form").reset()

    }

    let outOfTen;
    let sentimentsAsPercentages;
    const sentimentAnalyser = function(text) {

        const arrayOfSanitisedWords = latinOnlyArray(text)
        const arrayOfSentimentScores = sentimentArrayMinusNeutral(arrayOfSanitisedWords);
        const totalScore = arrayTotaller(arrayOfSentimentScores)
        const normalised = sentimentNormaliser(arrayOfSentimentScores)
        outOfTen = sentimentForEmoji(normalised)
        const mapOfAllPossibleScores = sentimentsGrouped(arrayOfSentimentScores)
        sentimentsAsPercentages = sentimentsGroupedAsPercentages(mapOfAllPossibleScores)
    }


    const latinOnlyArray = function(text) {
        return textToArray(text).map(stripNonLatinScriptCharacters)  
    }

    const textToArray = function(text) {
        return text.split(" ").map(word => word.toLowerCase())
    }

    const stripNonLatinScriptCharacters = function(word) {
        const pattern = new RegExp(/[^a-z]/g)
        return word.replace(pattern, "")
    }

    const sentimentForEmoji = function(normalisedScore) {
        return Math.ceil(normalisedScore/10)
    }

    const sentimentScoreMatcher = function(word) {
        return (wordList[word]) ? (wordList[word]) : (0) //undefined is falsey
    }

    const sentimentArrayMinusNeutral = function(arrayOfSanitisedWords) {
        return arrayOfSanitisedWords.map(sentimentScoreMatcher)
    }

    const arrayTotaller = function(array) {
        return array.reduce((runningTotal, num) => {return runningTotal + num},0)
    } 

    const sentimentNormaliser = function(array) {
        const arrayWithoutNeutral = scoresWithoutNeutral(array)
        const totalScore = arrayTotaller(arrayWithoutNeutral)
        const averageScorePerSentimentalWord = totalScore/arrayWithoutNeutral.length
        return (averageScorePerSentimentalWord+5)*10
    }

    const scoresWithoutNeutral = function(array){
        return array.filter(num => !Object.is(0,num))
    } 

    const sentimentsGrouped = function(arrayOfScores){
        const arrayWithoutNeutral = scoresWithoutNeutral(arrayOfScores)
        const mapOfAllPossibleScores = new Map([[-5, 0], [-4, 0], [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]])
        const uniqueScoresSet = new Set(arrayWithoutNeutral)
        const uniqueScoresArray = [...uniqueScoresSet] 
        const scoresFrequencyHash = new Map(uniqueScoresArray.map((score) => {return [score, frequencyCounter(arrayWithoutNeutral, score)]}))        
        const returnedTarget = new Map([...mapOfAllPossibleScores, ...scoresFrequencyHash])
        return returnedTarget 
    }

    const sentimentsGroupedAsPercentages = function(mapOfFrequencies) {
        const totalFrequencies =  arrayTotaller(Array.from(mapOfFrequencies.values()))
        mapOfFrequencies.forEach((v,k) => {mapOfFrequencies.set(k, v/totalFrequencies*100)})  //because mapOfFrequencies is a Map object we need to use set to assign a new value to the value.
        return mapOfFrequencies
    }
    

    const frequencyCounter = function(array, item) {
        return array.filter(each => Object.is(each, item)).length
    }
// this is horribly unreadable and not dry, are we supposed to indent the js that creates html child elements?
    const createResult = function(starRating, firstName, lastName, reviewText) {
        const unorderedList = document.querySelector("#form_result")
        const listItem = document.createElement('li')
        const h3 = document.createElement('h3')
        const h3Text = `${firstName} ${lastName}'s review`
        const starSpan = document.createElement('span')
        const stars = "⭐".repeat(starRating)
        unorderedList.prepend(listItem)
        listItem.appendChild(h3)
        listItem.appendChild(starSpan)
        h3.textContent = h3Text
        starSpan.textContent = stars

        const unorderedListEmoji = document.createElement('ul')
        unorderedListEmoji.classList.add('emoji');
        const emojiArray = ['🤬', '😡', '😠', '☹️', '😕', '😐', '🙂', '😊', '😀', '😁', '😍']
        emojiArray.forEach((emoji, index) => {
            const createdElem = document.createElement('li')
            unorderedListEmoji.appendChild(createdElem)
            createdElem.textContent = emoji  
            if (Object.is(outOfTen,index)) createdElem.classList.add('selected');
        })
        listItem.appendChild(unorderedListEmoji)
        // pieMaker(listItem)
        const textSpan = document.createElement('span')
        textSpan.classList.add('review_text');
        textSpan.textContent = reviewText
        listItem.appendChild(textSpan)
    }

    const pieMaker = function(listItem) {
        const parentDiv = document.createElement('div')
        parentDiv.classList.add('pie')
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS("http://www.w3.org/2000/svg", "width", "100%")
        svg.setAttributeNS("http://www.w3.org/2000/svg", "height", "100%")
        svg.setAttributeNS("http://www.w3.org/2000/svg", "viewBox", "-21 -21 42 42")
        svg.setAttributeNS("http://www.w3.org/2000/svg", "class", "donut")
        svg.setAttributeNS("http://www.w3.org/2000/svg", "fill", "transparent")
        svg.setAttributeNS("http://www.w3.org/2000/svg", "stroke-width", "3")
        const whiteCircle = document.createElementNS(null, "circle");
        whiteCircle.setAttributeNS("http://www.w3.org/2000/svg", "r", "16")
        whiteCircle.setAttributeNS("http://www.w3.org/2000/svg","fill", "#fff")
        const greyRing = document.createElementNS(null, 'circle')
        greyRing.setAttributeNS("http://www.w3.org/2000/svg", "r", "16")
        greyRing.setAttributeNS("http://www.w3.org/2000/svg", "stroke", "#d2d3d4")
        
        listItem.appendChild(parentDiv)
        parentDiv.appendChild(svg)
        svg.appendChild(whiteCircle)
        svg.appendChild(greyRing)




        
    }



