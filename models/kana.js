const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kanaSchema = new Schema({
    romaji: {
      type: String,
      required: true
    },
    hiragana: {
      type: String,
      required: true
    },
    katakana: {
      type: String,
      required: true
    }
}, {timestamps: false});

const Kana = mongoose.model('Kana', kanaSchema);
module.exports = Kana;