"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const mailtrap_1 = require("mailtrap");
const SENDER_EMAIL = "no-reply@demomailtrap.co";
const SENDER_NAME = "SiRAI";
async function sendEmail(to, subject, body, html) {
    const apiKey = process.env.MAILTRAP_API_KEY;
    const isSandbox = process.env.MAILTRAP_USE_SANDBOX === "true";
    const inboxId = Number(process.env.MAILTRAP_INBOX_ID);
    const options = isSandbox
        ? { token: apiKey, sandbox: true, testInboxId: inboxId }
        : { token: apiKey };
    const mailtrap = new mailtrap_1.MailtrapClient(options);
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
    }
    catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return false;
    }
}
//# sourceMappingURL=mailtrap.js.map