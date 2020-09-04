import React from 'react';
import { Card } from 'antd';
import style from './NotesCard.module.scss';

const NotesCard = ({ patient }) => {
    return (
        <Card title="NOTES">
            <Card.Meta className={style.notesContainer} />
        </Card>
    );
};

export default NotesCard;
