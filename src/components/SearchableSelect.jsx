import { forwardRef } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
const promiseOptions = async (inputValue) => {
    try {
        const response = await axios.get('https://vsk-trust.ru/api/dvbank/address/list', {
            params: {
                query: inputValue ? inputValue : null
            }
        });
        return response.data.data;
    } catch (error) {
        if (error) {
            // console.log(error);
        }
        return [];
    }

}

const SearchableSelect = forwardRef(({ onChange, ...rest }, ref) => {
    const handleChange = (newValue) => {
        onChange(newValue);
    };
    return (
        <AsyncSelect
            onChange={handleChange}
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            isClearable={true}
            noOptionsMessage={() => 'Введите искомое значение'}
            getOptionLabel={(option) => option.name}
            placeholder="Адрес"
            loadingMessage={() => 'Поиск...'}
            classNamePrefix={'react-select-prefix'}
            ref={ref}
            {...rest}
        />
    );
});

export default SearchableSelect;