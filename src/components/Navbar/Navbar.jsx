import React from "react";

import calendar from '../../assets/img/calendar.svg';

const Navbar = () => {
    return (
        <div>
            <button>Add event</button>
            <div>
                <button>
                    prevMonth
                </button>
                <button>
                    nextMonth
                </button>

                <img src={calendar} alt="calendar" />
            </div>
        </div>
    );
};

export default Navbar;