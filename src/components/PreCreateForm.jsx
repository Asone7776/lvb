import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSelect from './ParentSelect';
import InputRange from './InputRange';
import CaseItem from './CaseItem';
import InfoCard from './InfoCard';
import axios from 'axios';
import { successNotify } from '../notifications';
import Cookies from 'js-cookie'
const PreCreateForm = () => {
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);
    const [success, setSuccess] = useState(false);
    const options = [
        { value: '0', label: 'Физическое лицо' },
        { value: '1', label: 'Юридическое лицо' }
    ];
    const caseItems = [
        { title: 'Смерть', content: 'Смерть Застрахованного в результате несчастного случая произошедшего в период страхования' },
        { title: 'Инвалидность', content: 'Установление инвалидности 1 или 2 группы в результате несчастного случая произошедшего с Застрахованным в период страхования' },
    ];
    const { control, watch, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            holder: { value: '0', label: 'Физическое лицо' },
            "case-0": true,
            limit: 500000,
            term: 12
        }
    });

    const onSubmit = data => {
        sendData(data);
    };
    const allFields = watch();
    const sendData = async (data) => {
        Cookies.set('pre-data', JSON.stringify(data));
        let objectToSend = {
            ...data,
            holder: data.holder ? data.holder.value : 0
        };
        setLoading(true);
        try {
            const response = await axios.post('https://vsk-trust.ru/api/calculate_policy_lb', objectToSend);
            setSuccess(true);
            setPrice(response.data.data);
            setLoading(false);
            successNotify('Успешно');

        } catch (error) {
            setLoading(false);
            setSuccess(false);
            console.log(error);
        }
    }
    return (
        <div className="pre-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="form-group">
                                    <h4>Страхователь</h4>
                                    <Controller
                                        name="holder"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <ParentSelect
                                                    name="holder"
                                                    options={options}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                {/* <div className="form-group">
                                    <h4>Email</h4>
                                    <input placeholder='Введите email' className='form-control' type="email" {...register('email', {
                                        required: requiredPattern
                                    })} />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                                </div> */}
                                {/* <div className="form-group">
                                    <label>Возраст застрахованного</label>
                                    <InputRange suffix={'лет'} needToFormat={false} defaultValue={28} min={18} max={65} {...register('age')} />
                                </div> */}
                                <div className="form-group">
                                    <label>Лимит покрытия (рубли)</label>
                                    <InputRange step={'50000'} suffix={''} needToFormat={true} defaultValue={500000} min={150000} max={10000000} {...register('limit')} />
                                </div>
                            </div>
                        </div>
                        <div className="card custom-card mb-0">
                            <div className="card-body">
                                <div className="form-group small-gutters">
                                    <h4>Страховые риски</h4>
                                    <div className="row d-flex">
                                        {caseItems && caseItems.map((item, index) => (
                                            <div className="col-6" key={index}>
                                                <CaseItem item={item} {...register('case-' + index)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Срок страхования</label>
                                    <InputRange suffix={'месяцев'} needToFormat={false} defaultValue={12} min={1} max={36} {...register('term')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCard success={success} allFields={allFields} complete={false} loading={loading} price={price} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PreCreateForm;