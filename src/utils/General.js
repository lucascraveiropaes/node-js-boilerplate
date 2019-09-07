import nodemailer from "nodemailer";

export function generateToken(size = 190) {
    let token = "";
    let codeAlphabet  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        codeAlphabet += "abcdefghijklmnopqrstuvwxyz";
        codeAlphabet += "0123456789";
        codeAlphabet += "*!@$()";

    for (let i = 0; i < size; i++)
        token += codeAlphabet[parseInt(Math.random() * codeAlphabet.length)];

    return token;
}

export function sendEmail(options, callback = () => null) {
    const sender = "someemail@gmail.com";
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: sender,
            pass: "sompassword"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    options.from = `"Some sender name here" <${ sender }>`;

    transporter.sendMail(options, function(error, info) {
        if (error)
            return callback(true, error);

        return callback(false, info);
    });
}

export function getDatetime(d = new Date()) {
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const hour = ("0" + d.getHours()).slice(-2);
    const minutes = ("0" + d.getMinutes()).slice(-2);
    const seconds = ("0" + d.getSeconds()).slice(-2);

    return `${month}/${day}/${year} ${hour}:${minutes}:${seconds}`;
}
