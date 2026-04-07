Dynamsoft.DWT.AutoLoad = false;

var DWTObject, extrFieldsCount = 0,
    CurrentPathName = unescape(location.pathname),
    CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1),
    strHTTPServer = location.hostname,
    Barcode_text, driverLicenseFields = [],
    dwtLicenseKey = "t0200EQYAACOKhOsSRsPSEX/+K8gSjuzQ0X/MYk+ihbiZb9X09JTvHwRynQ8JEW0nMWgCmeqy9XD4hVQfO8v4GDe0t34Bclh4XTl5gFP6O6O4rxMDnPzISTTHT5dO28Rx+wAOwJIm+16HH4ASSGs5AasevVeGDOAWIA1AWmtAC6juwiefy+Ttv/85vXegNScPcEp/Z1kgfZwY4ORHTl8g1pHZ/G63VCAob04GcAuQKhDnBVUKhM4AtwCpAuupijkDaFJ1sNZ8AAJdN7U=",
    mrzLicenseKey = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLTEwMzk4OTAwMyIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbS8iLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMCIsInN0YW5kYnlTZXJ2ZXJVUkwiOiJodHRwczovL3NsdHMuZHluYW1zb2Z0LmNvbS8iLCJjaGVja0NvZGUiOjk0NTQ3NzkxMX0=",
    mrzScanner = null,
    mrzScannerPromise = null,
    mrzResult = null;

    var BarcodeInfo =
		[
			{ desc: "All", val: -32505857, bf:1 },
			{ desc: "1D Barcodes", val: 2047, bf:1  },
			{ desc: "QR Code", val: 67108864, bf:1  },
			{ desc: "PDF417", val: 33554432, bf:1  },
			{ desc: "DATAMATRIX", val: 134217728 , bf:1 },
			{ desc: "Aztec Code", val: 268435456, bf:1  },
			{ desc: "GS1 Databar", val: 260096, bf:1  },
			{ desc: "Maxicode", val: 536870912, bf:1  },
			{ desc: "Patch Code", val: 262144, bf:1  },
			{ desc: "GS1 COMPOSITE", val: -2147483648, bf:1 },
			{ desc: "Postal Code", val: 32505856, bf:2 },
			{ desc: "DotCode", val: 2, bf:2 },
			{ desc: "CODE_39", val: 1, bf:1 },
			{ desc: "CODE_128", val: 2, bf:1  },
			{ desc: "CODE_93", val: 4, bf:1  },
			{ desc: "CODABAR", val: 8, bf:1  },
			{ desc: "EAN_13", val: 32, bf:1  },
			{ desc: "EAN_8", val: 64, bf:1  },
			{ desc: "UPC_A", val: 128, bf:1  },
			{ desc: "UPC_E", val: 256, bf:1  },
			{ desc: "Interleaved 2 of 5", val: 16, bf:1  },
			{ desc: "Industrial 2 of 5", val: 512, bf:1  },
			{ desc: "CODE 39 EXTENDED", val: 1024, bf:1  }
		],
    driverLicenseFields = [
        { 'abbreviation': 'DAA', 'description': 'Full Name' },
        { 'abbreviation': 'DAB', 'description': 'Last Name' },
        { 'abbreviation': 'DAB', 'description': 'Family Name' },
        { 'abbreviation': 'DAC', 'description': 'First Name' },
        { 'abbreviation': 'DAC', 'description': 'Given Name' },
        { 'abbreviation': 'DAD', 'description': 'Middle Name or Initial' },
        { 'abbreviation': 'DAD', 'description': 'Middle Name' },
        { 'abbreviation': 'DAE', 'description': 'Name Suffix' },
        { 'abbreviation': 'DAF', 'description': 'Name Prefix' },
        { 'abbreviation': 'DAG', 'description': 'Mailing Street Address1' },
        { 'abbreviation': 'DAH', 'description': 'Mailing Street Address2' },
        { 'abbreviation': 'DAI', 'description': 'Mailing City' },
        { 'abbreviation': 'DAJ', 'description': 'Mailing Jurisdiction Code' },
        { 'abbreviation': 'DAK', 'description': 'Mailing Postal Code' },
        { 'abbreviation': 'DAL', 'description': 'Residence Street Address1' },
        { 'abbreviation': 'DAM', 'description': 'Residence Street Address2' },
        { 'abbreviation': 'DAN', 'description': 'Residence City' },
        { 'abbreviation': 'DAO', 'description': 'Residence Jurisdiction Code' },
        { 'abbreviation': 'DAP', 'description': 'Residence Postal Code' },
        { 'abbreviation': 'DAQ', 'description': 'License or ID Number' },
        { 'abbreviation': 'DAR', 'description': 'License Classification Code' },
        { 'abbreviation': 'DAS', 'description': 'License Restriction Code' },
        { 'abbreviation': 'DAT', 'description': 'License Endorsements Code' },
        { 'abbreviation': 'DAU', 'description': 'Height in FT_IN' },
        { 'abbreviation': 'DAV', 'description': 'Height in CM' },
        { 'abbreviation': 'DAW', 'description': 'Weight in LBS' },
        { 'abbreviation': 'DAX', 'description': 'Weight in KG' },
        { 'abbreviation': 'DAY', 'description': 'Eye Color' },
        { 'abbreviation': 'DAZ', 'description': 'Hair Color' },
        { 'abbreviation': 'DBA', 'description': 'License Expiration Date' },
        { 'abbreviation': 'DBB', 'description': 'Date of Birth' },
        { 'abbreviation': 'DBC', 'description': 'Sex' },
        { 'abbreviation': 'DBD', 'description': 'License or ID Document Issue Date' },
        { 'abbreviation': 'DBE', 'description': 'Issue Timestamp' },
        { 'abbreviation': 'DBF', 'description': 'Number of Duplicates' },
        { 'abbreviation': 'DBG', 'description': 'Medical Indicator Codes' },
        { 'abbreviation': 'DBH', 'description': 'Organ Donor' },
        { 'abbreviation': 'DBI', 'description': 'Non-Resident Indicator' },
        { 'abbreviation': 'DBJ', 'description': 'Unique Customer Identifier' },
        { 'abbreviation': 'DBK', 'description': 'Social Security Number' },
        { 'abbreviation': 'DBL', 'description': 'Date Of Birth' },
        { 'abbreviation': 'DBM', 'description': 'Social Security Number' },
        { 'abbreviation': 'DBN', 'description': 'Full Name' },
        { 'abbreviation': 'DBO', 'description': 'Last Name' },
        { 'abbreviation': 'DBO', 'description': 'Family Name' },
        { 'abbreviation': 'DBP', 'description': 'First Name' },
        { 'abbreviation': 'DBP', 'description': 'Given Name' },
        { 'abbreviation': 'DBQ', 'description': 'Middle Name' },
        { 'abbreviation': 'DBQ', 'description': 'Middle Name or Initial' },
        { 'abbreviation': 'DBR', 'description': 'Suffix' },
        { 'abbreviation': 'DBS', 'description': 'Prefix' },
        { 'abbreviation': 'DCA', 'description': 'Virginia Specific Class' },
        { 'abbreviation': 'DCB', 'description': 'Virginia Specific Restrictions' },
        { 'abbreviation': 'DCD', 'description': 'Virginia Specific Endorsements' },
        { 'abbreviation': 'DCE', 'description': 'Physical Description Weight Range' },
        { 'abbreviation': 'DCF', 'description': 'Document Discriminator' },
        { 'abbreviation': 'DCG', 'description': 'Country territory of issuance' },
        { 'abbreviation': 'DCH', 'description': 'Federal Commercial Vehicle Codes' },
        { 'abbreviation': 'DCI', 'description': 'Place of birth' },
        { 'abbreviation': 'DCJ', 'description': 'Audit information' },
        { 'abbreviation': 'DCK', 'description': 'Inventory Control Number' },
        { 'abbreviation': 'DCL', 'description': 'Race Ethnicity' },
        { 'abbreviation': 'DCM', 'description': 'Standard vehicle classification' },
        { 'abbreviation': 'DCN', 'description': 'Standard endorsement code' },
        { 'abbreviation': 'DCO', 'description': 'Standard restriction code' },
        { 'abbreviation': 'DCP', 'description': 'Jurisdiction specific vehicle classification description' },
        { 'abbreviation': 'DCQ', 'description': 'Jurisdiction-specific' },
        { 'abbreviation': 'DCR', 'description': 'Jurisdiction specific restriction code description' },
        { 'abbreviation': 'DCS', 'description': 'Family Name' },
        { 'abbreviation': 'DCS', 'description': 'Last Name' },
        { 'abbreviation': 'DCT', 'description': 'Given Name' },
        { 'abbreviation': 'DCT', 'description': 'First Name' },
        { 'abbreviation': 'DCU', 'description': 'Suffix' },
        { 'abbreviation': 'DDA', 'description': 'Compliance Type' },
        { 'abbreviation': 'DDB', 'description': 'Card Revision Date' },
        { 'abbreviation': 'DDC', 'description': 'HazMat Endorsement Expiry Date' },
        { 'abbreviation': 'DDD', 'description': 'Limited Duration Document Indicator' },
        { 'abbreviation': 'DDE', 'description': 'Family Name Truncation' },
        { 'abbreviation': 'DDF', 'description': 'First Names Truncation' },
        { 'abbreviation': 'DDG', 'description': 'Middle Names Truncation' },
        { 'abbreviation': 'DDH', 'description': 'Under 18 Until' },
        { 'abbreviation': 'DDI', 'description': 'Under 19 Until' },
        { 'abbreviation': 'DDJ', 'description': 'Under 21 Until' },
        { 'abbreviation': 'DDK', 'description': 'Organ Donor Indicator' },
        { 'abbreviation': 'DDL', 'description': 'Veteran Indicator' },
        { 'abbreviation': 'PAA', 'description': 'Permit Classification Code' },
        { 'abbreviation': 'PAB', 'description': 'Permit Expiration Date' },
        { 'abbreviation': 'PAC', 'description': 'Permit Identifier' },
        { 'abbreviation': 'PAD', 'description': 'Permit IssueDate' },
        { 'abbreviation': 'PAE', 'description': 'Permit Restriction Code' },
        { 'abbreviation': 'PAF', 'description': 'Permit Endorsement Code' },
        { 'abbreviation': 'ZVA', 'description': 'Court Restriction Code' }
    ];

