import React, { useEffect, useState } from "react";
import cn from "classnames";
import { formatPrice } from "../ functions";
const InfoCardCreate = ({ allFields, complete, onSubmit }) => {
    const [risk, setRisk] = useState('Смерть');
    useEffect(() => {
        console.log(allFields);
        formatRisk(allFields['case-0'], allFields['case-1']);
    }, [allFields]);
    const formatRisk = (death, invalid) => {
        if (death && !invalid) {
            setRisk('Смерть')
        }
        if (invalid && !death) {
            setRisk('Инвалидность')
        }
        if (death && invalid) {
            setRisk('Смерть,Инвалидность');
        }
        if (!death && !invalid) {
            setRisk('Не указан');
        }
    }
    return (
        <div className='card custom-card-small'>
            <div className={cn('info-wrapper', { 'complete': complete })}>
                <div className="info-block">
                    <span>Страхователь</span>
                    <h4>{allFields.holder ? allFields.holder.label : '-'}</h4>
                </div>
                <div className="info-block">
                    <span>Лимит</span>
                    <h4>{allFields.limit ? formatPrice(allFields.limit) : '500 000'}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Страховой риск</span>
                    <h4>{risk}</h4>
                </div>
                <div className="info-block">
                    <span>Срок страхования</span>
                    <h4>{allFields.term ? `${allFields.term} месяца` : '24 месяца'}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span className='mb-0'>Предварительный расчёт</span>
                    <div className='pre-price'>₽</div>
                    {/* <div className='pre-price'>15 000 ₽</div> */}
                </div>
                <button className={cn('btn', { 'btn-primary': !complete, 'btn-blue': complete })} onClick={onSubmit}>
                    Оформить полис
                </button>
            </div>
        </div>
    );
}

export default InfoCardCreate;