export * from './alert.constants';
export * from './client.constants';
export * from './assignment.constants';
export * from './therapySession.constants';
export * from './moodRecord.constants';
export * from './journalRecord.constants';
export * from './user.constants';
export * from './routes.constants';
export * from './icdCode.constants';
export * from './diagnosis.constants';

export const genderOptions = [
    {
        value: 'male',
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
