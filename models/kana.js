const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kanaSchema = new Schema({
    // Define your schema fields here
    // For example:
    romaji: String,
    hiragana: String,
    katakana: String
  });

const Kana = mongoose.model('Kana', kanaSchema);

module.exports = Kana;