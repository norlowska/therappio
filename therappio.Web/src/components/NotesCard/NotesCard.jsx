import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { patientActions } from '../../_actions';
import { FormInput } from '../index';
import style from './NotesCard.module.scss';

const NotesCard = ({ notes, patientId, updatePatient, inProgress }) => {
    const [noteDraft, setNoteDraft] = useState(notes);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = e => {
        if (inProgress) {
            setIsEditing(true);
            setNoteDraft(e.target.value);
        }
    };

    const handleBlur = e => {
        if (inProgress) {
            setIsEditing(false);
            if (noteDraft !== notes)
                updatePatient({ _id: patientId, notes: noteDraft });
        }
    };

    const handleNoteClick = e => {
        if (inProgress) setIsEditing(true);
    };

    return (
        <Card title="NOTES">
            <div className={style.notesContainer}>
                {isEditing ? (
                    <FormInput
                        autoFocus
                        name="notes"
                        type="textarea"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`react-tags ${style.noteInput}`}
                        value={noteDraft}
                        title="Enter note text"
                    />
                ) : (
                    <div
                        onClick={handleNoteClick}
                        className={`react-tags ${style.noteInput}`}
                    >
                        {noteDraft}
                    </div>
                )}
            </div>
        </Card>
    );
};

const mapDispatchToProps = {
    updatePatient: patientActions.update,
};

export default connect(null, mapDispatchToProps)(NotesCard);
