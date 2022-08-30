import React, { useState } from "react";
import FilterSelect from "./FilterSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withDebounce } from '../ functions';
import { setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import Spinner from '../components/Spinner';
import cn from 'classnames';
setDefaultLocale('ru');
const DashboardFilters = ({ title, users, onFilterChange, onDateRange, onExport, excelLoading }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const typesOfProgram = [
        { value: null, label: 'Все продукты' },
        { value: -1, label: 'Карточный сейф' },
        { value: 0, label: 'Страхование от несчастных случаев' },
    ];

    return (
        <div className="order-filters small-gutters dashboard-filters">
            <div className="row">
                <div className="col d-flex align-items-center">
                    <h3 className="default-heading">Дашборд</h3>
                </div>
                <div className="col">
                    <FilterSelect
                        defaultValue={[]}
                        placeholder={'Пользователи'}
                        isMulti options={users && users.data} onChange={(val) => {
                            let valueToSend = null
                            if (val.length > 0) {
                                valueToSend = val.map((item) => item.value).join();
                            }
                            onFilterChange('users', valueToSend);
                        }} />
                </div>
                <div className="col">
                    <FilterSelect
                        defaultValue={null}
                        placeholder={'Продукты'}
                        options={typesOfProgram} onChange={(val) => {
                            // onFilterChange('users', val.value);
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
                        dateFormat="dd-MM-Y"
                        onChange={(update) => {
                            onDateRange(update);
                            setDateRange(update);
                        }}
                        isClearable={true}
                    />
                </div>
                <div className="col-2">
                    <button className={cn('btn btn-blue w-100', { 'loading': excelLoading })} disabled={excelLoading} onClick={onExport}>
                        {excelLoading ? <Spinner /> : 'Выгрузить отчёт'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashboardFilters;