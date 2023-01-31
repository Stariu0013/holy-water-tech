import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import Month from "./components/Month/Month";
import Navbar from "./components/Navbar/Navbar";
import EventModal from "./components/EventModal/EventModal";

import { getDaysMatrix } from "./tools/getDaysMatrix";
import { getEventsFromLocalStorage, setSelectedEvent } from "./store/slices/events";

import styles from "./App.module.scss";

function App() {
    const [calendarMonth, setCalendarMonth] = useState(getDaysMatrix());
    const [monthIndex, setMonthIndex] = useState(0);
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [locale, setLocale] = useState('uk-UA');

    const events = useSelector(state => state.event.events);
    const dispatch = useDispatch();

    useEffect(() => {
        if (events.length) {
            localStorage.setItem("savedEvents", JSON.stringify(events));
        }
    }, [events]);

    useEffect(() => {
        dispatch(getEventsFromLocalStorage());
    }, [dispatch]);

    useEffect(() => {
        setCalendarMonth(getDaysMatrix(monthIndex));
    }, [monthIndex]);

    const handlePrevMonth = () => {
        setMonthIndex(prevState => prevState - 1);
    };
    const handleNextMonth = () => {
        setMonthIndex(prevState => prevState + 1);
    };
    const handleSelectDay = (day) => {
        setSelectedDay(day);
    };
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        dispatch(setSelectedEvent(null));
        handleSelectDay(null);
    };
    const handleChangeLocale = (event) => {
        setLocale(event.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <>
                {
                    showModal ? <EventModal locale={locale} selectedDay={selectedDay} handleSelectDay={handleSelectDay} onClose={handleCloseModal} /> : null
                }
                <Navbar monthIndex={monthIndex}
                        next={handleNextMonth}
                        prev={handlePrevMonth}
                        selectedDay={selectedDay}
                        handleOpenModal={handleOpenModal}
                        setCurrentMonth={setCalendarMonth}
                        locale={locale}
                        handleChangeLocale={handleChangeLocale}
                />
                <Month month={calendarMonth}
                       locale={locale}
                       handleSelectDay={handleSelectDay}
                       handleOpenModal={handleOpenModal}
                />
            </>
        </div>
    );
}

export default App;
