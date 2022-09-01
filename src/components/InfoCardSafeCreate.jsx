import React from "react";
import cn from "classnames";
import { formatPrice } from "../ functions";
import Spinner from "./Spinner";
const InfoCardCreate = ({ loading, data, complete }) => {
    return (
        <div className='card custom-card-small'>
            <div className={cn('info-wrapper', { 'complete': complete })}>
                <div className="info-block">
                    <span>Страхователь</span>
                    <h4>{`${data.legal_type && data.legal_type.label} ${data.name ? data.name : ''}`}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Страховая сумма</span>
                    <h4>{data && data.sum ? formatPrice(data.sum) : '400 000'}</h4>
                </div>
                <div className="divider"></div>
                <button type="submit" disabled={loading} className={cn('btn', { 'btn-primary': !complete, 'btn-blue': complete, 'loading': loading })}>
                    {loading ? (
                        <Spinner />
                    ) : 'Сформировать'}
                </button>
            </div>
        </div>
    );
}

export default InfoCardCreate;