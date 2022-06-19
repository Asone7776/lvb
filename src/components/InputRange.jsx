import React, { forwardRef, useEffect, useState } from 'react';
import { formatPrice } from '../ functions';
const InputRange = forwardRef(({ suffix, needToFormat, min, max, onChange, defaultValue, step, ...rest }, ref) => {
    const [currentValue, setCurrentValue] = useState('100%');
    const [bgSize, setBgSize] = useState(0);
    const handleChange = (event) => {
        let { value } = event.target;
        changeBg(value);
        setCurrentValue(value);
        onChange(event);
    }
    useEffect(() => {
        if (defaultValue) {
            setCurrentValue(defaultValue);
            changeBg(defaultValue);
        }
    }, [defaultValue]);
    const changeBg = (val) => {
        setBgSize((val - min) * 100 / (max - min) + '% 100%');
    }
    return (
        <div className='custom-range-input'>
            <input step={step ? step : '1'} onChange={handleChange} style={{ backgroundSize: bgSize }} value={currentValue} type="range" min={min} max={max} ref={ref} {...rest} />
            <div className="values d-flex justify-content-between">
                <div className="left">{`${needToFormat ? formatPrice(min) : min} ${suffix}`}</div>
                <div className="center">{`${needToFormat ? formatPrice(currentValue) : currentValue} ${suffix}`}</div>
                <div className="right">{`${needToFormat ? formatPrice(max) : max} ${suffix}`}</div>
            </div>
        </div>
    );
});
export default InputRange;