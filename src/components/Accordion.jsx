import React from "react";
import AccordionItem from "./AccordionItem";
const Accordion = ({list}) => {
    return (
        <div className="accordion" id="accordion">
            {list && list.map((item, index) => (
                <AccordionItem key={`acc-${index}`} item={item} />
            ))}
        </div>
    );
}

export default Accordion;