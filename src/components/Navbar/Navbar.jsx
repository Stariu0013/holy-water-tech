import React from "react";
import dayjs from "dayjs";

import calendarIcon from "../../assets/img/calendar.svg";

const Navbar = (props) => {
    const {
        next,
        prev,
        monthIndex,
        handleOpenModal
    } = props;

    return (
        <div>
            <button onClick={handleOpenModal}>Add event</button>
            <div>
                <button onClick={prev}>
                    prevMonth
                </button>

                <p>{
                    dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")
                }</p>

                <button onClick={next}>
                    nextMonth
                </button>

                <img src={calendarIcon} alt="calendar" />
            </div>
        </div>
    );
};

export default Navbar;