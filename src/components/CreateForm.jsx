import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSelect from './ParentSelect';
import InfoCardCreate from './InfoCardCreate';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern, openBase64NewTab } from '../ functions';
import axios from 'axios';
import { successNotify, failureNotify } from '../notifications';
import Cookies from 'js-cookie';
const CreateForm = () => {
    const [loading, setLoading] = useState(false);
    const [parsedData, setParsedData] = useState(null);
    const options = [
        { value: '0', label: 'Физическое лицо' },
        { value: '1', label: 'Юридическое лицо' }
    ];
    const maleOptions = [
        { value: '1', label: 'Мужской' },
        { value: '2', label: 'Женский' }
    ];
    const { control, watch, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            holder: { value: '0', label: 'Физическое лицо' },
            male: { value: '1', label: 'Мужской' },
            phone: "+7(___)___-__-__"
        }
    });

    useEffect(() => {
        let preData = Cookies.get('pre-data');
        if (preData) {
            setParsedData(JSON.parse(preData));
        }
    }, []);
    const allFields = watch();
    const onSubmit = data => {
        const objectToSend = {
            ...data,
            limit: parsedData ? parsedData.limit : null,
            'case-0': parsedData ? parsedData['case-0'] : null,
            'case-1': parsedData ? parsedData['case-1'] : null,
            term: parsedData ? parsedData.term : null,
            holder: data.holder.value,
            male: data.male.value,
        };
        sendData(objectToSend);
    };

    const sendData = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('https://vsk-trust.ru/api/save_policy_lb', data);
            successNotify('Успешно');
            if (data.holder === '0') {
                openUrl(response.data.data);
            } else {
                openPdf(response.data.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response.data) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    const openUrl = (result) => {
        if (result) {
            window.open(result);
        }
    }
    const openPdf = (result) => {
        if (result) {
            openBase64NewTab(result);
        }
    }
    return (
        <div className="pre-form create-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8 small-gutters">
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
                                {allFields.holder.value === "0" ? null : (
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-group">
                                                <input className='form-control' type="text" placeholder='ИНН' {...register('inn', {
                                                    required: requiredPattern,
                                                    maxLength: {
                                                        value: 10,
                                                        message: 'Максимальная длинна 10'
                                                    }
                                                })} />
                                                {errors.inn && <span className="error-message">{errors.inn.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <input className='form-control' type="text" placeholder='КПП' {...register('kpp', {
                                                    required: requiredPattern,
                                                    maxLength: {
                                                        value: 9,
                                                        message: 'Максимальная длинна 9'
                                                    }
                                                })} />
                                                {errors.kpp && <span className="error-message">{errors.kpp.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <input className='form-control' type="text" placeholder='ОРГН' {...register('ogrn', {
                                                    required: requiredPattern,
                                                    maxLength: {
                                                        value: 13,
                                                        message: 'Максимальная длинна 13'
                                                    }
                                                })} />
                                                {errors.ogrn && <span className="error-message">{errors.ogrn.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {allFields.holder.value === "1" && (
                                    <h4>Застрахованный</h4>
                                )}
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Фамилия' {...register('surname', {
                                        required: requiredPattern
                                    })} />
                                    {errors.surname && <span className="error-message">{errors.surname.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Имя' {...register('first_name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.first_name && <span className="error-message">{errors.first_name.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Отчество' {...register('second_name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.second_name && <span className="error-message">{errors.second_name.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input placeholder='E-mail' className='form-control' type="email" {...register('email', {
                                        required: requiredPattern,
                                        pattern: emailPattern
                                    })} />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Пол</h5>
                                    <Controller
                                        name="male"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <ParentSelect
                                                    name="male"
                                                    options={maleOptions}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h5>День рождения</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="number" placeholder='День'  {...register('birthday_day', {
                                                valueAsNumber: true,
                                                required: requiredPattern,
                                                min: {
                                                    value: 1,
                                                    message: "Минимальный день 1"
                                                },
                                                max: {
                                                    value: 31,
                                                    message: "Максимальный день 31"
                                                },
                                            })} />
                                            {errors.birthday_day && <span className="error-message">{errors.birthday_day.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="number" placeholder='Месяц'  {...register('birthday_month', {
                                                valueAsNumber: true,
                                                required: requiredPattern,
                                                min: {
                                                    value: 1,
                                                    message: "Минимальный месяц 1"
                                                },
                                                max: {
                                                    value: 31,
                                                    message: "Максимальный месяц 12"
                                                },
                                            })} />
                                            {errors.birthday_month && <span className="error-message">{errors.birthday_month.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="number" placeholder='Год'  {...register('birthday_year', {
                                                valueAsNumber: true,
                                                required: requiredPattern,
                                                minLength: {
                                                    value: 4,
                                                    message: "Не верный формат"
                                                },
                                                maxLength: {
                                                    value: 4,
                                                    message: "Не верный формат"
                                                },
                                                max: {
                                                    value: new Date().getFullYear(),
                                                    message: `Максимальный год ${new Date().getFullYear()}`
                                                },
                                            })} />
                                            {errors.birthday_year && <span className="error-message">{errors.birthday_year.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5>Номер телефона</h5>
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field: { onChange, name, value } }) => (
                                            <NumberFormat
                                                name={'phone'}
                                                value={value}
                                                onChange={onChange} className={'form-control'} format="+7(###)###-##-##" allowEmptyFormatting mask="_" />
                                        )}
                                    />
                                    {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h5>Паспортные данные</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Серия' {...register('passport_series', {
                                                required: requiredPattern
                                            })} />
                                            {errors.passport_series && <span className="error-message">{errors.passport_series.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Номер' {...register('passport_number', {
                                                required: requiredPattern
                                            })} />
                                            {errors.passport_number && <span className="error-message">{errors.passport_number.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Кем выдан' {...register('passport_whom', {
                                                required: requiredPattern
                                            })} />
                                            {errors.passport_whom && <span className="error-message">{errors.passport_whom.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Подразделение' {...register('passport_subvision_code', {
                                                required: requiredPattern
                                            })} />
                                            {errors.passport_subvision_code && <span className="error-message">{errors.passport_subvision_code.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h5>Дата выдачи пасспорта</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="number" placeholder='День' {...register('passport_day', {
                                                valueAsNumber: true,
                                                required: requiredPattern,
                                                min: {
                                                    value: 1,
                                                    message: "Минимальный день 1"
                                                },
                                                max: {
                                                    value: 31,
                                                    message: "Максимальный день 31"
                                                },
                                            })} />
                                            {errors.passport_day && <span className="error-message">{errors.passport_day.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="number" placeholder='Месяц' {...register('passport_month', {
                                                valueAsNumber: true,
                                                required: requiredPattern,
                                                min: {
                                                    value: 1,
                                                    message: "Минимальный месяц 1"
                                                },
                                                max: {
                                                    value: 31,
                                                    message: "Максимальный месяц 31"
                                                },
                                            })} />
                                            {errors.passport_month && <span className="error-message">{errors.passport_month.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="number" placeholder='Год' {...register('passport_year', {
                                                valueAsNumber: true,
                                                required: requiredPattern,
                                                minLength: {
                                                    value: 4,
                                                    message: "Не верный формат"
                                                },
                                                maxLength: {
                                                    value: 4,
                                                    message: "Не верный формат"
                                                },
                                                max: {
                                                    value: new Date().getFullYear(),
                                                    message: `Максимальный год ${new Date().getFullYear()}`
                                                },
                                            })} />
                                            {errors.passport_year && <span className="error-message">{errors.passport_year.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h5>Адрес регистрации</h5>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Город' {...register('city', {
                                                required: requiredPattern
                                            })} />
                                            {errors.city && <span className="error-message">{errors.city.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Улица' {...register('street', {
                                                required: requiredPattern
                                            })} />
                                            {errors.street && <span className="error-message">{errors.street.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Дом' {...register('house', {
                                                required: requiredPattern
                                            })} />
                                            {errors.house && <span className="error-message">{errors.house.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Корпус' {...register('building', {
                                                required: requiredPattern
                                            })} />
                                            {errors.building && <span className="error-message">{errors.building.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Квартира' {...register('flat', {
                                                required: requiredPattern
                                            })} />
                                            {errors.flat && <span className="error-message">{errors.flat.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Индекс' {...register('index', {
                                                required: requiredPattern
                                            })} />
                                            {errors.index && <span className="error-message">{errors.index.message}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card custom-card">
                            <div className="card-body">
                                <h4>
                                    Выгодоприобретатель 1 очереди
                                </h4>
                                <p>
                                    в части фактической суммы долга на дату страхового случая:
                                </p>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Номер кредитного договора' {...register('credit_number', {
                                        required: requiredPattern
                                    })} />
                                    {errors.credit_number && <span className="error-message">{errors.credit_number.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Кредитное учреждение' {...register('credit_name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.credit_name && <span className="error-message">{errors.credit_name.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input className='form-control' min={1} max={31} type="number" placeholder='День кредита' {...register('credit_day', {
                                        valueAsNumber: true,
                                        required: requiredPattern,
                                        min: {
                                            value: 1,
                                            message: 'Минимальный день 1'
                                        },
                                        max: {
                                            value: 31,
                                            message: 'Максимальный день 31'
                                        },
                                    })} />
                                    {errors.credit_day && <span className="error-message">{errors.credit_day.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input className='form-control' min={1} max={12} type="number" placeholder='Месяц кредита' {...register('credit_month', {
                                        valueAsNumber: true,
                                        required: requiredPattern,
                                        min: {
                                            value: 1,
                                            message: 'Минимальный месяц 1'
                                        },
                                        max: {
                                            value: 12,
                                            message: 'Максимальный месяц 12'
                                        },
                                    })} />
                                    {errors.credit_month && <span className="error-message">{errors.credit_month.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input className='form-control' min={1} type="number" placeholder='Год кредита' {...register('credit_year', {
                                        valueAsNumber: true,
                                        required: requiredPattern,
                                        minLength: {
                                            value: 4,
                                            message: "Не верный формат"
                                        },
                                        maxLength: {
                                            value: 4,
                                            message: "Не верный формат"
                                        },
                                        max: {
                                            value: new Date().getFullYear(),
                                            message: `Максимальный год ${new Date().getFullYear()}`
                                        },
                                    })} />
                                    {errors.credit_year && <span className="error-message">{errors.credit_year.message}</span>}
                                </div>
                                {/* <div className="row mb-3">
                                    <div className="col-12">
                                        <h5>Адрес регистрации</h5>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Город' {...register('second_city', {
                                                required: requiredPattern
                                            })} />
                                            {errors.second_city && <span className="error-message">{errors.second_city.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Улица' {...register('second_street', {
                                                required: requiredPattern
                                            })} />
                                            {errors.second_street && <span className="error-message">{errors.second_street.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-3">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Дом' {...register('second_house', {
                                                required: requiredPattern
                                            })} />
                                            {errors.second_house && <span className="error-message">{errors.second_house.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Корпус' {...register('second_building', {
                                                required: requiredPattern
                                            })} />
                                            {errors.second_building && <span className="error-message">{errors.second_building.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Квартира' {...register('second_flat', {
                                                required: requiredPattern
                                            })} />
                                            {errors.second_flat && <span className="error-message">{errors.second_flat.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Индекс' {...register('second_index', {
                                                required: requiredPattern
                                            })} />
                                            {errors.second_index && <span className="error-message">{errors.second_index.message}</span>}
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCardCreate data={parsedData} complete={true} loading={loading} />
                    </div>
                </div>
                {/* <input type="submit" /> */}
            </form>
        </div>
    );
}

export default CreateForm;