import React from 'react';
import FormBuilder from './FormBuilder/FormBuilder';

export default function NewAssignmentPage () {
    // let fields = [
    //     {
    //         type: 'input',
    //         elementConfig: {
    //             id: 'name',
    //             name: 'name',
    //             type: 'text',
    //             placeholder: 'Name'
    //         },
    //         value: '',
    //         validity: {
    //             required: true
    //         }
    //     },
    //     {
    //         type: 'input',
    //         elementConfig: {
    //             id: 'phone',
    //             name: 'phone',
    //             type: 'tel',
    //             placeholder: 'Phone'
    //         },
    //         value: '',
    //         validity: {
    //             required: true
    //         }
    //     },
    //     {
    //         type: 'input',
    //         elementConfig: {
    //             id: 'email',
    //             name: 'email',
    //             type: 'email',
    //             placeholder: 'Email'
    //         },
    //         value: '',
    //         validity: {
    //             required: true
    //         }
    //     },
    //     {
    //         type: 'textarea',
    //         elementConfig: {
    //             name: 'message',
    //             type: 'text',
    //             placeholder: 'Message (Optional)'
    //         },
    //         value: ''
    //     }
    // ];

    return (
        <main className="center-container">
            <FormBuilder />
        </main>
    );
}
