import React from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSelect from './ParentSelect';
import InfoCard from './InfoCard';
import NumberFormat from 'react-number-format';
const CreateForm = () => {
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
        <div className="pre-form create-form">
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
                                    <input className='form-control' type="text" placeholder='Фамилия' />
                                </div>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Имя' />
                                </div>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Отчество' />
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h5>День рождения</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='День' />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Месяц' />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Год    ' />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5>Номер телефона</h5>
                                    <NumberFormat className={'form-control'} format="+7(###)###-##-##" allowEmptyFormatting mask="_" />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h5>Паспортные данные</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Серия' />
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Номер' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Кем выдан' />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Подразделение' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h5>Дата выдачи пасспорта</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='День' />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Месяц' />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Год    ' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h5>Адрес регистрации</h5>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Город' />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Улица' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Дом' />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Корпус' />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Квартира' />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className='btn btn-primary'>Продолжить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCard complete={true} />
                    </div>
                </div>
                {/* <input type="submit" /> */}
            </form>
        </div>
    );
}

export default CreateForm;