import Select, { components } from "react-select";
const customStyles = {
    indicatorSeparator: () => ({

    }),
    control: (provided) => ({
        ...provided,
        minHeight: '44px',
        height: '44px',
        border: 'none'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        paddingRight: '14.5px'
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '44px',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '44px',
    }),
    input: (provided) => ({
        ...provided,
        height: '35px',
    })
};

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25752 8.9225L9.91252 13.5775C10.2384 13.9033 10.7659 13.9033 11.0909 13.5775L15.7459 8.9225C16.2709 8.3975 15.8992 7.5 15.1567 7.5H5.84669C5.10419 7.5 4.73252 8.3975 5.25752 8.9225Z" fill="#E1BA00" />
            </svg>
        </components.DropdownIndicator>
    );
};
const FilterSelect = ({ options, onChange, ...props }) => {
    return (
        <Select
            styles={customStyles}
            className={'filter-select'}
            components={{ DropdownIndicator }}
            options={options}
            isSearchable={false}
            defaultValue={{ value: null, label: 'Все' }}
            placeholder={'Статус'}
            onChange={(val) => {
                onChange(val);
            }}
            {...props}
        />
    );
}

export default FilterSelect;