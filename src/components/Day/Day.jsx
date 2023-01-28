import React from "react";

import styles from "./Day.module.scss";
import dayjs from "dayjs";

const Day = (props) => {
    const {
        day,
        handleSelectDay,
        handleOpenModal,
    } = props;
    // todo: add background for styles.day if it's today
    const isTodayClass = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "" : "";

    const handleClick = () => {
        handleSelectDay(day);
        handleOpenModal(true);
    };

    return (
        <div className={styles.day} onClick={handleClick}>
            <p>{day.format("ddd").toUpperCase()}</p>
            <p>{day.format("DD")}</p>
        </div>
    );
};

export default Day;