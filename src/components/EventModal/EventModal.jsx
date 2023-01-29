import React from "react";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../../hooks/useInput";
import { pushEvents, updateEvent } from "../../store/slices/events";

import styles from "./EventModal.module.scss";

const EventModal = (props) => {
    const {
        onClose,
        selectedDay,
    } = props;
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.selectedEvent);

    const title = useInput(selectedEvent ? selectedEvent.title : '');
    const description = useInput(selectedEvent ? selectedEvent.description : '');
    const date = useInput(selectedEvent ? selectedEvent.date : '');
    const time = useInput(selectedEvent ? selectedEvent.time : '');

    const onSave = () => {
        const calendar = {
            title: title.value,
            description: description.value,
            date: date.value,
            time: time.value,
            day: selectedDay.valueOf(),
            id: selectedEvent? selectedEvent.id : Date.now(),
        };

        if (selectedEvent) {
            dispatch(updateEvent(calendar));
        } else {
            dispatch(pushEvents(calendar));
        }

        onClose();
    };

    return (
        <div className={styles.modal}>
            <label htmlFor="title">Title</label>
            <input type="text" {...title} id="title" placeholder="Title goes here" />

            <label htmlFor="description">Description</label>
            <input type="text" {...description} id="description" placeholder="Description" />

            <label htmlFor="date">{selectedDay.format('dddd, MMMM DD')}</label>
            <input type="date" {...date} id="date" placeholder="Date" />

            <label htmlFor="time">Time</label>
            <input type="time" {...time} id="time" placeholder="Begin time" />

            <button onClick={onSave}>Save</button>
        </div>
    );
};

export default EventModal;
