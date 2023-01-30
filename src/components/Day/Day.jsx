import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedEvent } from "../../store/slices/events";

import styles from "./Day.module.scss";

const Day = (props) => {
    const {
        day,
        handleSelectDay,
        handleOpenModal,
    } = props;
    const savedEvents = useSelector(state => state.event.events);
    const dispatch = useDispatch();

    const [dayEvents, setDayEvents] = useState([]);

    useEffect(() => {
        const events = savedEvents?.filter(event => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY"));

        setDayEvents(events);
    }, [day, savedEvents]);

    const isTodayClass = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? [styles.day, styles.day__today].join(" ") : styles.day;

    const handleClick = () => {
        handleSelectDay(day);
        handleOpenModal(true);
    };

    const handleUpdateEvent = (event) => {
        dispatch(setSelectedEvent(event));
    };

    return (
        <div className={isTodayClass} onClick={handleClick}>
            <div className={styles.day__title}>
                <p className={styles.day__title__item}>{day.format("ddd").toUpperCase()}</p>
                <p className={styles.day__title__item}>{day.format("DD")}</p>
            </div>

            {
                dayEvents?.map((event) => {
                    return <p className={styles.day__event} onClick={() => handleUpdateEvent(event)} key={event.id}>{event.title}</p>;
                })
            }
        </div>
    );
};

export default Day;
