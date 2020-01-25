import React from 'react';

const SessionsList = () => {
    // eslint-disable-next-line no-unused-vars
    const sessions = [
        {
            SessionId: 1,
            DateTime: '29-10-2019T18:00:00',
            Notes: '',
            AssignmentId: 1,
        },
    ];

    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Assignments</th>
                    </tr>
                </thead>
                <tbody />
            </table>
        </React.Fragment>
    );
};

export default SessionsList;
