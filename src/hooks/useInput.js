import { useState } from "react";

const UseInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange,
    };
};

export default UseInput;
