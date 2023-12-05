# Subscription Cron
A script that uses the node-cron module to periodically run a function to send out newsletters for MoNews subscription updates.

## Tech Stack
* TypeScript
* Node

### Modules Used
* [Axios](https://www.npmjs.com/package/axios)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Node-cron](https://www.npmjs.com/package/node-cron)
* [Nodemailer](https://www.npmjs.com/package/nodemailer)
* [Twilio](https://www.npmjs.com/package/twilio)

## Limitations
Twilio package for sending out texts is currently not in use, due to a toll-free verification process requirement to send messages to US numbers, which we can not the verification requires a business/legal entity to register the number to.

## Usage
Script is run in perpetuity, calling the sendOutSubscriptionNewsletters function at the determined subscription frequency periods. *Note: A valid .env file __must__ be in the cron folder in order for the script to run properly*