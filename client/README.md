# MoNews Client
User facing part of the app. Takes necessary data from the backend server, and presents it to the end user. 
Also responsible for taking in user input, and sending it to the server when necessary.

## Tech Stack 
* TypeScript
* React
* Node

### Modules
* [axios](https://www.npmjs.com/package/axios)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [js-cookie](https://www.npmjs.com/package/js-cookie)
* [react-dom](https://www.npmjs.com/package/react-dom)
* [react-hook-form](https://www.npmjs.com/package/react-hook-form)
* [react-quill](https://www.npmjs.com/package/react-quill)
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)

## Usage
[Vercel hosted site](https://mo-news.vercel.app/)

This is the user interface for the MoNews application, intended for users to view, manage, and receive updates on news articles from various sources in the Central Valley. 

*Note: A valid .env file __must__ be in the client folder for the client to properly operate.*

### News Pages
Displays articles thumbnails from our backend server according to various categories, including:
* Breaking News
* Local News
* Crime
* Government
* Education
* Sports

### Article Pages
Displays an article in its entirety after a user clicks on its thumbnail or is directed there in some other manner such as by URL

### Login/Register Pages
Allows users to create accounts and login, or reset their password

### Business Pages
Allows businesses with an account to form groups, manage members in those groups, upload or manage articles, and receive notifications for user engagement with their articles

### Subscription Page
Allows users to follow categories, and receive alerts for those categories at regular intervals

### Staff Page
Displays all team members for development of this application