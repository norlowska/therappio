import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { format, addSeconds, set } from 'date-fns';
import { Modal, Button, Radio, Tooltip } from 'antd';
import ReactTags from 'react-tag-autocomplete';
import { therapyActions } from '../../_actions';
import { weekdays } from '../../_constants';
import { FormInput } from '../index';
import style from './TherapyFormModal.module.scss';

const TherapyFormModal = ({
    setVisible,
    therapy,
    patientId,
    create,
    update,
    ...props
}) => {
    const [startTime, setStartTime] = useState(
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );
    const [intervalType, setIntervalType] = useState('days');
    const [daysIntervalValue, setDaysIntervalValue] = useState(7);
    const [weekdaysIntervalValue, setWeekDaysIntervalValue] = useState([]);
    const [isInProgress, setIsInProgress] = useState(true);
    const reactTags = React.useRef();

    useEffect(() => {
        if (therapy) {
            if (therapy.plans && therapy.plans.length) {
                setStartTime(
                    format(
                        new Date(therapy.plans[0].startTime),
                        "yyyy-MM-dd'T'HH:mm"
                    )
                );
                if (therapy.plans.length === 1) {
                    setIntervalType('days');
                } else {
                    setIntervalType('weekdays');
                }
                setDaysIntervalValue(
                    addSeconds(new Date(0), therapy.plans[0].interval)
                );
            }
            setIsInProgress(therapy.isInProgress);
        }
    }, [therapy]);

    const handleCancel = e => setVisible(false);
    const handleSave = e => {
        if (therapy) {
            update(
                {
                    ...therapy,
                    client: patientId,
                    startTime,
                    interval: {
                        type: intervalType,
                        value:
                            intervalType === 'days'
                                ? daysIntervalValue
                                : weekdaysIntervalValue,
                    },
                    isInProgress,
                },
                patientId
            );
        } else {
            create({
                client: patientId,
                startTime,
                interval: {
                    type: intervalType,
                    value:
                        intervalType === 'days'
                            ? daysIntervalValue
                            : weekdaysIntervalValue,
                },
            });
        }

        setVisible(false);
    };

    const handleEndTherapy = e => {
        update({ ...therapy, isInProgress: false }, patientId);
        setVisible(false);
    };

    const handleWeekdayDelete = index => {
        const newTags = weekdaysIntervalValue.filter(
            (item, idx) => index !== idx
        );
        setWeekDaysIntervalValue(newTags);
    };

    const handleWeekdayAdd = tag => {
        if (intervalType === 'days') setIntervalType('weekdays');
        if (
            weekdaysIntervalValue.findIndex(item => item.id === tag.id) === -1
        ) {
            const newTags = [...weekdaysIntervalValue, tag];
            setWeekDaysIntervalValue(newTags);
        }
    };

    const handleDaysIntervalChange = e => {
        if (intervalType === 'weekdays') setIntervalType('days');
        setDaysIntervalValue(e.target.value);
    };

    return (
        <Modal
            title={therapy ? 'Edit therapy' : 'New therapy'}
            visible={true}
            footer={[
                <Button key="end" type="danger" onClick={handleEndTherapy}>
                    End therapy
                </Button>,
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Submit
                </Button>,
            ]}
            width={700}
        >
            <div className={'formGroup'}>
                <label htmlFor="startTime" className="label">
                    Start time
                </label>
                <FormInput
                    name="startTime"
                    title="Start time"
                    type="datetime-local"
                    onChange={e => setStartTime(e.target.value)}
                    defaultValue={startTime}
                    required
                />
            </div>
            <div className={'formGroup'}>
                <Tooltip
                    title="Enter valid value"
                    color="#ff4d4f"
                    key="interval"
                    placement="left"
                    visible={
                        intervalType === 'weekdays' &&
                        !weekdaysIntervalValue.length
                    }
                >
                    <label htmlFor="interval" className="label">
                        Repeat
                    </label>
                    <Radio.Group
                        defaultValue="days"
                        style={{ display: 'block' }}
                        onChange={e => setIntervalType(e.target.value)}
                    >
                        <div>
                            <Radio value="days" className={style.radio}>
                                Every{' '}
                                <FormInput
                                    type="number"
                                    name="daysIntervalValue"
                                    defaultValue={daysIntervalValue}
                                    onChange={handleDaysIntervalChange}
                                />{' '}
                                days
                            </Radio>
                        </div>
                        <div>
                            <Radio value="weekdays" className={style.radio}>
                                Each{' '}
                                <ReactTags
                                    ref={reactTags}
                                    tags={weekdaysIntervalValue}
                                    suggestions={weekdays}
                                    onDelete={handleWeekdayDelete}
                                    onAddition={handleWeekdayAdd}
                                    placeholderText="Add days of week"
                                    addOnBlur={true}
                                />
                            </Radio>
                        </div>
                    </Radio.Group>
                </Tooltip>
            </div>
        </Modal>
    );
};

const mapDispatchToProps = {
    create: therapyActions.createTherapy,
    update: therapyActions.updateTherapy,
};

export default connect(null, mapDispatchToProps)(TherapyFormModal);
