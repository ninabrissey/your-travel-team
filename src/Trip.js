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
    // add test to see to the above property
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
    const flightAndLodingPerPerson =
      this.tripsDestination.estimatedLodgingCostPerDay * this.duration +
      this.tripsDestination.estimatedFlightCostPerPerson;

    const totalCostBeforeCommission = flightAndLodingPerPerson * this.travelers;

    this.cost = Number((totalCostBeforeCommission * 1.1).toFixed(2));
  }
}

export default Trip;
