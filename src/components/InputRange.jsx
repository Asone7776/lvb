import React, { forwardRef, useEffect, useState } from 'react';
import { formatPrice } from '../functions';
import InputNumber from 'rc-input-number';

const InputRange = ({ withInput = false, onChangeValue, suffix, needToFormat, min, max, defaultValue, step, ...rest }) => {
    const [currentValue, setCurrentValue] = useState(defaultValue);
    const [bgSize, setBgSize] = useState(0);
    const handleChange = (event) => {
        let { value } = event.target;
        setCurrentValue(Number(value));
        onChangeValue(value);
    }

    const handleChangeInput = (value) => {
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
                <div className="center">
                    {withInput ? (
                        <InputNumber
                            onChange={handleChangeInput}
                            value={currentValue}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                            min={min}
                            max={max}
                        />
                    ) : (
                        `${needToFormat ? formatPrice(currentValue) : currentValue} ${suffix}`
                    )}
                </div>
                <div className="right">{`${needToFormat ? formatPrice(max) : max} ${suffix}`}</div>
            </div>
        </div>
    );
};
export default InputRange;