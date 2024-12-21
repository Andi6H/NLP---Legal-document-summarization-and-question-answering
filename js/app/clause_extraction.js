const nlp = require("compromise");

function extractEntities(text) {
  const doc = nlp(text);
  const entities = doc.topics().out("array");
  return entities;
}

module.exports = { extractEntities };
