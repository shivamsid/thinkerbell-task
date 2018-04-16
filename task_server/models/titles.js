var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TitlesSchema   = new Schema({
    title: {type : String, unique: true},
    names: [String]
});

module.exports = mongoose.model('Titles', TitlesSchema);