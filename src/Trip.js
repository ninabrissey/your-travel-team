class Trip {
  constructor(tripDetails, destinations) {
    this.id = tripDetails.id;
    this.userID = tripDetails.userID;
    this.destinationID = tripDetails.destinationID;
    this.travelers = tripDetails.travelers;
    this.date = tripDetails.date;
    this.duration = tripDetails.duration;
    this.status = tripDetails.status;
    this.suggestedActivities = tripDetails.suggestedActivities;
    this.destinations = destinations;
    this.cost = 0;
    this.tripsDestination = {};
    //add city property to display
  }

  //need to add this test to test as well
  updateTripProperties() {
    this.getTripDestination();
    this.calculateTripCost();
  }

  // need to add test for this function below
  getTripDestination() {
    const foundDestination = this.destinations.find(
      (destination) => this.destinationID === destination.id
    );
    this.tripsDestination = foundDestination;
  }

  calculateTripCost() {
    // below is in the above function figure how to fix the tests

    // const currentDestination = this.destinations.find(
    //   (destination) => this.destinationID === destination.id
    // );

    const flightAndLodingPerPerson =
      this.tripsDestination.estimatedLodgingCostPerDay * this.duration +
      this.tripsDestination.estimatedFlightCostPerPerson;

    const totalCostBeforeCommission = flightAndLodingPerPerson * this.travelers;

    this.cost = Number((totalCostBeforeCommission * 1.1).toFixed(2));

    // DOM DISPLAY LOGIC
    // let totalCost = `$${(totalCostBeforeCommission * 1.1).toFixed(2)}`;

    // totalCost = [
    //   totalCost.slice(0, totalCost.length - 6),
    //   ',',
    //   totalCost.slice(totalCost.length - 6),
    // ].join('');

    // this.cost = totalCost;

    // TEST BELOW
    // expect(trip.cost).to.equal('$21,004.50');
  }
}

export default Trip;
