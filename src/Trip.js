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
  }

  calculateTripCost() {
    const currentDestination = this.destinations.find(
      (destination) => this.destinationID === destination.id
    );

    const flightAndLodingPerPerson =
      currentDestination.estimatedLodgingCostPerDay * this.duration +
      currentDestination.estimatedFlightCostPerPerson;

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
