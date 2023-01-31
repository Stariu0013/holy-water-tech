import { ChangeEvent, useEffect, useState } from "react";
import React from "react";

import Month from "./components/Month/Month";
import Navbar from "./components/Navbar/Navbar";
import EventModal from "./components/EventModal/EventModal";

import { useAppDispatch, useAppSelector } from "./hooks/app";
import { getDaysMatrix } from "./tools/getDaysMatrix";
import { getEventsFromLocalStorage, setSelectedEvent } from "./store/slices/events";

import styles from "./App.module.scss";

function App() {
    const [calendarMonth, setCalendarMonth] = useState<Date[][]>(getDaysMatrix());
    const [monthIndex, setMonthIndex] = useState<number>(0);
    const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
    const [showModal, setShowModal] = useState<boolean>(false);
    const [locale, setLocale] = useState<string>('uk-UA');

    const events = useAppSelector(state => state.event.events);
    const dispatch = useAppDispatch();

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
    const handleSelectDay = (day: Date | null) => {
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
    const handleChangeLocale = (event: ChangeEvent<HTMLSelectElement>) => {
        setLocale(event.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <>
                {
                    showModal ? <EventModal locale={locale} selectedDay={selectedDay} onClose={handleCloseModal} /> : null
                }
                <Navbar monthIndex={monthIndex}
                        next={handleNextMonth}
                        prev={handlePrevMonth}
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
