
# **Tweet Analyser**
Tweet Analyser is Node.js based Web App, which analyses the core meaning of the tweets and shows the sentiment. Tweet Analyser uses multiple NPM packages to extract and analyse the tweets in real time without generating much load on the primary server. In order to provide persistence to the users, Tweet Analyser uses MySQL database, which can be hosted locally or on the cloud. Tweet analyser shows the positivity percentage and the Word Cloud of the tweets related to the campaign terms/hashtags.   

## Usages
* Tweet Analyser can be used to track particular user’s tweets and can show sentiments of the tweet posted via user’s account. 
* Tweet Analyser can be used to track the impact of marketing campaign on the users. Based on the sentimental analyses companies can understand the user reaction on marketing campaign. 
## Screenshots 

## Demo
For the demo, clone the repository and move to the project folder and run the following commands. 

    npm install
    npm start

* Demo might not work due to unavailability of the twitter’s API keys.

## Setup

### Prerequisites
 * Node.js 
 * MySQL Community server
 * For the live system (Cloud based database services)
 * Twitter API Developer Credentials
### Build With 
 * [Express (Node.js web application framework)](https://expressjs.com/)
 * [MySQL](https://www.npmjs.com/package/mysql)
 * [Twitter](https://www.npmjs.com/package/twitter)
 * [Natural Language Processing](https://www.npmjs.com/package/natural) 
 * [Keyword Extractor](https://www.npmjs.com/package/keyword-extractor)
### Installing 
1. Create App on twitter developers platform to get the credentials.
2. once you get the credentials place it in the  **config.js** file in the project folder.
3.	Go to the Database folder and take the **twitter_tweets_dump.sql** file and import it to your MySQL Database. This file will create the basic twitter database with tweet table.
4. Access the project folder using command prompt and run following command.

	    npm install
	    npm start

5. Once it's connects successfully connects the database, go to the browser and visit **localHost:3000**.
### Install it in Live System
In order to install it in live system, you'll need to use Cloud based services such as AWS, Microsoft Azure, etc.
* Full documentation will be available soon for live scalable system. 
## Authors
* [Kishan Virani](https://www.virani.me) : kishan7492@gmail.com

## Licensing

