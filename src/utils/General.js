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

export function getDatetime(d = new Date()) {
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const hour = ("0" + d.getHours()).slice(-2);
    const minutes = ("0" + d.getMinutes()).slice(-2);
    const seconds = ("0" + d.getSeconds()).slice(-2);

    return `${month}/${day}/${year} ${hour}:${minutes}:${seconds}`;
}
