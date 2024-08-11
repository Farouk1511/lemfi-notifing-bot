require("dotenv").config();
var axios = require("axios");

function sendMessage(data) {
  const config = {
    method: "post",
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

   axios(config);
}

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      body: text,
    },
  });
}

function getTemplateMessageInput(
  recipient,
  templateName,
  variables,
  languageCode = "en_US"
) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: "en",
      },
      components: [
        {
          type: "body",
          parameters: variables.map((value) => ({
            type: "text",
            text: value,
          })),
        },
      ],
    },
  });
}

const getLemFiRate = async () => {
  try {
    const response = await axios.post(
      "https://lemfi.com/api/lemonade/v2/exchange",
      {
        from: "NGN",
        to: "CAD",
      },
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          Referer: "https://lemfi.com/",
          "Referrer-Policy": "origin",
        },
      }
    );

    let { data } = response.data;
    let rate = data.rate;

    return rate;
  } catch (e) {
    // console.log(e);
  }
};

module.exports = {
  sendMessage: sendMessage,
  getTextMessageInput: getTextMessageInput,
  getTemplateMessageInput: getTemplateMessageInput,
  getLemFiRate: getLemFiRate,
};
