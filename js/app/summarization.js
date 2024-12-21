const { SummarizerManager } = require("node-summarizer");
const { pipeline } = require("@xenova/transformers");

async function extractiveSummary(text) {
  const summarizer = new SummarizerManager(text, 5);
  const summary = await summarizer.getSummaryByRank();
  const nounsAndAdjectiveMap = {};

  summary.nouns_and_adjactive_map.forEach((value, key) => {
    nounsAndAdjectiveMap[key] = value;
  });

  return {
    summary: summary.summary,
    sentence_list: summary.sentence_list,
    nouns_and_adjactive_map: nounsAndAdjectiveMap,
  };
}

async function abstractiveSummary(text) {
  const summarizer = await pipeline("summarization", "facebook/bart-large-cnn");
  const summary = await summarizer(text, { max_length: 150, min_length: 30 });

  return summary;
}

module.exports = { extractiveSummary, abstractiveSummary };
