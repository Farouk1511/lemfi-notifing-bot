require("dotenv").config();
const {
  sendMessage,
  getTemplateMessageInput,
  getLemFiRate,
} = require("./messageHelper");

const sendWhatsappMessage = async() => {
    try {
        //get rate
        let ngnPrice = await getLemFiRate();
    
        // NGN -> CAD
        ngnPrice = 1 / ngnPrice;
    
        // Generate message template
        let message = getTemplateMessageInput(process.env.RECIPIENT_WAID, "lemfi", [
          ngnPrice,
        ]);
    
        // send message on whatsapp
        await sendMessage(message);
        //   console.log(sent.data);
        console.log("message sent")
      } catch (error) {
        console.error("Error sending message", error);
      }
}

setInterval(() => {
    sendWhatsappMessage()
},86400000)



// const job = new cron.CronJob(
// 	'1 * * * * *', // cronTime
// 	function () {
// 		console.log('You will see this message every min');
// 	}, // onTick
// 	null, // onComplete
// 	true, // start
// 	'America/Toronto' // timeZone
// );

