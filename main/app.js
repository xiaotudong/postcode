'use strict';
function inputs() {
    return [
        '||:::', ':::||', '::|:|', '::||:', ':|::|',
        ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'
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
    const sum = postcodeArray.reduce((prv,next) => prv + next);

    const cd = (10 - sum % 10)%10;
    
    return {postcodeArray,cd};
}

function convertPostcode(postcodeCD) {
    let tags = inputs();

    const barcode = postcodeCD.postcodeArray.map(code => tags[code]).join('');

    return  `|${barcode}${tags[postcodeCD.cd]}|`;
}

function buildNewBarcode(barcode) {
    const newBarcode = '';
    return barcode.slice(1,-1);
}

function buildBarcodeString(newBarcode) {

    const barcode = newBarcode.slice(0,-5);
    const cd = newBarcode.slice(-5,newBarcode.length);

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

    const sum = code.reduce((prv,next) =>prv + next);
    let leng = code.length;
    if (leng === 9){
        code. splice(5,0,'-');
    }
    const postcode = code.join('');

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