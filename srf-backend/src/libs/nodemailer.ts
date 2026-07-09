import 'dotenv/config';
import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, body: string, html?: string) {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST as string,
        port: Number(process.env.EMAIL_PORT),
        secure: Number(process.env.EMAIL_PORT) === 465 ? true : false,
        auth: {
            user: process.env.SENDER_EMAIL as string,
            pass: process.env.SENDER_PASSWORD as string
        }
    });

    await transport.sendMail({
        from: `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`,
        to: to,
        subject: subject,
        text: body,
        html: html
    }).then((response: any) => {
        console.log("E-mail enviado com sucesso! ID:", response);
        return true;
    }).catch((error: any) => {
        console.error("Erro ao enviar e-mail:", error);
        return false;
    });
}