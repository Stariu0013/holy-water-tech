import React from "react";

import styles from "./EventModal.module.scss";

const EventModal = (props) => {
    const {
        onClose,
        selectedDay,
    } = props;

    return (
        <div className={styles.modal}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="Title goes here" />

            <label htmlFor="description">Description</label>
            <input type="text" id="description" placeholder="Description" />

            <label htmlFor="date">{selectedDay.format('dddd, MMMM DD')}</label>
            <input type="date" id="date" placeholder="Date" />

            <label htmlFor="time">Time</label>
            <input type="time" id="time" placeholder="Begin time" />

            <button onClick={onClose}>Save</button>
        </div>
    );
};

export default EventModal;