import { expect } from 'chai';
import Trip from '../src/Trip';
import { tripsData, denstinationsData } from './test-data';

describe('Trip', () => {
  let trip, tripData;

  beforeEach(() => {
    tripData = tripsData[6];
    trip = new Trip(tripData, denstinationsData);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of trip', () => {
    expect(trip).to.be.instanceOf(Trip);
  });

  it('should have a id', () => {
    expect(trip.id).to.equal(7);
  });

  it('should have a user id', () => {
    expect(trip.userID).to.equal(1);
  });

  it('should have a destination id', () => {
    expect(trip.destinationID).to.equal(5);
  });

  it('should have a date', () => {
    expect(trip.date).to.equal('2018/08/28');
  });

  it('should have a duration', () => {
    expect(trip.duration).to.equal(20);
  });

  it('should have a status', () => {
    expect(trip.status).to.equal('approved');
  });

  it('should start when an array of suggested activities', () => {
    expect(trip.suggestedActivities).to.be.a('array');
  });

  it('should hold destinations in an array', () => {
    expect(trip.destinations).to.be.a('array');
  });

  it('should hold a list of destinations', () => {
    expect(trip.destinations[3].destination).to.equal('Cartagena, Colombia');
    expect(trip.destinations.length).to.equal(9);
  });

  it('should start with a trip cost of an empty string', () => {
    expect(trip.cost).to.equal(0);
  });

  it('should be able to calculate the cost of a single trip', () => {
    trip.calculateTripCost();

    expect(trip.cost).to.equal(21004.5);
  });
});
