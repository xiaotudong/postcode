'use strict';
var app = require('../main/app');

describe('buildPostcodeArray',function () {
    const postcodetrue = '45056-1234';
    it('postcodeArray',function () {
        const postcodeArraytrue = app.buildpostcodeArray(postcodetrue);
        const expectText = [4,5,0,5,6,1,2,3,4];
        expect(postcodeArraytrue).toEqual(expectText);
    });

    const postcodefalse = '45046234';
    it('postcodeArray',function () {
        const postcodeArrayfalse = app.buildpostcodeArray(postcodefalse);
        const expectText = false;
        expect(postcodeArrayfalse).toEqual(expectText);
    });
});

describe('countPostcodeCD',function () {
    const postcodeArray = [4,5,0,5,6,1,2,3,4];
    it('postcodeCD',function () {
        const postcodeCD = app.countPostcodeCD(postcodeArray);
        const expectText = {
            postcodeArray:[4,5,0,5,6,1,2,3,4],
            cd:0
        }
        expect(postcodeCD).toEqual(expectText);
    });
});

describe('convertPostcode',function () {
    const postcodeCD = {
        postcodeArray:[4,5,0,5,6,1,2,3,4],
        cd:0
    }
    it('barcode',function () {
        const barcode = app.convertPostcode(postcodeCD);
        const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(barcode).toEqual(expectText);
    });
});

describe('buildNewBarcode',function () {
    const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    it('newBarcode',function () {
        const newBarcode = app.buildNewBarcode(barcode);
        const expectText = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
        expect(newBarcode).toEqual(expectText);
    });
});

describe('buildBarcodeString',function () {
    const newBarcode = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
    it('barcodeArray',function () {
        const barcodeString =app.buildBarcodeString(newBarcode);
        const exepectText = {
            barcode:':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|',
            cd:'||:::'
        }
        expect(barcodeString).toEqual(exepectText);
    });
});

describe('convertBarcodeArray',function () {
    const barcodeString = {
        barcode:':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|',
        cd:'||:::'
    }
    it('barcodeNumber',function () {
        const barcodeArray = app.buildBarcodeArray(barcodeString);
        const expectText = {
            barcodeArray :[':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|'],
            cd:'||:::'
        }
        expect(barcodeArray).toEqual(expectText);
    });
});

describe('convertBarcodeNUmber',function () {
    const barcodeArray = {
        barcodeArray:[':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|'],
        cd:'||:::'
    }
    it('barcodeNumber',function () {
        const postcodeNumber = app.buildBarcodeNumber(barcodeArray);
        const expectText = {
            postcodeNumber :[4,5,0,5,6,1,2,3,4],
            cd:0
        }
        expect(postcodeNumber).toEqual(expectText);
    });
});

describe('buildBarcode',function () {
    const barcodeNumber = {
        postcodeNumber :[4,5,0,5,6,1,2,3,4],
        cd:0
    }
    
    it('barcode',function () {
        const postcode = app.buildBarcode(barcodeNumber);
        const expectText = {
            postcode: '45056-1234',
            cd: 0,
            sum :30
        }
        expect(postcode).toEqual(expectText);
    });
});

describe('buildBarcode',function () {
    const postcodetrue = {
        postcode: '45056-1234',
        cd: 0,
        sum: 30
    }

    it('barcode',function () {
        const postcode = app.checkLeagle(postcodetrue);
        const expectText =  true;
        expect(postcode).toEqual(expectText);
    });

    const postcodeflase = {
        postcode: 45051234,
        cd: 0,
        sum: 24
    }

    it('barcode',function () {
        const postcode = app.checkLeagle(postcodeflase);
        const expectText =  false;
        expect(postcode).toEqual(expectText);
    });
});
