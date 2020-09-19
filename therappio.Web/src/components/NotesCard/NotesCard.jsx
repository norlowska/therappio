import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { clientActions } from '../../_actions';
import { FormInput } from '../index';
import style from './NotesCard.module.scss';

const NotesCard = ({ notes, patientId, updatePatient }) => {
    const [noteDraft, setNoteDraft] = useState(notes);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = e => {
        setIsEditing(true);
        setNoteDraft(e.target.value);
    };

    const handleBlur = e => {
        setIsEditing(false);
        if (noteDraft !== notes)
            updatePatient({ _id: patientId, notes: noteDraft });
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
                        onClick={e => setIsEditing(true)}
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
    updatePatient: clientActions.update,
};

export default connect(null, mapDispatchToProps)(NotesCard);
