const dictionary = require('../data/keyword-dictionary.json');

function extractSkills(text) {
  const stopwords = ['i','need','someone','to','the','a','an','for','my','in','and','of','with'];
  const tokens = text.toLowerCase().split(/\s+/);
  const filtered = tokens.filter(t => !stopwords.includes(t));
  
  const skills = new Set();
  for (const token of filtered) {
    if (dictionary[token]) {
      skills.add(dictionary[token]);
    }
  }
  return [...skills];
}

module.exports = { extractSkills };