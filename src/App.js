import { getDaysMatrix } from "./tools/getDaysMatrix";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import React from "react";

import Month from "./components/Month/Month";
import Navbar from "./components/Navbar/Navbar";
import EventModal from "./components/EventModal/EventModal";

import styles from "./App.module.scss";

function App() {
    const [currentMonth, setCurrentMonth] = useState(getDaysMatrix());
    const [monthIndex, setMonthIndex] = useState(0);
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setCurrentMonth(getDaysMatrix(monthIndex));
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
    };

    return (
        <div className={styles.wrapper}>
            <>
                {
                    showModal ? <EventModal selectedDay={selectedDay} onClose={handleCloseModal} /> : null
                }
                <Navbar monthIndex={monthIndex}
                        next={handleNextMonth}
                        prev={handlePrevMonth}
                        selectedDay={selectedDay}
                        handleOpenModal={handleOpenModal}
                />
                <Month month={currentMonth}
                       handleSelectDay={handleSelectDay}
                       handleOpenModal={handleOpenModal}
                />
            </>
        </div>
    );
}

export default App;
