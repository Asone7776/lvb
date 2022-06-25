import { components } from "react-select";
import CreatableSelect from 'react-select/creatable';
const customStyles = {
    indicatorSeparator: () => ({

    }),
    control: (provided) => ({
        ...provided,
        minHeight: '50px',
        height: '50px'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        paddingRight: '14.5px'
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
const CustomCreateableSelect = ({ options, onChange, innerRef, ...field }) => {
    const handleChange = (newValue) => {
        onChange(newValue);
    };
    return (
        <CreatableSelect
            onChange={handleChange}
            styles={customStyles}
            components={{ DropdownIndicator }}
            options={options}
            formatCreateLabel={(val) => `"Добавить ${val}"`}
            ref={innerRef}
            {...field}
        />
    );
}

export default CustomCreateableSelect;