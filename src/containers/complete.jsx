import { useEffect, useState } from 'react';
import cn from 'classnames';
import { formatPrice } from '../functions';
import { RISKS_DESCRIPTIONS } from '../risk-constants';
import CompleteCard from '../components/CompleteCard';
import InfoItem from '../components/InfoItem';
import { successNotify, failureNotify } from '../notifications';
import { axiosAuth } from '../axios-instances';
import { resetSavedDVPolicy, resetUpdateDVPolicy } from '../redux/slices/policeSlice';
import { useNavigate } from 'react-router-dom';
import { holdPolice } from '../redux/slices/policeSlice';
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from 'react-redux';
const CompletePolice = () => {
    const police = useSelector(state => state.police.savedDvPolicy);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const safe = useSelector(state => state.safe.data);
    const [sendLoading, setSendLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const sendToInsurer = async () => {
        setSendLoading(true);
        try {
            const response = await axiosAuth.get(`third/orders/send/${police.data.order.id}`);
            successNotify(response.data.data);
            setSendLoading(false);
            dispatch(resetSavedDVPolicy());
            navigate('/admin');
        } catch (error) {
            setSendLoading(false);
            // dispatch(resetSavedDVPolicy());
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    const cancelOrder = async () => {
        setCancelLoading(true);
        try {
            const response = await axiosAuth.delete(`third/orders/${police.data.order.id}`);
            successNotify(response.data.data);
            setCancelLoading(false);
        } catch (error) {
            setCancelLoading(false);
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    const editOrder = async () => {
        dispatch(holdPolice(police.data.order));
        navigate(`/admin/edit-dv/${police.data?.order.id}`);
    }
    useEffect(() => {
        if (!police.data || !safe) {
            navigate('/admin');
        }
        return () => {
            dispatch(resetSavedDVPolicy());
            dispatch(resetUpdateDVPolicy());
        }
    }, []);
    return (
        <div className="information complete-block">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="info-top-header">
                            {safe && (
                                <h3 className='default-heading'>{safe.tariffName}</h3>
                            )}
                        </div>
                        <div className="row complete-block">
                            <div className="col-8">
                                <div className="row">
                                    {police && police.data && police.data.order && police.data.order.options.map((item) => (
                                        <div className="col-6 mb-3">
                                            <InfoItem title={RISKS_DESCRIPTIONS[item.code]} subTitle={'Сумма страхования'}
                                                info={`${formatPrice(item.sum)} рублей`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="divider"></div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <InfoItem subTitle='Страхователь' info={police && police.data && police.data.order.insurer} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <InfoItem subTitle='Юридический адрес' info={police && police.data && police.data.order.address} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <InfoItem subTitle='Подписант' info={police && police.data && police.data.order.signer} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <InfoItem subTitle='Площадь объекта страхования, кв. м.' info={police && police.data && police.data.order.form.object_area} />
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="row">
                                    {police && police.data && police.data.order.buy_url ? (
                                        <div className="col-6">
                                            <InfoItem subTitle='Полис страхования' link={police && police.data && police.data.order.buy_url} />
                                        </div>
                                    ) : null}
                                    {police && police.data && police.data.order.invoice_url ? (
                                        <div className="col-6">
                                            <InfoItem subTitle='Счёт на оплату' link={police && police.data && police.data.order.invoice_url} />
                                        </div>
                                    ) : null}
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <button className='btn btn-blue w-100' onClick={editOrder}>
                                            Редактировать
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button onClick={sendToInsurer} style={{ height: '100%' }} className={cn('btn btn-primary w-100', { 'loading': sendLoading })}>
                                            {sendLoading ? (
                                                <Spinner />
                                            ) : 'Отправить страхователю'}
                                        </button>
                                    </div>
                                    <div className="col-6 mt-4">
                                        <button className={cn('btn btn-primary-transparent w-100', { 'loading': cancelLoading })} onClick={cancelOrder} style={{ height: '100%' }}>
                                            {cancelLoading ? (
                                                <Spinner />
                                            ) : 'Отменить'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <CompleteCard data={police && police.data && police.data.order.options} price={police && police.data && police.data.order.amount} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompletePolice;