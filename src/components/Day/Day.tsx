import React, { useEffect, useMemo, useState } from "react";

import { setSelectedEvent } from "../../store/slices/events";
import { useAppDispatch, useAppSelector } from "../../hooks/app";

import styles from "./Day.module.scss";

interface DayProps {
    day: Date;
    locale: string;

    handleSelectDay: (day: Date) => void;
    handleOpenModal: () => void;
}

const Day: React.FC<DayProps> = (props) => {
    const {
        day,
        handleSelectDay,
        handleOpenModal,
        locale,
    } = props;

    const thisDate = useMemo(() =>  new Date(day), [day]);

    const savedEvents = useAppSelector(state => state.event.events);
    const dispatch = useAppDispatch();

    const [dayEvents, setDayEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        const events = savedEvents?.filter(event => new Date(event.day).toLocaleDateString() === thisDate.toLocaleDateString());

        setDayEvents(events);
    }, [day, savedEvents, thisDate]);

    const isTodayClass = thisDate.toLocaleDateString() === new Date().toLocaleDateString() ? [styles.day, styles.day__today].join(" ") : styles.day;

    const handleClick = () => {
        handleSelectDay(day);
        handleOpenModal();
    };

    const handleUpdateEvent = (event: IEvent) => {
        dispatch(setSelectedEvent(event));
    };

    return (
        <div className={isTodayClass} onClick={handleClick}>
            <div className={styles.day__title}>
                <p className={styles.day__title__item}>{thisDate.getDate()}</p>
                <p className={styles.day__title__item}>{thisDate.toLocaleString(locale, { weekday: "long" })}</p>
            </div>

            {
                dayEvents?.map((event) => {
                    return <p className={styles.day__event} onClick={() => handleUpdateEvent(event)}
                              key={event.id}>{event.title}</p>;
                })
            }
        </div>
    );
};

export default Day;
