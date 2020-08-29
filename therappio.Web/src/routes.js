import React from 'react';
import {
    DashboardPage,
    AssignmentPage,
    ClientsPage,
    LoginPage,
    NotFoundPage,
} from './views';
import { DashboardBreadcrumb, PatientDetailsBreadcrumb } from './components';
import {
    PRIVATE_ROUTE,
    PUBLIC_ROUTE,
    RESTRICTED_ROUTE,
} from './_constants/routes.constants';

const routes = [
    {
        path: '/',
        exact: true,
        type: PRIVATE_ROUTE,
        component: DashboardPage,
        breadcrumb: props => <DashboardBreadcrumb {...props} />,
    },
    {
        path: '/clients/:clientId?',
        exact: true,
        type: PRIVATE_ROUTE,
        component: props => <ClientsPage {...props} />,
        breadcrumb: props => <PatientDetailsBreadcrumb {...props} />,
    },
    {
        path: '/clients/:clientId/assignment/:assignmentId',
        exact: true,
        type: PRIVATE_ROUTE,
        component: AssignmentPage,
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
        path: '/login',
        type: RESTRICTED_ROUTE,
        component: props => <LoginPage {...props} />,
    },
    {
        path: '/404',
        type: PUBLIC_ROUTE,
        component: props => <NotFoundPage {...props} />,
    },
];

export default routes;
