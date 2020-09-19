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
    { color: '#f44336', name: 'High energy, unpleasant' },
    { color: '#F7C602', name: 'High energy, pleasant' },
    { color: '#42a5f5', name: 'Low energy, unpleasant' },
    { color: '#66bb6a', name: 'Low energy, pleasant' },
];
