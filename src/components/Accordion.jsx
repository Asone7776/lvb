import { useState } from "react";
import AccordionItem from "./AccordionItem";
const Accordion = () => {
    const [items] = useState([
        {
            id: '12344566',
            risk: 'Инвалидность',
            date: '18.06.2022',
            price: '15 990 ₽',
            completed: true,
        },
        {
            id: '12344567',
            risk: 'Инвалидность',
            date: '18.06.2022',
            price: '15 990 ₽',
            completed: true,
        },
        {
            id: '12344568',
            risk: 'Смерть',
            date: '18.06.2022',
            price: '15 990 ₽',
            completed: false,
        },
    ]);
    return (
        <div className="accordion" id="accordion">
            {items && items.map((item, index) => (
                <AccordionItem key={`acc-${index}`} item={item} />
            ))}
        </div>
    );
}

export default Accordion;