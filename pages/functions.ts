const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const mailersend = new MailerSend({
    api_key: process.env.MAILERSEND_API_KEY,
});

export async function sendMail(email: string, vision: string) {
    const recipients = [
        new Recipient(email, "Astronaut")
    ];

    const emailParams = new EmailParams()
        .setFrom("no-reply@mail.project-pluto.vaerk.digital")
        .setFromName("Future Lab vaerk")
        .setRecipients(recipients)
        .setReplyTo("hey@vaerk.digital")
        .setReplyToName("Vaerk")
        .setSubject("Your ai generated Vision is here!")
        .setHtml("Thanks for visiting our ai rocket and launching your mission towards a sustainable 2035.<br><br>" +
            "<b>Your vision statement is:</b><br>" +
            vision +
            "<br><br><br>Curious about how to archive this vision or other rocket projects? " +
            "<br>Visit our <a href='https://vaerk.digital'>Website (https://vaerk.digital)</a>");

    const mail = await mailersend.send(emailParams);
    console.log(mail);
}
