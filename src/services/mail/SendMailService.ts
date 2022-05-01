import nodemailer from "nodemailer";

type MailRequest = {
    emailSend: string;
    emailReceiver: string;
    valor: number;
}

export class SendMailService {

    async execute({ emailSend, emailReceiver, valor }: MailRequest) {

        let valorFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);

        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: "brisapixapp@gmail.com",
              pass: "apqdmewe"
            }
          });

        await transport.sendMail({
            from: "brisapixapp@gmail.com",
            to: emailSend,
            subject: "Você enviou um pix!",
            html: `<b>Você enviou um pix no valor de ${valorFormat}!</b>`
        });

        await transport.sendMail({
            from: "brisapixapp@gmail.com",
            to: emailReceiver,
            subject: "Você recebeu um pix!",
            html: `<b>Que legal! você recebeu um pix de ${valorFormat}</b>`
        });

        //return info;

    }

}