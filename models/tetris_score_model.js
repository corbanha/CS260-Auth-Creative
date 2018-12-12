var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TetrisSchema = new Schema({
    username: String,
    highscore: Number
});
mongoose.model('TetrisScore', TetrisSchema);