window.onload = function () {
    initializeMRZScanner().catch(function (ex) {
        console.log(ex.message || ex);
    });
    Dynamsoft.DWT.ProductKey = dwtLicenseKey;
    Dynamsoft.DWT.Load();
};

function setResultHtml(html) {
    document.getElementById('divNoteMessage').innerHTML = html;
}

function setPlainResultMessage(message) {
    setResultHtml('<p style="padding:5px; margin:0;">' + message + '</p>');
}

function initializeMRZScanner() {
    var mrzHost;

    if (mrzScanner) {
        return Promise.resolve(mrzScanner);
    }
    if (mrzScannerPromise) {
        return mrzScannerPromise;
    }
    mrzScannerPromise = new Promise(function (resolve, reject) {
        if (typeof Dynamsoft === 'undefined' || typeof Dynamsoft.MRZScanner === 'undefined') {
            reject(new Error('MRZ scanner SDK is not available.'));
            return;
        }

        mrzHost = document.getElementById('mrzScannerHost');
        if (!mrzHost) {
            reject(new Error('MRZ scanner host element #mrzScannerHost was not found.'));
            return;
        }

        try {
            mrzScanner = new Dynamsoft.MRZScanner({
                license: mrzLicenseKey,
                container: mrzHost,
                showResultView: false
            });
            resolve(mrzScanner.initialize().then(function () {
                return mrzScanner;
            }));
        } catch (ex) {
            mrzScanner = null;
            reject(ex);
        }
    }).catch(function (ex) {
        mrzScanner = null;
        mrzScannerPromise = null;
        throw ex;
    });

    return mrzScannerPromise;
}

