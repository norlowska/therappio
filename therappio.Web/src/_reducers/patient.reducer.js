import { patientConstants, diagnosisConstants } from '../_constants';

const initialState = {
    isFetching: false,
    byId: {},
    errorMessage: '',
};

export function patients(state = initialState, action) {
    switch (action.type) {
        case patientConstants.FETCH_PATIENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case patientConstants.FETCH_PATIENTS_SUCCESS: {
            const reduce = action.patients.reduce(
                (map, patient) => ((map[patient._id] = patient), map),
                {}
            );
            return {
                ...state,
                isFetching: false,
                byId: action.patients.reduce(
                    (map, patient) => ((map[patient._id] = patient), map),
                    {}
                ),
            };
        }

        case patientConstants.FETCH_PATIENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case patientConstants.CREATE_PATIENT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case patientConstants.CREATE_PATIENT_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                byId: { ...state.byId, [action.patient._id]: action.patient },
            };
        }

        case patientConstants.CREATE_PATIENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case patientConstants.UPDATE_PATIENT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case patientConstants.UPDATE_PATIENT_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                byId: { ...state.byId, [action.patient._id]: action.patient },
            };
        }

        case patientConstants.UPDATE_PATIENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case diagnosisConstants.CREATE_DIAGNOSIS_SUCCESS: {
            const newPatient = {
                ...state.byId[action.diagnosis.patient],
            };
            newPatient.diagnosis = action.diagnosis._id;

            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [action.diagnosis.patient]: newPatient,
                },
            };
        }
        default:
            return state;
    }
}
