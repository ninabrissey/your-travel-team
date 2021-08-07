import { expect } from 'chai';
import Traveler from '../src/Traveler';
import { travelersData, tripsData } from './test-data';
import * as dayjs from 'dayjs';

describe('Traveler', () => {
  let traveler;
  let trips;
  let todaysDate;

  beforeEach(() => {
    trips = tripsData.filter((trip) => trip.userID === 1);
    traveler = new Traveler(travelersData[0], trips);
    todaysDate = dayjs().format('YYYY-MM-DD');
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.instanceOf(Traveler);
  });

  it('should have a id', () => {
    expect(traveler.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(traveler.name).to.equal('Ham Leadbeater');
  });

  it('should have a traveler type', () => {
    expect(traveler.travelerType).to.equal('relaxer');
  });

  it('should be able to sort all trips by date', () => {
    traveler.sortAllTripsByDate();

    expect(traveler.allTrips[0].date).to.equal('2018/08/28');
  });

  it('should start with an empty array for pending trips', () => {
    expect(traveler.pendingTrips).to.deep.equal([]);
  });

  it('should be able get all pending trips', () => {
    traveler.sortAllTripsByDate();
    traveler.categorizeTrips(todaysDate);

    expect(traveler.pendingTrips[0].duration).to.equal(10);
  });

  it('should start with an empty object for current trip', () => {
    expect(traveler.currentTrip).to.be.a('object');
  });

  it('should be able to get a current trip', () => {
    traveler.sortAllTripsByDate();
    traveler.categorizeTrips(todaysDate);

    expect(traveler.currentTrip.id).to.equal(8);
  });

  it('should start with an empty array for upcoming trips', () => {
    expect(traveler.upcomingTrips).to.deep.equal([]);
  });

  it('should be able to get all upcoming trips', () => {
    traveler.sortAllTripsByDate();
    traveler.categorizeTrips(todaysDate);

    expect(traveler.upcomingTrips[0].date).to.equal('2022/09/16');
  });

  it('should start with an empty array for past trips', () => {
    expect(traveler.pastTrips).to.be.a('array');
  });

  it('should be able to get all past trips', () => {
    traveler.sortAllTripsByDate();
    traveler.categorizeTrips(todaysDate);
    expect(traveler.pastTrips[0].date).to.equal('2019/07/23');
  });

  // it('should start with the total spent this past year as 0', () => {
  //   expect(traveler.spendingYTD).to.equal(0);
  // });

  // it('', () => {});

  // it('', () => {});
});
