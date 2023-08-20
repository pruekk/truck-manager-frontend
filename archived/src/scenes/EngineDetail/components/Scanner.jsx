// import React, { useState } from 'react';
// import { QrReader } from 'react-qr-reader';

// const BarcodeScanner = () => {
//     const [scanResults, setScanResults] = useState(Array(10).fill(''));
//     const [scanning, setScanning] = useState(false);

//     const handleScan = (data) => {
//         if (data) {
//             const updatedScanResults = [...scanResults];
//             const emptyIndex = updatedScanResults.findIndex((result) => result === '');
//             if (emptyIndex !== -1) {
//                 updatedScanResults[emptyIndex] = data;
//                 setScanResults(updatedScanResults);
//                 if (emptyIndex === 9) {
//                     setScanning(false);
//                 }
//             }
//         }
//     };

//     const handleError = (error) => {
//         console.error(error);
//     };

//     const startScanning = () => {
//         setScanResults(Array(10).fill(''));
//         setScanning(true);
//     };

//     return (
//         <div>
//             {scanning ? (
//                 <QrReader
//                     delay={300}
//                     constraints={{
//                         facingMode: 'environment'
//                     }}
//                     onError={handleError}
//                     onScan={handleScan}
//                     style={{ width: '100%' }}
//                 />
//             ) : (
//                 <>
//                     {scanResults.map((result, index) => (
//                         <input
//                             key={index}
//                             type="text"
//                             value={result}
//                             placeholder={`Scan barcode for input ${index + 1}...`}
//                             disabled
//                         />
//                     ))}
//                     <button onClick={startScanning}>Start Scanning</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default BarcodeScanner;

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import QrScan from 'react-qr-reader';

const QRCodeScanner = ({ setQRValue, setIsScanning }) => {
    const handleScan = (data) => {
        console.log("Scanning...")
        if (!data) return;
        if (data) {
            try {
                console.log("Save data.")
                const parsedData = JSON.parse(data);
                setQRValue(parsedData);
                setIsScanning(false);
            } catch (error) {
                console.error('Error parsing QR code data:', error);
            }
        }
    };
    const handleError = err => {
        console.error(err)
    }

    return (
        <QrScan
            delay={500}
            onScan={(data) => handleScan(data)}
            onError={(err) => handleError(err)}
            constraints={{
                facingMode: 'environment'
            }}
            style={{ width: '100%' }}
        />
    );
};

const MyQRCodeComponent = () => {
    const [qrResult, setQrResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const setQRValue = (data) => {
        setQrResult(data);
    };

    const toggleScanner = () => {
        setIsScanning(!isScanning);
        setQrResult(null)
    };

    return (
        <div style={{ width: '300px', height: '300px' }}>
            {/* QR code generation */}
            <QRCode
                style={{ height: 'auto', maxWidth: '50%', width: '30%', marginRight: "20px" }}
                value={JSON.stringify({ name: 'productA', date: '10/12/2023', amount: 10 })}
            />
            <QRCode
                style={{ height: 'auto', maxWidth: '50%', width: '30%', marginRight: "20px" }}
                value={JSON.stringify({ name: 'productB', date: '11/12/2023', amount: 20 })}
            />
            <br />

            <button onClick={toggleScanner}>
                {isScanning ? `Close Scanner` : `Open Scanner`}
            </button>
            {/* QR code scanning */}
            {isScanning && <QRCodeScanner setQRValue={setQRValue} isScanning={isScanning} setIsScanning={setIsScanning} />}

            {/* Display QR code result */}
            <br />
            Result from QrCode
            {qrResult && (
                <div>
                    {Object.values(qrResult).map((value) => (
                        <p key={value}>{value}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyQRCodeComponent;
