function random(str) {
    return str[Math.round(Math.random() * (str.length - 1))]
}

export function randomId() {
    let str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
    let str2 = ''
    for (let i = 0; i < 16; ++i) {
        str2 += random(str)
    }
    return str2
}