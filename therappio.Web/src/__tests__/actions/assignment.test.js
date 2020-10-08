import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import config from '../../config';
import MockAdapter from 'axios-mock-adapter';
import { assignmentActions } from '../../_actions/assignment.actions';
import { assignmentConstants } from '../../_constants/assignment.constants';
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore();

describe('fetch assignments actions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    it('dispatches FETCH_ASSIGNMENTS_SUCCESS after a successful API request', () => {
        var assignments = [
            {
                _id: '0',
                title: 'Mood check',
                fields: [
                    {
                        answer: null,
                        options: null,
                        question: "What 'catastrophe' is bothering you?",
                        type: 'long',
                    },
                ],
                patient: '1',
                dueDate: Date.now().toString(),
                createdAt: Date.now().toString(),
                status: 'Not submitted',
            },
        ];

        mock.onGet(config.apiUrl + '/assignments').reply(200, assignments);

        store.dispatch(assignmentActions.fetchAssignments()).then(() => {
            let expectedActions = [
                { type: assignmentConstants.FETCH_ASSIGNMENTS_REQUEST },
                {
                    type: assignmentConstants.FETCH_ASSIGNMENTS_SUCCESS,
                    assignments,
                },
            ];

            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches FETCH_ASSIGNMENTS_FAILURE after a failed API request', () => {
        mock.onGet(config.apiUrl + '/assignments').reply(401, {
            message: 'Unauthorized',
        });

        store.dispatch(assignmentActions.fetchAssignments()).then(() => {
            let expectedActions = [
                { type: assignmentConstants.FETCH_ASSIGNMENTS_REQUEST },
                {
                    type: assignmentConstants.FETCH_ASSIGNMENTS_FAILURE,
                    error: 'Unauthorized',
                },
            ];
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('post assignments actions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    const assignment = {
        patient: 'Gb9K5yKiUGGb6V',
        title: 'Gratitude Journal #4',
        createdAt: '2019-11-19T11:00:00.000+00:00',
        dueDate: '2019-11-18T10:00:00.000+00:00',
        fields: [],
    };

    it('dispatches CREATE_ASSIGNMENT_SUCCESS after a successful API request', () => {
        mock.onPost(config.apiUrl + '/assignments').reply(201, {
            message: 'Assignment successfully created.',
            data: { assignment },
        });
        store
            .dispatch(assignmentActions.createAssignment(assignment))
            .then(() => {
                let expectedActions = [
                    {
                        assignment,
                        type: assignmentConstants.CREATE_ASSIGNMENT_REQUEST,
                    },
                    {
                        type: assignmentConstants.CREATE_ASSIGNMENT_SUCCESS,
                        payload: {
                            assignment,
                            message: 'Assignment successfully created.',
                        },
                    },
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('dispatches CREATE_ASSIGNMENTS_FAILURE after a failed API request', () => {
        mock.onPost(config.apiUrl + '/assignments').reply(400, {
            message: 'error message',
        });
        store
            .dispatch(assignmentActions.createAssignment(assignment))
            .then(() => {
                let expectedActions = [
                    {
                        assignment,
                        type: assignmentConstants.CREATE_ASSIGNMENT_REQUEST,
                    },
                    {
                        type: assignmentConstants.CREATE_ASSIGNMENT_FAILURE,
                        error: 'error message',
                    },
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