function ensureImageLoaded() {
    if (!DWTObject || DWTObject.HowManyImagesInBuffer === 0) {
        alert('Please scan or load an image first.');
        return false;
    }

    return true;
}

function getCurrentImageBlob() {
    return new Promise(function (resolve, reject) {
        if (!ensureImageLoaded()) {
            reject(new Error('No image is loaded.'));
            return;
        }

        DWTObject.ConvertToBlob(
            [DWTObject.CurrentImageIndexInBuffer],
            Dynamsoft.DWT.EnumDWT_ImageType.IT_PNG,
            function (result) {
                resolve(result);
            },
            function (errorCode, errorString) {
                reject(new Error(errorString || ('ConvertToBlob failed: ' + errorCode)));
            }
        );
    });
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatMRZValue(value) {
    if (value == null) {
        return '';
    }

    if (typeof value === 'object') {
        if (typeof Dynamsoft !== 'undefined' && typeof Dynamsoft.displayMRZDate === 'function' &&
            typeof value.year === 'number' && typeof value.month === 'number' && typeof value.day === 'number') {
            return Dynamsoft.displayMRZDate(value);
        }

        return JSON.stringify(value);
    }

    return String(value);
}

function getMRZFailureMessage(result) {
    var status = result && result.status;
    if (!status) {
        return '';
    }

    var failedStatusCode = (typeof Dynamsoft !== 'undefined' && typeof Dynamsoft.EnumResultStatus !== 'undefined')
        ? Dynamsoft.EnumResultStatus.RS_FAILED
        : 2;

    if (status.code === failedStatusCode) {
        return 'Failed to read MRZ from the selected image.';
    }

    return '';
}

function renderMRZResult(result) {
    var failureMessage = getMRZFailureMessage(result);
    if (failureMessage) {
        console.error('MRZ decode returned failure result.', result);
        setPlainResultMessage(failureMessage);
        return;
    }

    var resultData = result && result.data;
    if (!resultData || Object.keys(resultData).length === 0) {
        alert('The selected MRZ is not found.');
        setPlainResultMessage('The selected MRZ is not found.');
        return;
    }

    var labels = (typeof Dynamsoft !== 'undefined' && Dynamsoft.MRZDataLabel) ? Dynamsoft.MRZDataLabel : {};
    var aryTextToShow = ['<p style="padding:5px; margin:0;">'];

    Object.keys(resultData).forEach(function (key) {
        aryTextToShow.push(escapeHtml(labels[key] || key) + '<br /><strong>' + escapeHtml(formatMRZValue(resultData[key])) + '</strong><br />');
        aryTextToShow.push('------------------------------<br />');
    });

    aryTextToShow.push('</p>');
    setResultHtml(aryTextToShow.join(''));
}

// Register OnWebTwainReady event. This event fires as soon as Dynamic Web TWAIN is initialized and ready to be used
Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', function() {
    DWTObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
    if (DWTObject) {
        
        DWTObject.Viewer.width = 505;
        DWTObject.Viewer.height = 600;
        
        if (DWTObject.Addon && DWTObject.Addon.PDF) {
            // from v19.0
            DWTObject.Addon.PDF.SetReaderOptions({
                convertMode: Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL,
                renderOptions: {
                    renderAnnotations: true,
                    resolution: 300
                },
                preserveUnmodifiedOnSave: true
            });
        }

        DWTObject.IfSSL = Dynamsoft.Lib.detect.ssl;
        var _strPort = location.port == "" ? 80 : location.port;
        if (Dynamsoft.Lib.detect.ssl == true)
            _strPort = location.port == "" ? 443 : location.port;
        DWTObject.HTTPPort = _strPort;
        DWTObject.HTTPDownload(strHTTPServer, CurrentPath + "SampleDriverImage.jpg", function () {},
            function () {
                console.log('failed to download the sample image!');
            }
        );
        DWTObject.HTTPDownload(strHTTPServer, CurrentPath + "passport-sample.jpg", function () {},
            function () {
                console.log('failed to download the sample image!');
            }
        );
	if (DWTObject.Addon.PDF.IsModuleInstalled()) {
            /** PDFR already installed */
        }
		
		document.getElementById("btnReadBarcode").style.visibility = "visible";
        document.getElementById("btnReadMRZ").style.visibility = "visible";
        document.getElementById("DWTcontainerBtm").style.visibility = "visible";
    }
});

