import React, { useEffect, useState } from "react";
import cn from "classnames";
import { formatPrice } from "../ functions";
const InfoCardCreate = ({ loading, data, complete }) => {
    const [risk, setRisk] = useState('Смерть');
    useEffect(() => {
        if (data) {
            formatRisk(data['case-0'], data['case-1']);
        }
    }, [data]);
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
                    <h4>{data && data.holder ? data.holder.label : '-'}</h4>
                </div>
                <div className="info-block">
                    <span>Лимит</span>
                    <h4>{data && data.limit ? formatPrice(data.limit) : '500 000'}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Страховой риск</span>
                    <h4>{risk}</h4>
                </div>
                <div className="info-block">
                    <span>Срок страхования</span>
                    <h4>{data && data.term ? `${data.term} месяца` : '24 месяца'}</h4>
                </div>
                <button type="submit" disabled={loading} className={cn('btn', { 'btn-primary': !complete, 'btn-blue': complete })}>
                    Сформировать счёт
                </button>
            </div>
        </div>
    );
}

export default InfoCardCreate;