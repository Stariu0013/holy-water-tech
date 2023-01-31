import React, { useState } from "react";

import { DateEnum } from "../../types/date";

import useInput from "../../hooks/useInput";
import { pushEvents, removeEvent, updateEvent } from "../../store/slices/events";

import { formatDate } from "../../tools/formatDate";

import styles from "./EventModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/app";

interface EventModalProps {
    selectedDay: Date | null;
    locale: string;

    onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = (props) => {
    const {
        onClose,
        selectedDay,
        locale,
    } = props;
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(state => state.event.selectedEvent);

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
            const calendar: IEvent = {
                title: title.value,
                description: description.value,
                date: date.value,
                time: time.value,
                day: selectedDay ? selectedDay.valueOf() : new Date(date.value).valueOf(),
                id: selectedEvent ? selectedEvent.id : Date.now(),
                createdAt: new Date().valueOf(),
            };

            if (selectedEvent) {
                calendar.updatedAt = new Date().valueOf();

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

    const subtitleOptions: Intl.DateTimeFormatOptions = {
        year: DateEnum.NUMERIC,
        month: DateEnum.LONG,
        day: DateEnum.DIGITS,
        hour: DateEnum.DIGITS,
        minute: DateEnum.DIGITS,
        second: DateEnum.DIGITS,
    };

    const subtitle = selectedEvent && selectedEvent.updatedAt
        ? <p className={styles.modal__subtitle}>Updated
            at: {new Date(selectedEvent?.updatedAt).toLocaleDateString(locale, subtitleOptions)}</p>
        : selectedEvent && selectedEvent.createdAt
            ? <p className={styles.modal__subtitle}>Created
                at: {new Date(selectedEvent?.createdAt).toLocaleDateString(locale, subtitleOptions)}</p>
            : null;

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
            {subtitle}
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
