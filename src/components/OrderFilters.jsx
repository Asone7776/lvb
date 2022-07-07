import React, { useState, useEffect } from "react";
import FilterSelect from "./FilterSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withDebounce } from '../ functions';
import { setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import moment from "moment";
setDefaultLocale('ru');
const OrderFilters = ({ users, onFilterChange, onDateRange }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const statuses = [
        { value: null, label: 'Все' },
        { value: 2, label: 'Подтверждено' },
        { value: -1, label: 'Отменено' },
        { value: 0, label: 'Не оплачено' },
        { value: 3, label: 'Оплачено' },
    ];
    const onSearchChange = (event) => {
        const search = event.target.value;
        if (search.length >= 3 || search.length === 0) {
            withDebounce(() => {
                onFilterChange("search", search ? search : null);
            });
        }
    };

    return (
        <div className="order-filters small-gutters">
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 2C5.14585 2 2 5.14585 2 9C2 12.8541 5.14585 16 9 16C10.748 16 12.345 15.348 13.5742 14.2812L14 14.707V16L20 22L22 20L16 14H14.707L14.2812 13.5742C15.348 12.345 16 10.748 16 9C16 5.14585 12.8541 2 9 2ZM9 4C11.7733 4 14 6.22673 14 9C14 11.7733 11.7733 14 9 14C6.22673 14 4 11.7733 4 9C4 6.22673 6.22673 4 9 4Z" fill="black" />
                                </svg>
                            </span>
                        </div>
                        <input onChange={onSearchChange} type="text" className="form-control" placeholder="Поиск" />
                    </div>
                </div>
                <div className="col">
                    <FilterSelect options={statuses} onChange={(val) => {
                        onFilterChange('status', val.value);
                    }} />
                </div>
                <div className="col">
                    <DatePicker
                        locale={ru}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText={'Дата'}
                        className={'form-control'}
                        dateFormat="Y-MM-dd"
                        onChange={(update) => {
                            onDateRange(update);
                            setDateRange(update);
                        }}
                        isClearable={true}
                    />
                </div>
                <div className="col-12 mb-3">
                    <FilterSelect
                        defaultValue={[]}
                        placeholder={'Пользователи'}
                        isMulti options={users.data} onChange={(val) => {
                            let valueToSend = null
                            if (val.length > 0) {
                                valueToSend = val.map((item) => item.value).join();
                            }
                            onFilterChange('users', valueToSend);
                        }} />
                </div>
            </div>
        </div>
    );
}

export default OrderFilters;