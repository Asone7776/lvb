import { useState, useEffect } from "react";
import cn from "classnames";
import { formatPrice, formatDate, getStatusName } from "../functions";
import { saveEditData, holdPolice } from "../redux/slices/policeSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RISKS_DESCRIPTIONS } from "../risk-constants";
import { saveItem } from '../redux/slices/safeSlice';
import { tariffs } from "../constants";
const AccordionItem = ({ isDv = false, item, onStatusChange }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const toEditMode = () => {
        dispatch(saveEditData({
            policy_number: item.policy_number,
            ...item.form
        }));
        dispatch(holdPolice(item));
        if (item.form_type === null) {
            navigate(`/admin/edit-accident/${item.id}`);
        }
        if (item.form_type === 1) {
            navigate(`/admin/edit-cardsafe/${item.id}`);
        }
        if (item.form_type === 2) {
            dispatch(saveItem(tariffs[item.term]))
            navigate(`/admin/edit-dv/${item.id}`);
        }
    }
    return (
        <div className="card">
            <div className="card-header" id={`heading-${item.id}`}>
                <div className="collapsed" data-toggle="collapse" data-target={`#collapse-${item.id}`} aria-expanded="true" aria-controls={`collapse-${item.id}`} onClick={onToggle}>
                    <div className="row">
                        <div className="col id">
                            {item.policy_number}
                        </div>
                        {isDv ? (
                            <div className="col col-3 risk text-right">
                                Пакет
                            </div>
                        ) : (
                            item.form_type === null ? (
                                <div className="col col-3 risk text-right">
                                    {risk}
                                </div>
                            ) : (
                                <div className="col col-3 risk text-right">
                                    {item.limit_amount ? `${formatPrice(item.limit_amount)}₽` : null}
                                </div>
                            )
                        )}

                        <div className="col col-2 date text-center">
                            {item.created_at ? formatDate(item.created_at) : null}
                        </div>
                        <div className="col price">
                            {item.amount ? `${formatPrice(item.amount)}₽` : null}
                        </div>
                        <div className="col col-2 status text-right">
                            <span className={cn({ 'completed': item.status === 3, 'not-completed': item.status === -1 })}>{getStatusName(item.status)}</span>
                        </div>
                        <div className="col col-1">
                            <div className='arrow'>
                                <svg className={cn({ 'active': active })} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25752 8.9225L9.91252 13.5775C10.2384 13.9033 10.7659 13.9033 11.0909 13.5775L15.7459 8.9225C16.2709 8.3975 15.8992 7.5 15.1567 7.5H5.84669C5.10419 7.5 4.73252 8.3975 5.25752 8.9225Z" fill="#E1BA00" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id={`collapse-${item.id}`} className="collapse" aria-labelledby={`heading-${item.id}`}>
                <div className="card-body">
                    <div className="divider"></div>
                    {item.form_type === null ? (
                        <>
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
                            <div className="row">
                                <div className="col-5">
                                    <div className="item">
                                        <div className="sub-heading">E-mail</div>
                                        <div className="heading">{item.email ? item.email : null}</div>
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
                                <div className="col-4">
                                    <div className="item">
                                        <div className="sub-heading">Адрес</div>
                                        <div className="heading">{item.address ? item.address : null}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col-5">
                                    <div className="item">
                                        <div className="sub-heading">Полис</div>
                                        {item.buy_url && (
                                            <a target={"_blank"} href={item.buy_url}>{item.buy_url}</a>
                                        )}
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="item">
                                        <div className="sub-heading">Счёт на оплату</div>
                                        {item.invoice_url && (
                                            <a target={"_blank"} href={item.invoice_url}>{item.invoice_url}</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {isDv ? (
                                <div className="row">
                                    {item && item.options && item.options.map((coverage, index) => (
                                        <div className={index === 0 ? 'col-5' : index === 1 ? 'col-4' : 'col-3'} key={`options-${index}`} style={{ marginBottom: 10 }}>
                                            <div className="item">
                                                <div className="sub-heading">{RISKS_DESCRIPTIONS[coverage.code]}</div>
                                                {coverage.sum ? `${formatPrice(coverage.sum)}₽` : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <div className="row">
                                <div className="col-5">
                                    <div className="item">
                                        <div className="sub-heading">Стоимость полиса страхования</div>
                                        {item.amount ? `${formatPrice(item.amount)}₽` : null}
                                    </div>
                                </div>
                                {!isDv ? (
                                    <div className="col-4">
                                        <div className="item">
                                            <div className="sub-heading">Сумма страхования</div>
                                            {item.limit_amount ? `${formatPrice(item.limit_amount)}₽` : null}
                                        </div>
                                    </div>
                                ) : null}
                                <div className="col-3">
                                    <div className="item">
                                        <div className="sub-heading">Страхователь</div>
                                        <div className="heading">{item.insurer ? item.insurer : null}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5">
                                    <div className="item">
                                        <div className="sub-heading">Номер телефона</div>
                                        <div className="heading">{item.phone ? item.phone : null}</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="item">
                                        <div className="sub-heading">E-mail</div>
                                        <div className="heading">{item.email ? item.email : null}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col-5">
                                    <div className="item">
                                        <div className="sub-heading">Полис</div>
                                        {item.buy_url && (
                                            <a target={"_blank"} href={item.buy_url}>{item.buy_url}</a>
                                        )}
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="item">
                                        <div className="sub-heading">Счёт на оплату</div>
                                        {item.invoice_url && (
                                            <a target={"_blank"} href={item.invoice_url}>{item.invoice_url}</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="row">
                        <div className="col-6">
                            <div className="item">
                                <div className="sub-heading">Статус оплаты</div>
                                <div className="d-flex">
                                    {item.status !== -1 ? (
                                        <>
                                            <div className={cn('btn', { 'btn-blue': item.status === 3, 'btn-gray-transparent': item.status !== 3 })} onClick={() => {
                                                onStatusChange(3);
                                            }}>
                                                Оплачен
                                            </div>
                                            <div className={cn('btn', { 'btn-blue': item.status === 0, 'btn-gray-transparent': item.status !== 0 })} onClick={() => {
                                                onStatusChange(0);
                                            }}>
                                                Не оплачен
                                            </div>
                                        </>
                                    ) : null}
                                    <div className={cn('btn', { 'btn-blue': item.status === -1, 'btn-gray-transparent': item.status !== -1 })} onClick={() => {
                                        onStatusChange(-1);
                                    }}>
                                        Отменён
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 d-flex justify-content-end align-items-end">
                            {item.form && Object.keys(item.form).length > 0 ? (
                                <button className='btn btn-blue' onClick={toEditMode}>
                                    Редактировать
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
}

export default AccordionItem;