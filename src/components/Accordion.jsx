import React from "react";
import AccordionItem from "./AccordionItem";
import Spinner from '../components/Spinner';
const Accordion = ({ loading, list }) => {
    if (loading) {
        return (
            <div className="vertical-center" style={{ position: 'relative' }}>
                <Spinner />
            </div>
        )
    }
    return (
        <div className="accordion" id="accordion">
            {list && list.map((item, index) => (
                <AccordionItem key={`acc-${index}`} item={item} />
            ))}
        </div>
    );
}

export default Accordion;