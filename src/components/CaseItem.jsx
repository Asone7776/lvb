import React, { useState, forwardRef, useRef } from 'react';
import cn from 'classnames';

const CaseItem = forwardRef(({ item, onChange, ...rest }, ref) => {
    const [active, setActive] = useState(false);
    let checkRef = useRef(null);
    return (
        <div className={cn('case-item', { 'active': active })} onClick={() => {
            checkRef.current.click();
        }}>
            <label className="check-wrapper">
                <input type="checkbox" onChange={(e) => {
                    let { checked } = e.target;
                    setActive(checked);
                    onChange(e);
                }} ref={(e) => {
                    ref(e);
                    checkRef.current = e;
                    if (e && e.checked) {
                        setActive(e.checked);
                    }
                }} checked={active} {...rest} />
                <span className="checkmark">
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.76744 3.76744L4 6L8.46512 1.53488" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </label>
            <h5>{item.title}</h5>
            <p>
                {item.content}
            </p>
        </div>
    );
});
export default CaseItem;