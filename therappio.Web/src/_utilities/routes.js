import React from 'react';
import {
    ClientsPage,
    DashboardPage,
    AssignmentPage,
    AssignmentFormPage,
    LoginPage,
    NotFoundPage,
} from '../views';
import {
    PRIVATE_ROUTE,
    PUBLIC_ROUTE,
    RESTRICTED_ROUTE,
} from '../_constants/routes.constants';

export const routes = [
    {
        path: '/',
        exact: true,
        type: PRIVATE_ROUTE,
        component: props => <DashboardPage {...props} />,
    },
    {
        path: '/clients/:clientId/assignment/:assignmentId',
        exact: true,
        component: props => <AssignmentPage {...props} />,
        type: PRIVATE_ROUTE,
    },
    // TODO: fetch clients from state
    // {
    //     path: "/clients/:clientId/assignment/:assignmentId/edit",
    //     component: props => <AssignmentFormPage editMode {...props} />,
    // },
    // TODO: fetch clients from state
    // {
    //     path: '/clients/:clientId/assignments/new',
    //     component: props => <AssignmentFormPage {...props} />,
    //     type: PRIVATE_ROUTE,
    // },
    {
        path: '/clients/:clientId?',
        component: props => <ClientsPage {...props} />,
        exact: true,
        type: PRIVATE_ROUTE,
    },
    {
        path: '/login',
        component: props => <LoginPage {...props} />,
        type: RESTRICTED_ROUTE,
    },
    {
        path: '/404',
        component: props => <NotFoundPage {...props} />,
        type: PUBLIC_ROUTE,
    },
];
