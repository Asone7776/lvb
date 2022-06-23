import { useState, useEffect } from "react";
import cn from "classnames";
import { formatPrice, formatDate } from "../ functions";
const AccordionItem = ({ item }) => {
    const [active, setActive] = useState(false);
    const [risk, setRisk] = useState('Смерть');
    const onToggle = () => {
        setActive(!active);
    }
    useEffect(() => {
        if (item && item.options && item.options.length > 1) {
            formatRisk(item.options[0].value, item.options[1].value);
        }
    }, [item]);
    const formatRisk = (death, invalid) => {
        if (death && !invalid) {
            setRisk('Смерть')
        }
        if (invalid && !death) {
            setRisk('Инвалидность')
        }
        if (death && invalid) {
            setRisk('Смерть, Инвалидность');
        }
        if (!death && !invalid) {
            setRisk('Не указан');
        }
    }
    return (
        <div className="card">
            <div className="card-header" id={`heading-${item.id}`}>
                <div className="collapsed" data-toggle="collapse" data-target={`#collapse-${item.id}`} aria-expanded="true" aria-controls={`collapse-${item.id}`} onClick={onToggle}>
                    <div className="row">
                        <div className="col id">
                            ID {item.policy_id}
                        </div>
                        <div className="col col-3 risk text-right">
                            {risk}
                        </div>
                        <div className="col col-2 date text-center">
                            {item.created_at ? formatDate(item.created_at) : null}
                        </div>
                        <div className="col col-2 price">
                            {item.amount ? `${formatPrice(item.amount)}₽` : null}
                        </div>
                        <div className="col col-2 status text-right">
                            {item.status ? (
                                <span className="completed">Успешно</span>
                            ) : (
                                <span className="not-completed">Не завершён</span>
                            )}
                        </div>
                        <div className="col col-1">
                            <div className='arrow'>
                                <svg className={cn({ 'active': active })} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9987 14.071L8.17769 10.25C7.76369 9.83595 7.09169 9.83595 6.67769 10.25C6.26369 10.664 6.26369 11.336 6.67769 11.75L11.2917 16.364C11.6827 16.755 12.3157 16.755 12.7057 16.364L17.3197 11.75C17.7337 11.336 17.7337 10.664 17.3197 10.25C16.9057 9.83595 16.2337 9.83595 15.8197 10.25L11.9987 14.071Z" fill="black" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id={`collapse-${item.id}`} className="collapse" aria-labelledby={`heading-${item.id}`}>
                <div className="card-body">
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Тип страхования</div>
                                <div className="heading">{risk}</div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">Срок страхования</div>
                                <div className="heading">{item.term ? `${item.term} месяцев` : null}</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="item">
                                <div className="sub-heading">Сумма страхования</div>
                                {item.limit_amount ? `${formatPrice(item.limit_amount)}₽` : null}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Страхователь</div>
                                <div className="heading">{item.insurer ? item.insurer : null}</div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">Паспорт</div>
                                <div className="heading">{item.passport ? item.passport : null}</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="item">
                                <div className="sub-heading">Номер телефона</div>
                                <div className="heading">{item.phone ? item.phone : null}</div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Кредитный договор</div>
                                <div className="heading">{item.credit_number ? `№${item.credit_number}` : null}</div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">Кредитное учереждение</div>
                                <div className="heading">{item.credit_institution ? item.credit_institution : null}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Адрес</div>
                                <div className="heading">{item.address ? item.address : null}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionItem;