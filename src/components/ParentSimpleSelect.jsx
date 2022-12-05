import React from 'react';
import CustomSelect from './CustomSelect';
const ParentSimpleSelect = React.forwardRef(({ ...rest }, ref) => {
    return (
        <CustomSelect
            innerRef={ref}
            {...rest}
        />
    );
});

export default ParentSimpleSelect;