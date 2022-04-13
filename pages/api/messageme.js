import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  const { message, name, returnInfo } = body;

  // TODO: send message to my phone
  const twilioClient = twilio(accountSid, authToken);
  let twilioResponse = await twilioClient.messages.create({
    body: `${name}: \n\n${message} \n\n RETURN TO: ${returnInfo}`,
    from: twilioNumber,
    to: "+14052024472",
  });

  console.log(twilioResponse);
  // TODO: respond with 200 if successful,
  // TODO: otherwise respond with appropiate error message:

  res.status(200).end();
}
