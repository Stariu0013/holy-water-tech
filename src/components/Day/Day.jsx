import React, { useEffect, useState } from "react";

import styles from "./Day.module.scss";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEvent } from "../../store/slices/events";

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

    // todo: add background for styles.day if it's today
    const isTodayClass = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "" : "";

    const handleClick = () => {
        handleSelectDay(day);
        handleOpenModal(true);
    };

    const handleUpdateEvent = (event) => {
        dispatch(setSelectedEvent(event));
        // dispatch(updateEvent(event));
    };

    return (
        <div className={styles.day} onClick={handleClick}>
            <p>{day.format("ddd").toUpperCase()}</p>
            <p>{day.format("DD")}</p>

            {
                dayEvents?.map((event) => {
                    return <p onClick={() => handleUpdateEvent(event)} key={event.id}>{event.title}</p>;
                })
            }
        </div>
    );
};

export default Day;
