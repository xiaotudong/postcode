'use strict';
function inputs() {
    return [
        '||:::',
        ':::||',
        '::|:|',
        '::||:',
        ':|::|',
        ':|:|:',
        ':||::',
        '|:::|',
        '|::|:',
        '|:|::'
    ];
}

function buildpostcodeArray(postcode) {
     let postcodeArray = [];

     if (checkIsPostcode(postcode) === true){
         let array = postcode.split('').filter(input => input != '-');
         postcodeArray = array.map(parseFloat);
     }else {
         postcodeArray = false;
     }
   return postcodeArray;
 }

 function checkIsPostcode(postcode) {
     if(postcode.length === 5 || postcode.length === 9 || postcode.length === 10){
         return true;
     }
 }

function countPostcodeCD(postcodeArray) {
     
    let cd;
    
    const sum = postcodeArray.reduce((prv,next) => {
        return prv + next;
    });

    cd = 10 - sum % 10;
    if(cd === 10){
        cd = 0;
    }
    
    return {postcodeArray,cd};
}

function convertPostcode(postcodeCD) {
    let barcode = '|';
    let tags = inputs();

    for (const code of postcodeCD.postcodeArray){
        barcode += tags[code];
    }

    barcode += tags[postcodeCD.cd] + '|';

    return barcode;
}
function buildNewBarcode(barcode) {
    const newBarcode = '';
    return barcode.slice(1,barcode.length-1);
}

function buildBarcodeString(newBarcode) {

    const barcode = newBarcode.slice(0,newBarcode.length-5);
    const cd = newBarcode.slice(newBarcode.length-5,newBarcode.length);

    return {barcode,cd};
}

function buildBarcodeArray(barcodeString) {
    let string = '';
    let barcodeArray = [];

    for(const str of barcodeString.barcode){
        string += str;
        if(string.length % 5 === 0){
            barcodeArray.push(string);
            string = '';
        }
    }
    const cd = barcodeString.cd;
    return {barcodeArray,cd};
}

function buildBarcodeNumber(barcodeArray) {
    let tags = inputs();
    let postcodeNumber =  barcodeArray.barcodeArray.map(barcodeNumber => {
        return tags.indexOf(tags.find(input => input === barcodeNumber));
        });
    
    const cd = tags.indexOf(tags.find(input => input === barcodeArray.cd));

  return {postcodeNumber,cd};
}

function buildBarcode(barcodeNumber) {
    let code = barcodeNumber.postcodeNumber;
    const cd = barcodeNumber.cd;
    let postcode = '';
    let sum = 0;

    let leng = code.length;
    if (leng === 9){
        code. splice(5,0,'-');
    }
    for (const i of code){
        postcode += i;
        if(i != '-'){
            sum += parseInt(i);
        }
    }
    return {postcode,cd,sum};
}

function checkLeagle(postcode) {

    let check = false;
    let leng = postcode.postcode.length;
    if((leng === 5  || leng === 9  || leng === 10) && (postcode.sum + postcode.cd) % 10 === 0){
        check = true;
    }
     return check;
}

module.exports = {
     buildpostcodeArray,
     countPostcodeCD,
     convertPostcode,
     buildNewBarcode,
     buildBarcodeString,
     buildBarcodeArray,
     buildBarcodeNumber,
     buildBarcode,
     checkLeagle
 }