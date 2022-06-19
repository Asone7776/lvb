import React from 'react';
import CustomSelect from "./CustomSelect";
const ParentSelect = React.forwardRef(({ ...rest }, ref) => {
    return (
        <CustomSelect
            innerRef={ref}
            {...rest}
        />
    );
});


export default ParentSelect;