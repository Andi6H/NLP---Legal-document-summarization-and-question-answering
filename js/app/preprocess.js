const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const nlp = require('compromise');

function preprocessText(text) {
    let doc = nlp(text);
    doc = doc.normalize().out('text');
    return doc;
}

function loadAndPreprocessData() {
    const filePath = path.join(__dirname, 'legal_text_classification.csv');
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                data.cleaned_text = preprocessText(data.text);
                results.push(data);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = { loadAndPreprocessData };
