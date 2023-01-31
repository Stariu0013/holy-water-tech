import React, { useEffect, useMemo, useRef, useState } from "react";

import calendarIcon from "../../assets/img/calendar.svg";
import left_icon from "../../assets/img/left-arrow.png";
import right_icon from "../../assets/img/right-arrow.png";

import { AVAILABLE_LOCALES } from "../../consts/i18n";

import { getDaysMatrix } from "../../tools/getDaysMatrix";

import styles from "./Navbar.module.scss";

const Navbar = (props) => {
    const {
        next,
        prev,
        monthIndex,
        handleOpenModal,
        setCurrentMonth,
        locale,
        handleChangeLocale,
    } = props;

    const dateOptions = useMemo(() => ({
        year: "numeric", month: "long",
    }), []);

    const [currentDateTitle, setCurrentDateTitle] = useState(new Date(new Date().getFullYear(), monthIndex).toLocaleString(locale, dateOptions));

    useEffect(() => {
        setCurrentDateTitle(new Date(new Date().getFullYear(), monthIndex).toLocaleString(locale, dateOptions));
    }, [locale, dateOptions, monthIndex]);

    const ref = useRef();

    const handleOpenCalendar = () => {
        ref.current.showPicker();
    };

    const handleChangeCalendar = (event) => {
        const date = event.target.value;

        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = newDate.getMonth();

        setCurrentDateTitle(new Date(year, month).toLocaleString(locale, dateOptions));

        setCurrentMonth(getDaysMatrix(month, year));
    };

    return (<div className={styles.navbar}>
        <button className={styles.navbar__addEvent} onClick={handleOpenModal} />

        <div className={styles.navbar__locales}>
            <p className={styles.navbar__locales__title}>Select other locale to see changes</p>

            <select className={styles.navbar__locales__select} name="locale" onChange={handleChangeLocale}>
                {
                    AVAILABLE_LOCALES.map((locale, index) => {
                        return <option key={index} value={locale.locale}>{locale.name}</option>;
                    })
                }
            </select>
        </div>

        <div className={styles.navbar__navigation}>
            <img className={styles.navbar__navigation__icon} onClick={prev} src={left_icon} alt="left_icon" />

            <p>{currentDateTitle}</p>

            <img className={styles.navbar__navigation__icon} src={right_icon} onClick={next} alt="right_icon" />

            <img onClick={handleOpenCalendar} src={calendarIcon} alt="calendar" />
            <input type="date" ref={ref} onChange={handleChangeCalendar}
                   className={styles.navbar__navigation__calendar} />
        </div>
    </div>);
};

export default Navbar;