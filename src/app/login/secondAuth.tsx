import styles from "./secondAuth.module.scss"
import React, { useState, createRef } from 'react';

const SecondAuthLogin = () => {
    return (
        <div className={styles.displayBackground}>
            <InputBoxes />
        </div>
    )
}

const InputBoxes = () => {
  const [inputValues, setInputValues] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = inputValues.map(() => createRef<HTMLInputElement>());

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1 || isNaN(Number(value))) return; // Allow only one digit and numbers

    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    // Focus the next input if this is not the last input and a value was entered
    if (index < inputValues.length - 1 && value) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      {inputValues.map((value, index) => (
        <input
          className={styles.inputCartridge}
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          style={{ width: '30px' }}
        />
      ))}
    </div>
  );
};

export default InputBoxes;


export {SecondAuthLogin}