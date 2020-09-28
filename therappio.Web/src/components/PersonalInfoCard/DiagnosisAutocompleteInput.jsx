import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';
import { selectDiagnosis } from '../../_selectors';
import { icdCodeService } from '../../_services';
import { diagnosisActions } from '../../_actions';

const DiagnosisAutocompleteInput = ({ diagnosis, updateDiagnosis }) => {
    const [diagnosisTags, setDiagnosisTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [busy, setBusy] = useState(false);
    const reactTags = useRef();

    const handleInputChange = query => {
        if (!busy) {
            setBusy(true);

            return icdCodeService.query(query).then(diagnoses => {
                const newSuggestions = diagnoses.map(item => ({
                    id: (item && item.fullCode) || '',
                    name: item
                        ? `${item.fullCode} ${item.abbreviatedDescription}`
                        : '',
                }));
                setSuggestions(newSuggestions);
                setBusy(false);
            });
        }
    };
    useEffect(() => {
        if (diagnosis && diagnosis.content && diagnosis.content.length) {
            const newDiagnosisTags = diagnosis.content.map(item => ({
                id: (item && item.fullCode) || '',
                name: item
                    ? `${item.fullCode} ${item.abbreviatedDescription}`
                    : '',
            }));

            setDiagnosisTags(newDiagnosisTags);
        }
    }, [diagnosis]);

    const handleTagDelete = index => {
        const newDiagnosisTags = diagnosisTags.filter(
            (item, idx) => index !== idx
        );
        setDiagnosisTags(newDiagnosisTags);
        updateDiagnosis({
            id: diagnosis.id,
            fullCodes: newDiagnosisTags.map(item => item.id),
            patient: diagnosis.patient._id,
        });
    };

    const handleTagAdd = tag => {
        if (diagnosisTags.findIndex(item => item.id === tag.id) === -1) {
            const newDiagnosisTags = [...diagnosisTags, tag];
            setDiagnosisTags(newDiagnosisTags);
            updateDiagnosis({
                id: diagnosis.id,
                fullCodes: newDiagnosisTags.map(item => item.id),
                patient: diagnosis.patient,
            });
        }
    };

    return (
        <>
            <ReactTags
                placeholderText={'Enter ICD-10 code or name'}
                ref={reactTags}
                tags={diagnosisTags}
                suggestions={suggestions}
                onInput={handleInputChange}
                onDelete={handleTagDelete}
                onAddition={handleTagAdd}
            />
        </>
    );
};

const mapStateToProps = (state, props) => ({
    diagnosis: selectDiagnosis(state, props.diagnosisId),
});

const mapDispatchToProps = {
    updateDiagnosis: diagnosisActions.updateDiagnosis,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DiagnosisAutocompleteInput);
