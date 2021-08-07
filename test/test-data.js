import * as dayjs from 'dayjs';

const travelersData = [
  {
    id: 1,
    name: 'Ham Leadbeater',
    travelerType: 'relaxer',
  },
  {
    id: 2,
    name: 'Rachael Vaughten',
    travelerType: 'thrill-seeker',
  },
];

const tripsData = [
  {
    id: 1,
    userID: 1,
    destinationID: 1,
    travelers: 1,
    date: '2022/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 2,
    userID: 2,
    destinationID: 2,
    travelers: 5,
    date: '2020/10/04',
    duration: 18,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 3,
    userID: 2,
    destinationID: 3,
    travelers: 4,
    date: '2020/05/22',
    duration: 17,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 4,
    userID: 1,
    destinationID: 4,
    travelers: 2,
    date: '2022/02/25',
    duration: 10,
    status: 'pending',
    suggestedActivities: [],
  },
  {
    id: 5,
    userID: 2,
    destinationID: 8,
    travelers: 3,
    date: '2022/04/30',
    duration: 18,
    status: 'pending',
    suggestedActivities: [],
  },
  {
    id: 6,
    userID: 2,
    destinationID: 7,
    travelers: 3,
    date: '2022/06/29',
    duration: 9,
    status: 'pending',
    suggestedActivities: [],
  },
  {
    id: 7,
    userID: 1,
    destinationID: 5,
    travelers: 5,
    date: '2021/08/28',
    duration: 20,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 8,
    userID: 1,
    destinationID: 6,
    travelers: 6,
    date: dayjs().format('YYYY/MM/DD'),
    duration: 20,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 9,
    userID: 2,
    destinationID: 9,
    travelers: 5,
    date: '2019/12/19',
    duration: 19,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 10,
    userID: 1,
    destinationID: 2,
    travelers: 6,
    date: '2019/07/23',
    duration: 17,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 11,
    userID: 2,
    destinationID: 1,
    travelers: 4,
    date: '2022/10/14',
    duration: 4,
    status: 'approved',
    suggestedActivities: [],
  },
];

const denstinationsData = [
  {
    id: 1,
    destination: 'Lima, Peru',
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 400,
    image:
      'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
    alt: 'overview of city buildings with a clear sky',
  },
  {
    id: 2,
    destination: 'Stockholm, Sweden',
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 780,
    image:
      'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'city with boats on the water during the day time',
  },
  {
    id: 3,
    destination: 'Sydney, Austrailia',
    estimatedLodgingCostPerDay: 130,
    estimatedFlightCostPerPerson: 950,
    image:
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'opera house and city buildings on the water with boats',
  },
  {
    id: 4,
    destination: 'Cartagena, Colombia',
    estimatedLodgingCostPerDay: 65,
    estimatedFlightCostPerPerson: 350,
    image:
      'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    alt: 'boats at a dock during the day time',
  },
  {
    id: 5,
    destination: 'Madrid, Spain',
    estimatedLodgingCostPerDay: 150,
    estimatedFlightCostPerPerson: 650,
    image:
      'https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'city with clear skys and a road in the day time',
  },
  {
    id: 6,
    destination: 'Jakarta, Indonesia',
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 890,
    image:
      'https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'lit up city at night',
  },
  {
    id: 7,
    destination: 'Paris, France',
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 395,
    image:
      'https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    alt: 'city during the day time with eiffel tower',
  },
  {
    id: 8,
    destination: 'Tokyo, Japan',
    estimatedLodgingCostPerDay: 125,
    estimatedFlightCostPerPerson: 1000,
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80',
    alt: 'city with people walking in crosswalk and brightly lit shops at night',
  },
  {
    id: 9,
    destination: 'Amsterdam, Netherlands',
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 950,
    image:
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'canal with boats and trees and buildings along the side',
  },
];

export { travelersData, tripsData, denstinationsData };
