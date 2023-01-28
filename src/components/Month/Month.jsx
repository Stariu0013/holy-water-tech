import React from "react";
import Day from "../Day/Day";

import styles from "./Month.module.scss";

const Month = ({ month }) => {
    return (
        <div className={styles.calendar}>
            {
                month.map((row, index) => {
                    return <React.Fragment key={index}>
                        {
                            row.map((day, dayIndex) => {
                                return <Day day={day} key={dayIndex} />;
                            })
                        }
                    </React.Fragment>;
                })
            }
        </div>
    );
};

export default Month;