import React, { useState } from "react";

function UploadFile() {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const xmlText = reader.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      const jsonData = xmlToJson(xmlDoc);
      const dataList = jsonData.preparedreport.previewpages.page0

      const extractDataFromList = dataList.map((data) => {
        return data.b2.map((detail) => {
            return {
                date: detail.m7.attributes.x,
                detail: detail.m10.attributes.x,
                price: detail.m8.attributes.x,
                note: detail.m9.attributes.x
              }
        })
      })

      const listOfJson = extractDataFromList.reduce((acc, cur) => [...acc, ...cur], [])
      const csvList = convertJsonToCsv(listOfJson)
      setData(csvList);
    };

    reader.readAsText(file, "UTF-8");
  };

  const xmlToJson = (xml) => {
    const obj = {};

    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj["attributes"] = {};
        for (let i = 0; i < xml.attributes.length; i++) {
          const attribute = xml.attributes.item(i);
          obj["attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      obj["value"] = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof obj[nodeName] === "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push === "undefined") {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }

    return obj;
  };

  const convertJsonToCsv = (jsonList) => {
    const headers = Object.keys(jsonList[0]); // Extract headers from the first object in the list
    const csvRows = []; // Initialize an empty array to hold the CSV rows
  
    // Add headers as the first row of the CSV
    csvRows.push(headers.join(','));
  
    // Loop through each object in the list and add a CSV row for each
    for (const jsonObj of jsonList) {
      const values = headers.map(header => {
        const value = jsonObj[header];
        // If the value contains a comma, surround it with quotes to avoid CSV parsing issues
        if (value && value.includes(',')) {
          return value.replace(/,/g, "");
        } else {
          return value;
        }
      });
      csvRows.push(values.join(','));
    }
  
    // Join all the CSV rows together with line breaks
    const csvString = csvRows.join('\n');
  
    // Return the CSV string
    return csvString;
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {data && <pre>{data}</pre>}
    </div>
  );
}

export default UploadFile;
