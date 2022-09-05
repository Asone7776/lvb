import React, { useEffect, useState } from 'react';
import { formatPrice } from '../ functions';

const InputRangeSteps = ({ middle, onChangeValue, suffix, needToFormat, min, max, defaultValue, step }) => {
    const [currentValue, setCurrentValue] = useState(defaultValue);
    const [bgSize, setBgSize] = useState(0);
    const handleChange = (event) => {
        let { value } = event.target;
        setCurrentValue(Number(value));
        onChangeValue(value);
    }

    useEffect(() => {
        if (defaultValue) {
            setCurrentValue(defaultValue);
            changeBg(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => {
        changeBg(currentValue);
    }, [currentValue]);

    const changeBg = (val) => {
        if (val === '' || val === 0) {
            setBgSize('0% 100%');
        } else {
            setBgSize((val - min) * 100 / (max - min) + '% 100%');
        }
    }
    return (
        <div className='custom-range-input'>
            <input step={step ? step : '1'} onChange={handleChange} style={{ backgroundSize: bgSize }} value={currentValue} type="range" min={min} max={max} />
            <div className="values d-flex justify-content-between align-items-center">
                <div className="left">{`${needToFormat ? formatPrice(min) : min} ${suffix}`}</div>
                <div className="center with-middle">
                    {`${needToFormat ? formatPrice(middle) : middle} ${suffix}`}
                </div>
                <div className="right">{`${needToFormat ? formatPrice(max) : max} ${suffix}`}</div>
            </div>
        </div>
    );
};
export default InputRangeSteps;