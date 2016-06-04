var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/room_reservation_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to database...");
});

var roomSchema = mongoose.Schema({
  _id: String,
  num: String,
  name: String,
  floor: String,
  type: String,
  capacity: String,
  board: String,
  projector: String
});

var findRoomsByName = function(name){
  Rooms.find({"name": name }, function (err, Rooms) {
    if (err) return handleError(err);
    console.log('%s', Rooms) // Space Ghost is a talk show host.
  });
};

var findRoomsByNum = function(num){
  Rooms.find({"num": num }, function (err, Rooms) {
    if (err) return handleError(err);
    console.log('%s', Rooms) // Space Ghost is a talk show host.
  });
};

var findRoomsByFloor = function(floor){
  Rooms.find({"floor": floor }, function (err, Rooms) {
    if (err) return handleError(err);
    console.log('%s', Rooms) // Space Ghost is a talk show host.
  });
};

var findRoomsByType = function(type){
  Rooms.find({"type": type }, function (err, Rooms) {
    if (err) return handleError(err);
    console.log('%s', Rooms) // Space Ghost is a talk show host.
  });
};

var findRoomsByCapacity = function(capacity){
  Rooms.find({"capacity": capacity }, function (err, Rooms) {
    if (err) return handleError(err);
    console.log('%s', Rooms) // Space Ghost is a talk show host.
  });
};

var findRoomsByBoard = function(board){
  Rooms.find({"board": board }, function (err, Rooms) {
    if (err) return handleError(err);
    console.log('%s', Rooms) // Space Ghost is a talk show host.
  });
};

var findRoomsByProjector = function(projector){
  Rooms.find({"projector": projector }, function (err, Rooms) {
    if (err) return handleError(err);
    console.log('%s', Rooms) // Space Ghost is a talk show host.
  });
};

var Rooms = mongoose.model('Rooms', roomSchema);

findRoomsByName("Finland");
