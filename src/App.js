import { getDaysMatrix } from "./tools/getDaysMatrix";
import { useState } from "react";
import Month from "./components/Month/Month";

import styles from "./App.module.scss";
import Navbar from "./components/Navbar/Navbar";

function App() {
    const [currentMonth, setCurrentMonth] = useState(getDaysMatrix());

    return (
        <div className={styles.wrapper}>
            <>
                <Navbar />
                <Month month={currentMonth} />
            </>
        </div>
    );
}

export default App;
