import React from "react";

import calendar from "../../assets/img/calendar.svg";
import dayjs from "dayjs";

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

                <img src={calendar} alt="calendar" />
            </div>
        </div>
    );
};

export default Navbar;