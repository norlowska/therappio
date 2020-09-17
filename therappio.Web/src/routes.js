import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    DashboardPage,
    AssignmentPage,
    AssignmentFormPage,
    PatientsPage,
    PatientDetailsPage,
    LoginPage,
    NotFoundPage,
} from './views';
import {
    DashboardBreadcrumb,
    PatientDetailsBreadcrumb,
    AssignmentBreadcrumb,
} from './components';
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
        path: '/clients',
        exact: true,
        type: PRIVATE_ROUTE,
        component: props => <PatientsPage {...props} />,
        breadcrumb: 'Patients list',
    },
    {
        path: '/clients/:clientId',
        exact: true,
        type: PRIVATE_ROUTE,
        component: props => <PatientDetailsPage {...props} />,
        breadcrumb: props => <PatientDetailsBreadcrumb {...props} />,
    },
    {
        path: '/clients/:clientId/assignments/:assignmentId/edit',
        component: props => <AssignmentFormPage editMode {...props} />,
        type: PRIVATE_ROUTE,
        exact: true,
        breadcrumb: 'Edit',
    },
    {
        path: '/clients/:clientId/assignments/new',
        component: props => <AssignmentFormPage {...props} />,
        type: PRIVATE_ROUTE,
        exact: true,
        breadcrumb: 'New assignment',
    },
    {
        path: '/clients/:clientId/assignments/:assignmentId',
        exact: true,
        type: PRIVATE_ROUTE,
        component: props => <AssignmentPage {...props} />,
        breadcrumb: props => <AssignmentBreadcrumb {...props} />,
    },
    {
        exact: true,
        path: '/clients/:clientId/assignments',
        breadcrumb: null,
        // component: () => <Redirect to="/404" />,
    },
    {
        path: '/clients/:clientId/sessions/new',
        component: props => <PatientsPage {...props} />,
        type: PRIVATE_ROUTE,
    },
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
