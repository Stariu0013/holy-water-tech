import React, { useRef, useState } from "react";
import dayjs from "dayjs";

import calendarIcon from "../../assets/img/calendar.svg";
import left_icon from "../../assets/img/left-arrow.png";
import right_icon from "../../assets/img/right-arrow.png";

import { getDaysMatrix } from "../../tools/getDaysMatrix";

import styles from "./Navbar.module.scss";

const Navbar = (props) => {
    const {
        next,
        prev,
        monthIndex,
        handleOpenModal,
        setCurrentMonth,
    } = props;
    const [currentDateTitle, setCurrentDateTitle] = useState(dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY"));

    const ref = useRef();

    const handleOpenCalendar = () => {
        ref.current.showPicker();
    };

    const handleChange = (event) => {
        const date = event.target.value;

        setCurrentDateTitle(() => {
            return dayjs(new Date(dayjs(date).year(), dayjs(new Date(date)).month())).format("MMMM YYYY");
        });
        setCurrentMonth(getDaysMatrix(dayjs(new Date(date)).month(), dayjs(new Date(date)).year()));
    };

    return (
        <div className={styles.navbar}>
            <button className={styles.navbar__addEvent} onClick={handleOpenModal} />
            <div className={styles.navbar__navigation}>
                <img className={styles.navbar__navigation__icon} onClick={prev} src={left_icon} alt="left_icon" />

                <p>{currentDateTitle}</p>

                <img className={styles.navbar__navigation__icon} src={right_icon} onClick={next} alt="right_icon" />

                <img onClick={handleOpenCalendar} src={calendarIcon} alt="calendar" />
                <input type="date" ref={ref} onChange={handleChange} className={styles.navbar__navigation__calendar} />
            </div>
        </div>
    );
};

export default Navbar;