import { MailtrapClient } from "mailtrap";

const SENDER_EMAIL = "no-reply@demomailtrap.co";
const SENDER_NAME = "SiRAI";

export async function sendEmail(to: string, subject: string, body: string, html?: string) {
    const apiKey = process.env.MAILTRAP_API_KEY as string;
    const isSandbox = process.env.MAILTRAP_USE_SANDBOX === "true";
    const inboxId = Number(process.env.MAILTRAP_INBOX_ID);

    const options = isSandbox
        ? { token: apiKey, sandbox: true, testInboxId: inboxId }
        : { token: apiKey };

    const mailtrap = new MailtrapClient(options);

    try {
        await mailtrap.send({
            from: {
                name: SENDER_NAME,
                email: SENDER_EMAIL,
            },
            to: [{ email: to }],
            subject: subject,
            text: body,
            ...(html ? { html } : {}),
        });
        return true;
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return false;
    }
}