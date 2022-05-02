
/*
*
*  Service responsável por realizar o envio dos emails das transações pix
*
*/

import nodemailer from "nodemailer";
import { isTesting } from "../../test-utils/TestUtils";

type MailRequest = {
    nameSend: string;
    nameReceiver: string;
    emailSend: string;
    emailReceiver: string;
    value: number;
}

function resolveSendMail() {

    /*
    * 
    * Caso o ambiente seja teste ele usa as configurações do mailtrap
    * 
    */
    if (isTesting()) {

        return nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d7467b4e853e2f",
              pass: "073948811c972a"
            }
          });

    }

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

}

export async function sendMailService({ nameSend, nameReceiver, emailSend, emailReceiver, value }: MailRequest) {

    // Aqui o valor é formatado para real
    let valorFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);


    // Aqui a data é convertida para o padrão brasileiro
    let dateFormat = new Intl.DateTimeFormat('pt-BR').format(Date.now())
    
    // dados de comunicação com servidor de email
    var transport = resolveSendMail();

    // email para quem enviou o pix
    await transport.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: emailSend,
        subject: "Você enviou um pix!",
        html: `Você enviou um pix para ${nameReceiver} no valor de ${valorFormat} na data ${ dateFormat }.`
    });

    // email para quem recebeu o pix
    await transport.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: emailReceiver,
        subject: "Você recebeu um pix!",
        html: `Que legal! você recebeu um pix de ${ nameSend } no valor de ${ valorFormat } na data ${ dateFormat }.`
    });

    return true;

}
