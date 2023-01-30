import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import useInput from "../../hooks/useInput";
import { pushEvents, removeEvent, updateEvent } from "../../store/slices/events";

import { formatDate } from "../../tools/reverseDate";

import styles from "./EventModal.module.scss";

const EventModal = (props) => {
    const {
        onClose,
        selectedDay,
    } = props;
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.selectedEvent);

    const title = useInput(selectedEvent ? selectedEvent.title : "");
    const description = useInput(selectedEvent ? selectedEvent.description : "");
    const date = useInput(selectedDay ? formatDate(selectedDay) : "");
    const time = useInput(selectedEvent ? selectedEvent.time : "");

    const [titleError, setTitleError] = useState("");
    const [dateError, setDateError] = useState("");

    const onSave = () => {
        if (!date.value) {
            setDateError("Date is required");
        }
        if (!title.value) {
            setTitleError("Title is required");
        }

        if (date.value && title.value) {
            const calendar = {
                title: title.value,
                description: description.value,
                date: date.value,
                time: time.value,
                day: selectedDay ? dayjs(selectedDay).valueOf() : dayjs(new Date(date.value)).valueOf(),
                id: selectedEvent ? selectedEvent.id : Date.now(),
                createdAt: dayjs().valueOf(),
            };

            if (selectedEvent) {
                calendar.updatedAt = dayjs().valueOf();

                dispatch(updateEvent(calendar));
            } else {
                dispatch(pushEvents(calendar));
            }

            onClose();
        }
    };
    const onRemove = () => {
        dispatch(removeEvent(selectedEvent));

        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modal__titleBlock}>
                <h2 className={styles.modal__titleBlock__title}>{
                    selectedEvent && selectedEvent.updatedAt
                        ? "Add new idea item"
                        : "Edit idea item"
                }</h2>
                <div className={styles.modal__titleBlock__close} onClick={onClose} />
            </div>
            {
                selectedEvent && selectedEvent.updatedAt
                    ? <p className={styles.modal__subtitle}>Updated
                        at: {dayjs(selectedEvent.updatedAt).format("DD.MM.YYYY HH:mm:ss")}</p>
                    : selectedEvent && selectedEvent.createdAt
                        ? <p className={styles.modal__subtitle}>Created
                            at: {dayjs(selectedEvent.createdAt).format("DD.MM.YYYY HH:mm:ss")}</p>
                        : null
            }
            <div className={styles.modal__fields}>
                <label className={styles.modal__fields__label} htmlFor="title">Title *</label>
                <input className={styles.modal__fields__input} type="text" {...title} id="title"
                       placeholder="Title goes here" />
                {
                    titleError ? <p>{titleError}</p> : null
                }

                <label className={styles.modal__fields__label} htmlFor="description">Description</label>
                <input className={styles.modal__fields__input} type="text" {...description} id="description"
                       placeholder="Description" />

                <label className={styles.modal__fields__label} htmlFor="date">Date *</label>
                <input className={styles.modal__fields__input} type="date" {...date} id="date" placeholder="Date" />
                {
                    dateError ? <p>{dateError}</p> : null
                }

                <label className={styles.modal__fields__label} htmlFor="time">Time</label>
                <input className={styles.modal__fields__input} type="time" {...time} id="time"
                       placeholder="Begin time" />
            </div>

            <div className={styles.modal__btns}>
                {
                    selectedEvent ? <button className={styles.modal__btns__btn} onClick={onRemove}>Remove</button> :
                        <div />
                }

                <button className={styles.modal__btns__btn} onClick={onSave}>Save</button>
            </div>
        </div>
    );
};

export default EventModal;
