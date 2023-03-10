import React from "react";

import Day from "../Day/Day";

import styles from "./Month.module.scss";

interface MonthProps {
    month: Date[][],
    locale: string;

    handleSelectDay: (day: Date) => void,
    handleOpenModal: () => void;
}

const Month: React.FC<MonthProps> = (props) => {
    const {
        month,
        handleSelectDay,
        handleOpenModal,
        locale,
    } = props;

    return (
        <div className={styles.calendar}>
            {
                month.map((row, index) => {
                    return <React.Fragment key={index}>
                        {
                            row.map((day, dayIndex) => {
                                return <Day handleOpenModal={handleOpenModal}
                                            handleSelectDay={handleSelectDay}
                                            day={day} key={dayIndex}
                                            locale={locale}
                                />;
                            })
                        }
                    </React.Fragment>;
                })
            }
        </div>
    );
};

export default Month;