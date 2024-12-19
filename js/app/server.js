const express = require('express');
const { loadAndPreprocessData } = require('./preprocess');
const { extractiveSummary, abstractiveSummary } = require('./summarization');
const { answerQuestion } = require('./question_answering');
const { extractEntities } = require('./clause_extraction');

const app = express();
app.use(express.json());

let data;

loadAndPreprocessData().then((loadedData) => {
    data = loadedData;
});

app.post('/summarize', async (req, res) => {
    console.log("hej");
    const { text } = req.body;
    console.log(text);
    const summary = await extractiveSummary(text);
    res.json({ summary });
});

app.post('/abstractive_summarize', async (req, res) => {
    const { text } = req.body;
    const summary = await abstractiveSummary(text);
    res.json({ summary });
});

app.post('/answer', async (req, res) => {
    const { question, context } = req.body;
    const answer = await answerQuestion(question, context);
    res.json({ answer });
});

app.post('/extract_entities', (req, res) => {
    const { text } = req.body;
    const entities = extractEntities(text);
    res.json({ entities });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
