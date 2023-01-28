import React from "react";

import styles from "./Day.module.scss";
import dayjs from "dayjs";

const Day = ({ day }) => {
    // todo: add background for styles.day if it's today
    const isTodayClass = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "" : "";

    return (
        <div className={styles.day}>
            <p>{day.format("ddd").toUpperCase()}</p>
            <p>{day.format("DD")}</p>
        </div>
    );
};

export default Day;