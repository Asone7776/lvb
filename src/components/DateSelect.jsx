import { forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { setDefaultLocale } from 'react-datepicker';
setDefaultLocale('ru');


const DateSelect = forwardRef(({value, onChange, ...rest }, ref) => {
    return (
        <DatePicker
            locale={ru}
            selected={value}
            placeholderText={'Дата'}
            className={'form-control'}
            dateFormat="dd.MM.yyyy"
            onChange={(date) => {
                onChange(date);
            }}
            isClearable={true}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            ref={ref}
            {...rest}
        />
    );
});

export default DateSelect;