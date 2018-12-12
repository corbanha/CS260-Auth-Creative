var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    hashed_password: String,
    number_games_played: Number
});
mongoose.model('User', UserSchema);