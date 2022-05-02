
//aqui mockamos o modulo nodemailer, assim podemos testar o envio de email
jest.mock("nodemailer");
const sendMailMock = jest.fn();
const nodemailer = require("nodemailer"); //doesn't work with import. idk why
nodemailer.createTransport.mockReturnValue({"sendMail": sendMailMock});

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
        expect(sendMailMock).toBeCalledTimes(2);

        expect(sendMailMock.mock.calls[0][0].to).toBe(sendMailData.emailSend);
        expect(sendMailMock.mock.calls[0][0].subject).toBe("Você enviou um pix!");

    
        //check if the second call was called with the correct data
        expect(sendMailMock.mock.calls[1][0].to).toBe(sendMailData.emailReceiver);
        expect(sendMailMock.mock.calls[1][0].subject).toBe("Você recebeu um pix!");
      

    })


    it(" O email de chegada deve ter o valor recebido, o nome de quem enviou e a data.", async () => {

        const sendMailData = {

            nameSend: "TestSend",
            nameReceiver: "TestReceiver",
            emailSend: "david27alves@gmail.com",
            emailReceiver: "david27alves@gmail.com",
            value: 1.99

        }

        const sendMail = await sendMailService(sendMailData);
        expect(sendMailMock).toBeCalledTimes(2);
        //check if the first call was called with the correct data
        let valorFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(sendMailData.value);


        expect(sendMailMock.mock.calls[1][0].to).toBe(sendMailData.emailReceiver);
        expect(sendMailMock.mock.calls[1][0].subject).toBe("Você recebeu um pix!");
        expect(sendMailMock.mock.calls[1][0].html).toContain(`Que legal! você recebeu um pix de ${sendMailData.nameSend} no valor de ${valorFormat} na data `);

    })

    it(" O email de envio deve ter o valor enviado, o nome de quem recebeu e a data ", async () => {

        const sendMailData = {

            nameSend: "TestSend",
            nameReceiver: "TestReceiver",
            emailSend: "david27alves@gmail.com",
            emailReceiver: "david27alves@gmail.com",
            value: 1.99

        }

        const sendMail = await sendMailService(sendMailData);
        //check if the first call was called with the correct data
        let valorFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(sendMailData.value);

        expect(sendMailMock.mock.calls[0][0].to).toBe(sendMailData.emailSend);
        expect(sendMailMock.mock.calls[0][0].subject).toBe("Você enviou um pix!");
        expect(sendMailMock.mock.calls[0][0].html).toContain(`Você enviou um pix para ${sendMailData.nameReceiver} no valor de ${valorFormat} na data `);
    
    })
   

});