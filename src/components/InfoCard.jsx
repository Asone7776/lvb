import React from "react";
import { Link } from 'react-router-dom';
import cn from "classnames";
const InfoCard = ({ complete, onSubmit }) => {
    return (
        <div className='card custom-card-small'>
            <div className={cn('info-wrapper', { 'complete': complete })}>
                <div className="info-block">
                    <span>Страхователь</span>
                    <h4>Физическое лицо</h4>
                </div>
                <div className="info-block">
                    <span>Срок страхования</span>
                    <h4>36 месяцев</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Страховой риск</span>
                    <h4>Смерть</h4>
                </div>
                <div className="info-block">
                    <span>Срок страхования</span>
                    <h4>24 месяца</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span className='mb-0'>Предварительный расчёт</span>
                    <div className='pre-price'>15 000 ₽</div>
                </div>
                <button className={cn('btn', { 'btn-primary': !complete, 'btn-blue': complete })} onClick={onSubmit}>
                    Оформить полис
                </button>
            </div>
        </div>
    );
}

export default InfoCard;