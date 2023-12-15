// Given a message string and possibly an error, logs the message indicating
// activity taken by the cron and any arrors that occured along with it as 
// applicable
const logActivity = (message: string, error?: any) => {
    console.log(`${(new Date().toLocaleDateString())}: ${message}`);
    error && console.log(error);
}

export default logActivity;