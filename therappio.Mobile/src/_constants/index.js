export * from './assignment.constants';
export * from './moodRecord.constants';
export * from './journalRecord.constants';
export * from './user.constants';
export * from './therapy.constants';

export const genderOptions = [
  {
    id: 'male',
    displayValue: 'male',
  },
  {
    value: 'female',
    displayValue: 'female',
  },
];

export const moodchartKeys = [
  { color: '#F7C602', name: 'High energy, pleasant', quadrant: 1 },
  { color: '#f44336', name: 'High energy, unpleasant', quadrant: 2 },
  { color: '#42a5f5', name: 'Low energy, unpleasant', quadrant: 3 },
  { color: '#66bb6a', name: 'Low energy, pleasant', quadrant: 4 },
];

export const weekdays = [
  { name: 'Monday', id: 1 },
  { name: 'Tuesday', id: 2 },
  { name: 'Wednesday', id: 3 },
  { name: 'Thursday', id: 4 },
  { name: 'Friday', id: 5 },
  { name: 'Saturday', id: 6 },
  { name: 'Sunday', id: 7 },
];
