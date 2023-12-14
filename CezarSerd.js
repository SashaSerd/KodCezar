let fs = require('fs')
let CF = new Object();
let FF = new Object();
let args = process.argv
let inputFile = "inp.txt";
let shift = 1;
CF['а'] = 7.92; 
CF['б'] = 1.71;
CF['в'] = 4.33; 
CF['г'] = 1.74;
CF['д'] = 3.05; 
CF['е'] = 8.41;
var encoded = fs.readFileSync(inputFile).toString();
encoded = encoded.toLowerCase();
for (i = 0; i < encoded.length;i++){
    let cha = encoded.charAt(i);
    if (!(cha in CF))
        continue;
    if (!(cha in FF))
        FF[cha] = 0;
    FF[cha]++;
}
for (i = 0; i < 6;i++){
    cha = String.fromCharCode(i + 97);
    if (cha in FF)
        FF[cha] = ((FF[cha] / encoded.length) * 100);
}
var mnD = 123456;
for (b = 1; b < 6;b++){
    var sum = 0;
    for (i = 0; i < 6;i++){
        var cha = String.fromCharCode(i + 97);
        var chShifted = String.fromCharCode((i + b) % (6) + 97);
        if (chShifted in FF)
            sum += (FF[chShifted] - CF[cha]) * (FF[chShifted] - CF[cha]);
    }
    if (sum < mnD){
        mnD = sum;
        shift = b;
    }
}
console.log('a:',CF['а']);//убедимся что позиции сместились.
var alph = new Object();
let decoded = "";
for (i = 0;i < 6;i++){
    var chShifted = String.fromCharCode((i + shift) % 6 + 97);
    var cha = String.fromCharCode(i + 97);
    alph[chShifted] = cha;
}
for (i = 0; i < encoded.length;i++){
    if (encoded[i] in CF)
        decoded += alph[encoded[i]];
    else decoded += encoded[i];
}
console.log(decoded);