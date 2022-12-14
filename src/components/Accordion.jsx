import React from "react";
import AccordionItem from "./AccordionItem";
import Spinner from '../components/Spinner';
import { useDispatch } from "react-redux";
import { changeStatus } from "../redux/actions/orderActions";
const Accordion = ({ isDv = false, loading, list }) => {
    const dispatch = useDispatch();
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
                <AccordionItem isDv={isDv} key={`acc-${index}`} item={item} onStatusChange={(status) => {
                    dispatch(changeStatus({
                        order_id: item.id,
                        status
                    }))
                }} />
            ))}
        </div>
    );
}

export default Accordion;