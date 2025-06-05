import { ToxotidaeClient } from '../ToxotidaeClient.js';
import 'dotenv/config';
async function main() {
    if (!process.env.BASE_URL) {
        console.log('Please set your the BASE_URL to SMS Gateway in .env!');
    }
    if (!process.env.USERNAME) {
        console.log('Please set your the USERNAME for the SMS Gateway in .env!');
    }
    if (!process.env.PASSWORD) {
        console.log('Please set your the PASSWORD for the SMS Gateway in .env!');
    }
    if (!process.env.PHONE_NUMBER) {
        console.log('Please set your PHONE_NUMBER in .env!');
    }
    const baseUrl = process.env.BASE_URL;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const phoneNumber = process.env.PHONE_NUMBER;
    const client = new ToxotidaeClient(baseUrl, username, password);
    await client.login();
    await client.sendSMS(phoneNumber, "Hallo von TRB140!");
    await client.logout();
    console.log('Finish send!');
}
main().catch(console.error);
//# sourceMappingURL=SendSmsTest.js.map