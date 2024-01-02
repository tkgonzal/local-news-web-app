# MoNews Server
A REST API express server that provides the means to interact with the MongoDB database for the MoNews App.

## Tech Stack
* TypeScript
* Node
* Express
* MongoDB

### Modules Used
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [case](https://www.npmjs.com/package/case)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [mongodb](https://www.npmjs.com/package/mongodb)
* [ts-node](https://www.npmjs.com/package/ts-node)

## Usage 
Server runs in perpetuity and provides a REST API for the client, crawler, and cron to make requests to to get and alter data from the database for the app. 

*Note: A valid .env file __must__ be present in the server folder for the server to start.*

## Endpoints

*Note: All files which indicate they __Require Authorization__ will require an Authorization header in their header's option in the format of "Bearer __[ACCESS/AUTH TOKEN]__"*

### ```Article``` - /api/article
* ```[GET] /:uid```

    Returns a response with a json object of the article with an id of the given uid if it exists.

* ```[POST] /new```

    Requires Authorization. Given an articleData object in the request's body of the following type: 
    ```
    interface articleData {
        heading: string;
        subHeading: string;
        authors: string[];
        body: string | string[];
        businessId: string;
        allowComments: boolean;
        allowAnonymousComments: boolean;
    }
    ```
    creates a new article object with the articleData and adds it to the database.

* ```[PUT] /:articleId```

    Requires Authorization. Given an articleId for an article in the database and an articleData object in the request's body *(as specified in the documentation for __[POST] /api/new__)*, updates the article of articleId to have the values of the given articleData.

* ```[POST] /:articleId/comment```

    Requires Authorization. Given an articleId for an article in the database as a parameter and an object with a comment key and string value as the body, adds the comment to the article associating it with the user whose Auth token was used to post the comment.

* ```[POST] /:articleId/anoncomment```

    Given an articleId for an article in the database as a parameter and an object with a comment key and a string value as the body, adds the comment to the article associating it with the IP of the client which sent the anonymous comment request if none are already associated with the article.

* ```[PUT] /engagements/:articleId```

    Requires Authorization. Given an articeId for an article in the database, increases the engagements of that article by 1.

* ```[DELETE] /:articleId```

    Requires Authorization. Given an articleId for an article in the database, deletes the article.

### ```Articles``` - /api/articles
* ```[GET] /```

    Must provide a query of tag, whose value is a valid ArticleTag. Given a valid tag, returns all articles in the db of the given tag.

* ```[GET] /subscriptions```

    Must provide a query of frequency, whose value is a valid SubscriptionFrequency. Given a valid frequency, returns an articles object of the following type: 
    ```
    interface articles {
        newArticles: Article[];
        "Breaking News": Article[];
        "Local News": Article[];
        "Crime": Article[];
        "Sports": Article[];
        "Government": Article[];
        "Education": Article[];
    }
    ```
    Where newArticle denotes an array of all new articles created in the given frequency period, and every other key's array consists of an array of all new articles of that given key's ArticleTag.

### ```Authorization``` - /api/auth
* ```[POST] /login```

    Given a body with an email and password, attempts to validate the given email and password. If the email and password are valid and associated with a user without a disabled login, returns an json response with an accessToken and the user for the credentials.

* ```[POST] /relogin```

    Requires Authorization. Given an authorization token, attempts to validate it. If validated, returns a json response for the user to remain logged into the client.

### ```Business``` - /api/business

* ```[GET] /users/:businessId``` 

    Requires Authorization. Given a parameter of a businessId returns a json object with a users key that contains an array of all users associated with the businessId.

* ```[GET] /articles/:businessId```

    Requires Authorization. Given a parameter of a valid business Id, returns a response with a json object containing an articles key consisting of an array of all articles with a matching businessId.

* ```[GET] /notifications/users```

    Requires Authorization. Returns a response with all users who have opted in to receive notifications for articles associated with their business receiving new comments.

* ```[GET] /notifications/:businessId```

    Requires Authorization. Given a parameter of a valid business id, returns a response with all comments posted to articles associated with that business id posted in the past day.

* ```[PUT] /notifications```

    Requires Authorization. Given a request with a body that has a valid _id for a user in the database and a valuesToUpdate object of the following type: 
    ```
    interface valuesToUpdate {
        receivesCommentNotifications: boolean;
    }
    ```
    updates the receivesCommentNotifications value for the user of _id, making it so they receive an email anytime an article associated with their business is created.


### ```Confirm Reset Password``` - /api/confirm-password-reset
* ```[POST] /reset```

    Requires authorization. Given a body with a key of newPassword whose value is a string for a new password, updates the password of the user associated with the auth token. Meant to only be called by a generated reset password page from the app.

### ```Request Password Reset``` - /api/request-password-reset
* ```[POST] /send-request-link```
    
    Given an email for a user in the database, generates an auth token for a reset password page for the user and emails it to them. Meant to only ever be called by the app.

### ```Subscriptions``` - /api/subscriptions
* ```[GET] /```

    Requires Authorization. May be called with a email or phone query, where both are either a valid email or phone number respectively. Returns a response with a subscriptions object that is an array of all subscriptions that match either the email or phone if given, or all subscriptions if neither are given.

* ```[GET] /:frequency```

    Requires Authorization. Must be called with a frequency parameter that is a valid SubscriptionFrequency. Returns a response with a subscriptions object that is all subscriptions that match the given frequency.

* ```[POST] /new```

    Requires Authorization. Request must have a subscriptionData object in its body of type Subscription. Creates and adds to the database a new subscription using the subscriptionData.

* ```[PUT] /```

    Requires Authorization. Request must have a subscriptionData object in its body of type Subscription. Updates the subscription that matches the given subscriptionData's email or phone.

### ```Users``` - /api/users
* ```[GET] /id/:userId```

    Requires Authorization. Request must have a userId parameter. Returns a response object with a userById object, which is either the user that matches the userId or null.

* ```[POST] /register```

    Request must have a body that contains a userData object of the following type:
    ```
    type userData {
        email: string;
        password: string;
        accType: "User" | "Business";
        businessName: string;
        businessWebsite: string;
        mobileNumber: string;
    }
    ```
    and attempts to create and add a new User to the database using the given userData.

* ```[POST] /email```

    Requires Authorization. Request must have a body with an email key. Returns a response with a userByEmail object of type User, or null if no users exist with the given email.

* ```[PUT] /id/:userId```

    Requires Authorization. Request must have a userId parameter and a body with a userValues object of type User. Updates the values of a user with id userId to the values of userValues if they exist.
