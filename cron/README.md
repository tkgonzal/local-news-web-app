# Subscription Cron
A script that uses the node-cron module to periodically run a function to send out newsletters and notifications for MoNews subscription and comment updates.

## Tech Stack
* TypeScript
* Node

### Modules Used
* [axios](https://www.npmjs.com/package/axios)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [node-cron](https://www.npmjs.com/package/node-cron)
* [nodemailer](https://www.npmjs.com/package/nodemailer)
* [twilio](https://www.npmjs.com/package/twilio)

## Limitations
Twilio package for sending out texts is not usable with US numbers due to a toll-free verification process requirement which we can not go through as the process requires a business/legal entity to register the number to.

## Usage
Script is run in perpetuity to emulate cron jobs, calling the sendOutSubscriptionNewsletters function at the determined subscription frequency periods and the sendOutCommentNotifications function every day at midnight. 

*Note: A valid .env file __must__ be in the cron folder in order for the script to run properly*