function GetField(keyword) {
    var k = Barcode_text.search("\n" + keyword);
    if (k == -1)
        return false;
    var m = Barcode_text.indexOf("\n", k + 1);
    var subtext = Barcode_text.substring(k + 4, m);
    return subtext;
}

function extractInformation() {
    var aryTextToShow = [];
    for (var i = 0; i < driverLicenseFields.length; i++) {
        var __item = driverLicenseFields[i];
        var _fieldValue = GetField(__item.abbreviation);
        if (_fieldValue != false) {
            aryTextToShow.push(__item.description + "<br /><strong>" + escapeHtml(_fieldValue) + "</strong><br />");
            aryTextToShow.push("------------------------------<br />");
        }
    }
    aryTextToShow.splice(0, 0, '<p style="padding:5px; margin:0;">');
    aryTextToShow.push('</p>');
    setResultHtml(aryTextToShow.join(''));
}

function ReadBarcode() {
    if (DWTObject) {
        if (!ensureImageLoaded()) {
            return;
        } else {
			var index = DWTObject.CurrentImageIndexInBuffer;
            DWTObject.Addon.BarcodeReader.getRuntimeSettings().then(function(settings){
                if (DWTObject.GetImageBitDepth(index) == 1)
                    settings.scaleDownThreshold = 214748347;
                else
                    settings.scaleDownThreshold = 2300;
                settings.barcodeFormatIds = BarcodeInfo[3].val; //PDF417
				
                DWTObject.Addon.BarcodeReader.updateRuntimeSettings(settings).then(function(){

					DWTObject.Addon.BarcodeReader.decode(index).then(function (results) { //This is the function called when barcode is read successfully
						//Retrieve barcode details
						if (results.length == 0) {
							alert("The selected PDF417 barcode is not found.");
							setPlainResultMessage('The selected PDF417 barcode is not found.');
							return;
						} else {
							for (var i = 0; i < results.length; i++) {
								var result = results[i];
								Barcode_text = result.barcodeText;
								var format = result.barcodeFormatString;
									if(result.barcodeFormat == 0)
										format = result.barcodeFormatString_2;
								var barcodeText = ("barcode[" + (i + 1) + "]: " + "\n" + Barcode_text + "\n");
								extractInformation();
							}
						}
					}, function (ex) {
						console.log(ex.message || ex);
					});
				});
			});
        }
    }
}

function ReadMRZ() {
    initializeMRZScanner().then(function (scanner) {
        return getCurrentImageBlob();
    }).then(function (imageBlob) {
        return mrzScanner.launch(imageBlob);
    }).then(function (imageBlob) {
        mrzResult = imageBlob;
        renderMRZResult(mrzResult);
    }).catch(function (ex) {
        console.error('MRZ decode failed.', ex);
        setPlainResultMessage('Failed to read MRZ from the selected image.');
    });
}

function AcquireImage() {
    if (DWTObject) {
        DWTObject.SelectSourceAsync().then(function () {
            return DWTObject.AcquireImageAsync({
                IfDisableSourceAfterAcquire: true // Scanner source will be disabled/closed automatically after the scan.
            });
        }).then(function () {
            return DWTObject.CloseSourceAsync();
        }).catch(function (exp) {
            alert(exp.message);
        }); 
    }
}

function LoadImages() {
    if (DWTObject) {
        DWTObject.LoadImageEx('', 5,
            function () {},
            function (errorCode, errorString) {
                alert('Load Image:' + errorString);
            }
        );
    }
}
