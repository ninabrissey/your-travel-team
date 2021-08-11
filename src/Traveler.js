import * as dayjs from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

class Traveler {
  constructor(travelerDetails, trips) {
    this.id = travelerDetails.id;
    this.name = travelerDetails.name;
    this.travelerType = travelerDetails.travelerType;
    this.allTrips = trips;
    this.pendingTrips = [];
    this.currentTrip = {};
    this.pastTrips = [];
    this.upcomingTrips = [];
    this.spendingYTD = 0;
    this.stagedTrip = {};
  }

  sortAllTripsByDate() {
    this.allTrips.sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  categorizeTrips(dateToday) {
    this.allTrips.forEach((trip) => {
      if (trip.status === 'pending') {
        this.pendingTrips.push(trip);
      }
      let startDate = trip.date;
      let endDate = dayjs(trip.date).add(trip.duration, 'day');

      if (trip.status !== 'pending') {
        if (dayjs(dateToday).isBetween(startDate, endDate, null, '[]')) {
          this.currentTrip = trip;
        }
        if (dayjs(dateToday).isAfter(startDate)) {
          this.pastTrips.push(trip);
        }
        if (dayjs(dateToday).isBefore(startDate)) {
          this.upcomingTrips.push(trip);
        }
      }
    });
    this.pastTrips.reverse();
  }

  getSpendingYTD(dateToday) {
    let tripsYTD = [];

    this.pastTrips.forEach((trip) => {
      let startDate = dayjs(trip.date);
      let dateYearAgo = dayjs(dateToday).subtract(1, 'year');

      if (dayjs(startDate).isBetween(dateYearAgo, dateToday, null, [])) {
        tripsYTD.push(trip);
      }
    });
    let totalYTD = [
      ...tripsYTD,
      this.currentTrip,
      ...this.upcomingTrips,
    ].reduce((total, trip) => {
      total += trip.cost;
      return total;
    }, 0);
    this.spendingYTD = Number(totalYTD.toFixed(2));
  }
}

export default Traveler;

//clean up files

// method to get trips by date (earliest date first) and by status (approved or pending)

// for past trips, sort by latest date to earlier date

// for upcoming trips sort with earliest date to latest date

// method to calculate what traveler spent on trips this year + 10%, not including the pending trips

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
