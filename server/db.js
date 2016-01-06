var Sequelize = require('sequelize');
var sequelize = new Sequelize('db_name', 'username', 'password', {
  dialect: "postgres",
  port: 5432
});

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err);
    } else {
      console.log('Connection has been established successfully.');
    }
  });

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  registered: Sequelize.BOOLEAN,
  salt: Sequelize.STRING
});

var Location = sequelize.define('Location', {
  location_name: Sequelize.STRING
});

var Room = sequelize.define('Room', {
  room_name: Sequelize.STRING,
  location_id: Sequelize.INTEGER
});

var Reservation = sequelize.define('Reservation', {
  reservation_name: Sequelize.STRING,
  room_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  date: Sequelize.DATE,
  time: Sequelize.TIME
});

User.belongsToMany(Location, {through: UserLocation});
Location.belongsToMany(User, {through: UserLocation});
Location.hasMany(Room, {foreignKey: location_id});
Room.belongsTo(Location, {foreignKey: location_id});
Room.hasMany(Reservation, {foreignKey: room_id});
Reservation.belongsTo(Room, {foreignKey: room_id});
User.hasMany(Reservation, {foreignKey: user_id});
Reservation.belongsTo(User, {foreignKey: user_id});

User.sync();
Location.sync();
Room.sync();
Reservation.sync();

exports.User = User;
exports.Location = Location;
exports.Room = Room;
exports.Reservation = Reservation;
