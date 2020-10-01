import React, { useState } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Modal, Button, Form } from 'antd';
import ReactTags from 'react-tag-autocomplete';
import { therapySessionActions } from '../../_actions';
import { FormInput } from '../index';
import style from './SessionFormModal.module.scss';

const SessionFormModal = ({
    setVisible,
    session,
    patient,
    create,
    update,
    ...props
}) => {
    const [sessionNo, setSessionNo] = useState(
        session ? session.session_no : props.sessionNo || ''
    );
    const [date, setDate] = useState(
        format(
            session && session.date ? new Date(session.date) : new Date(),
            "yyyy-MM-dd'T'HH:mm"
        )
    );
    const [notes, setNotes] = useState(
        session && session.notes ? session.notes : ''
    );
    const [tags, setTags] = useState(
        session && session.tags ? session.tags : []
    );

    const reactTags = React.useRef();

    const handleCancel = e => setVisible(false);
    const handleSave = e => {
        if (session) {
            update(
                {
                    ...session,
                    session_no: sessionNo,
                    date,
                    notes,
                    tags: tags.map(item => item.name),
                },
                patient
            );
        } else {
            create({
                session_no: sessionNo,
                date,
                notes,
                tags: tags.map(item => item.name),
                patient: patient,
            });
        }

        setVisible(false);
    };

    const handleTagDelete = index => {
        const newTags = tags.filter((item, idx) => index !== idx);
        setTags(newTags);
    };

    const handleTagAdd = tag => {
        if (tags.findIndex(item => item.name === tag.name) === -1) {
            const newTags = [...tags, tag];
            setTags(newTags);
        }
    };
    return (
        <Modal
            title={session ? 'Edit session' : 'New session'}
            visible={true}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    // loading={loading}
                    onClick={handleSave}
                >
                    Submit
                </Button>,
            ]}
            width={700}
        >
            <div className={'formGroup'}>
                <label htmlFor="sessionNo" className="label">
                    Session number
                </label>
                <FormInput
                    name="sessionNo"
                    title="Session number"
                    type="short"
                    value={sessionNo}
                    onChange={e => setSessionNo(e.target.value)}
                />
            </div>
            <div className={'formGroup'}>
                <label htmlFor="date" className="label">
                    Date
                </label>
                <FormInput
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    title="Date"
                    type="datetime-local"
                />
            </div>
            <div className={'formGroup'}>
                <label htmlFor="notes" className="label">
                    Notes
                </label>
                <FormInput
                    name="notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    title="Notes"
                    type="textarea"
                    className={style.notesInput}
                    rows={7}
                />
            </div>
            <div className={'formGroup'}>
                <label htmlFor="tags" className="label">
                    Tags
                </label>
                <ReactTags
                    placeholderText={'Add tags'}
                    ref={reactTags}
                    tags={tags}
                    // suggestions={suggestions}
                    // onInput={handleInputChange}
                    onDelete={handleTagDelete}
                    onAddition={handleTagAdd}
                    addOnBlur={true}
                    allowNew={true}
                />
            </div>
        </Modal>
    );
};

const mapDispatchToProps = {
    create: therapySessionActions.create,
    update: therapySessionActions.update,
};

export default connect(null, mapDispatchToProps)(SessionFormModal);
