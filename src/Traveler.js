import * as dayjs from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

class Traveler {
  constructor(travelerDetails, trips) {
    this.id = travelerDetails.id;
    this.name = travelerDetails.name;
    this.travelerType = travelerDetails.travelerType;
    this.allTrips = trips;
    this.currentTrip = {};
    this.upcomingTrips = [];
    this.pastTrips = [];
    this.pendingTrips = [];
  }

  getCurrentTrip(todaysDate) {
    this.allTrips.forEach((trip) => {
      let startDate = dayjs(trip.date);
      let endDate = dayjs(trip.date)
        .add(trip.duration, 'day')
        .format('YYYY-MM-DD');
      if (trip.status === 'pending') {
        this.pendingTrips.push(trip);
      }
      if (trip.status !== 'pending') {
        if (dayjs(todaysDate).isBetween(startDate, endDate, null, '[]')) {
          this.currentTrip = trip;
        }
      }
    });
  }

  getTrips(pendingOrUpcoming) {
    this[pendingOrUpcoming] = this.allTrips;
  }
}

export default Traveler;

// method to get trips by date and by status (approved or pending)

// for past trips, sort by latest date to earlier date

// for upcoming trips sort with earliest date to latest date

//method to calculate what traveler spent on trips this year + 10%, not including the pending trips

// {
//   id: 8,
//   userID: 1,
//   destinationID: 6,
//   travelers: 6,
//   date: dayjs().format('YYYY/MM/DD'),
//   duration: 20,
//   status: 'approved',
//   suggestedActivities: [],
// }
