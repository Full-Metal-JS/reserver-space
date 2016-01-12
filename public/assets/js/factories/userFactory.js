angular.module('userFactory', [])
  .factory('UserFactory', ['$http', function ($http) {
    var user = {};

    user.currentUser = {
      data: {
        locations: []
      }
    };

    user.currentLocation = {};

    user.getAllData = function() {
      return $http({
        method: 'POST',
        url: '/api/users/alldata',
        data: {
          userId: user.currentUser.id
        }
      })
      .then(function(res) {
        console.log('user factory', user.currentUser);

        user.currentUser.data = res.data;
        return res.data;
      })
      .catch(function(err) {
        console.error(err);
      });
    };

    user.addLocation = function (name) {
      return $http({
        method: 'POST',
        url: '/api/users/locations',
        data: {
          userId: user.currentUser.id,
          locationName: name
        }
      })
      .then(function (res) {
        // user.currentUser.locations.push(res.data);
        return res.data;
      })
      .catch(function (err) {
        console.error('Error: ', err);
      });
    };

    user.addRoomsAndUsers = function(locId, users, rooms) {
      return $http({
        method: 'POST',
        url: '/api/users/roomsusers',
        data: {
          userId: user.currentUser.id,
          locationId: locId,
          usersToAdd: users,
          roomsToAdd: rooms
        }
      })
      .then(function(res) {
        // user.currentUser.locations.forEach(function(location, index, list) {
        //   if (location.id === locId) {
        //     location.rooms.push(res.data);
        //   }
        // });
        return res.data;
      })
      .catch(function(err) {
        console.error('Error:', err);
      });
    };

    user.getAllRoomsAndReservations = function(locId) {
      return $http({
        method: 'POST',
        url: '/api/users/roomsreservations',
        data: {
          locationId: locId
        }
      })
      .then(function(res) {
        console.log('this is res.data: ', res.data);
        return res.data;
      });
    }

    user.addReservation = function(locId, roomId, startTime, endTime, reservationName) {
      return $http({
        method: 'POST',
        url: '/api/users/reservations',
        data: {
          userId: user.currentUser.id,
          locationId: locId,
          roomId: roomId,
          startTime: startTime,
          endTime: endTime,
          reservationName: reservationName
        }
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error('Error:', err);
      });
    }

    user.clearUser = function () {
      user.currentUser = {
        data: {
          locations: []
        }
      };
    };

    return user;
  }]);
