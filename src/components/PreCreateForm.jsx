import React from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSelect from './ParentSelect';
import InputRange from './InputRange';
import CaseItem from './CaseItem';
import { Link } from 'react-router-dom';
const PreCreateForm = () => {
    const options = [
        { value: '0', label: 'Физическое лицо' },
        { value: '1', label: 'Юридическое лицо' }
    ];
    const caseItems = [
        { title: 'Смерть', content: 'Смерть Застрахованного в результате несчастного случая произошедшего в период страхования' },
        { title: 'Инвалидность', content: 'Установление инвалидности 1 или 2 группы в результате несчастного случая произошедшего с Застрахованным в период страхования' },
    ];
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            holder: { value: '0', label: 'Физическое лицо' },
        }
    });

    const onSubmit = data => console.log(data);
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
                                <div className="form-group">
                                    <label>Возраст застрахованного</label>
                                    <InputRange suffix={'лет'} needToFormat={false} defaultValue={28} min={18} max={65} {...register('age')} />
                                </div>
                                <div className="form-group">
                                    <label>Лимит покрытия (рубли)</label>
                                    <InputRange step={'50000'} suffix={''} needToFormat={true} defaultValue={500000} min={150000} max={10000000} {...register('limit')} />
                                </div>
                            </div>
                        </div>
                        <div className="card custom-card mb-0">
                            <div className="card-body">
                                <div className="form-group">
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
                                    <InputRange suffix={'месяцев'} needToFormat={false} defaultValue={24} min={12} max={36} {...register('term')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className='card custom-card-small'>
                            <div className="info-wrapper">
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
                                <Link to={'/admin/create'}>
                                    <button className='btn btn-primary'>
                                        Оформить полис
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <input type="submit" /> */}
            </form>
        </div>
    );
}

export default PreCreateForm;