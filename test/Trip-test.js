import { expect } from 'chai';
import Trip from '../src/Trip';
import { tripsData, denstinationsData } from './test-data';
// import * as dayjs from 'dayjs';

describe('Trip', () => {
  let trip, tripData;

  beforeEach(() => {
    tripData = tripsData[6];
    trip = new Trip(tripData, denstinationsData);

    // {
    //   id: 7,
    //   userID: 1,
    //   destinationID: 5,
    //   travelers: 5,
    //   date: '2018/08/28',
    //   duration: 20,
    //   status: 'approved',
    //   suggestedActivities: [],
    // }

    // {
    //   id: 5,
    //   destination: 'Madrid, Spain',
    //   estimatedLodgingCostPerDay: 158,
    //   estimatedFlightCostPerPerson: 659,
    //   image:
    //     'https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    //   alt: 'city with clear skys and a road in the day time',
    // }
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
