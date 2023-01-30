import React from "react";
import dayjs from "dayjs";

import calendarIcon from "../../assets/img/calendar.svg";
import left_icon from "../../assets/img/left-arrow.png";
import right_icon from "../../assets/img/right-arrow.png";

import styles from "./Navbar.module.scss";

const Navbar = (props) => {
    const {
        next,
        prev,
        monthIndex,
        handleOpenModal,
    } = props;

    return (
        <div className={styles.navbar}>
            <button className={styles.navbar__addEvent} onClick={handleOpenModal} />
            <div className={styles.navbar__navigation}>
                <img className={styles.navbar__navigation__icon} onClick={prev} src={left_icon} alt="left_icon" />

                <p>{
                    dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")
                }</p>

                <img className={styles.navbar__navigation__icon} src={right_icon} onClick={next} alt="right_icon" />

                <img src={calendarIcon} alt="calendar" />
            </div>
        </div>
    );
};

export default Navbar;