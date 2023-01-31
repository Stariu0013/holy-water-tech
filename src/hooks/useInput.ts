import { ChangeEvent, useState } from "react";

const UseInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange,
    };
};

export default UseInput;
