import { sendMailService } from "./MailService";


describe("Avançado", () => {

    it("O sistema deve ser capaz de enviar um email notificando o envio e recebimento de um pix.", async () => {

        const sendMailData = {

            nameSend: "TestSend",
            nameReceiver: "TestReceiver",
            emailSend: "david27alves@gmail.com",
            emailReceiver: "david27alves@gmail.com",
            value: 1.99

        }

        const sendMail = await sendMailService(sendMailData);

        console.log(sendMail);

    }, 10 * 1000)

});