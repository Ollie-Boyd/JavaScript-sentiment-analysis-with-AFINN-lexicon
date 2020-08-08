>## Brief
>
>Your task is to create a front-end JavaScript application that allows users to input items and see them displayed in a list. Choose a theme for the application, such as a list of endangered Animals / favourite Sports Stars / any other theme of your choice. Users should be able to enter values for different properties relating to the theme (Name, Species and Continent, for example) and see them displayed below.
>
>### MVP
>
>- Create a form in HTML with inputs for relevant data
>- When the form is submitted, access the data from the form in the form's submit `event` object
>- Create a list in HTML
>- Append the submitted data to the list


## Screenshot
<p align="center">
<img src="https://raw.githubusercontent.com/Ollie-Boyd/JavaScript-sentiment-analysis-with-AFINN-lexicon/master/screenshots/Events.png" width=50% height=auto%>
</p>


## Approach
The brief wasn't too challenging or exciting so I thought I would use it as an excuse to practice getting to grips with functional programming in JavaScript and try my hand at some basic sentiment analysis. 

* After reading far too much about neural networks I realised I was in too deep and needed to start simple. I found the [ALFINN](https://medium.com/@himanshu_23732/sentiment-analysis-with-afinn-lexicon-930533dfe75b) dictionary where words are ranked according to positivity or negativity. From this we can analyse text (although in only a simplistic way).

* I also had to get to grips with Regular Expressions. Although I only ended up using the most elimentary RegEx imaginable, it was good to have a read as it's something I have used before in the past and needed a refresher on how to construct them.  

* I wanted to have a piechart for each review showing the spread of ALFINN rankings but I ran out of time. There is a lot of pie-related methods in case you were wondering why they are there. 

* Finally, being a millenial, I wanted the sentiments displayed as emoji. Which was somewhat fun. 

##What I learned? 

* This was a good small project. I learned that although JavaScript doesn't have the same quantity of ennumerators as Ruby, you can do most of the same stuff. And the Spread operator is awesome! It definitely makes-up for any shortfall. 

* Such simple sentiment analysis does have its (major) shortcomings. It can only understand the least nuanced use of english and can't read intensifiers, punctuation, sarcasm, restrained anger etc. 

* It did make me really interested in learning more about the subject and I hope to look into more once I leave CodeClan. [Brain.js](https://medium.com/openmindonline/emotion-detection-with-javascript-neural-networks-5a408f84eb75) seems like a cool project when I have more time. 


