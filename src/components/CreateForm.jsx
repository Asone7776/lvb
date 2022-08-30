import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSelect from './ParentSelect';
import ParentCreateSelect from './ParentCreateSelect';
import InfoCardCreate from './InfoCardCreate';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern } from '../ functions';
import { successNotify, failureNotify } from '../notifications';
import { useDispatch } from 'react-redux';
import CustomModal from './CustomModal';
import { axiosAuth } from '../axios-instances';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveAccidentPolicy } from '../redux/actions/policeActions';
import moment from 'moment';
const CreateForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const preData = useSelector(state => state.police.preFormData);
    const savedPolicy = useSelector(state => state.police.savedPolicy);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [companyOptions, setCompanyOptions] = useState([
        { value: 'ООО', label: 'ООО' },
        { value: 'ИП', label: 'ИП' },
        { value: 'АО', label: 'АО' },
    ]);

    const options = [
        { value: '0', label: 'Физическое лицо' },
        { value: '1', label: 'Юридическое лицо' }
    ];
    const maleOptions = [
        { value: '1', label: 'Мужской' },
        { value: '2', label: 'Женский' }
    ];
    const { control, setValue, watch, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            holder: { value: '0', label: 'Физическое лицо' },
            male: { value: '1', label: 'Мужской' },
            phone: "+7(___)___-__-__",
            credit_name: 'Банк Левобережный (ПАО) г.Новосибирск, Кирова, 48',
            organization_prefix: { value: 'ООО', label: 'ООО' },

            surname: "Surname",
            first_name: "Нейм",
            second_name: "Second",
            birthday_year: 2000,
            birthday_month: 12,
            birthday_day: 1,
            passport_series: "7711",
            passport_number: "123123",
            passport_whom: "Whom",
            passport_subvision_code: "123",
            passport_year: 2001,
            passport_month: 12,
            passport_day: 10,
            city: "Moscow",
            street: "Street",
            house: 124,
            flat: 3,
            index: "100500",
            second_city: "Novosibirsk",
            second_street: "Street 2",
            second_house: 24,
            second_flat: 1,
            second_index: "100500",
            phone: "+7 594 123 12 12",
            email: "chemistry1026@ya.ru",
            credit_name: "Bank bank",
            credit_number: 12345,
            credit_year: 2000,
            credit_month: 12,
            credit_day: 10,
            organization_name: "OOO Organization Name",
            inn: 3456782324,
            kpp: 695001001,
            ogrn: 1234567890123
        }
    });

    useEffect(() => {
        if (preData) {
            if(preData.holder){
                setValue('holder', preData.holder);
            }
        }else{
            navigate('/admin');
        }
    }, []);

    const allFields = watch();
    const savedFields = watch(['holder', 'email']);
    const prefix = watch(['organization_prefix']);
    const birthday = watch(['birthday_day', 'birthday_month', 'birthday_year']);
    useEffect(() => {
        let term = preData ? preData.term : 12;
        let currentDate = moment();
        let birthDate = moment(`${birthday[2]}-${birthday[1]}-${birthday[0]}`);
        let difference = currentDate.diff(birthDate, 'years') + +(term / 12).toFixed(2);
        if (!difference || typeof difference === NaN) return;
        if (difference >= 65) {
            failureNotify('Возраст страхователя должен быть меньше 65');
        }
    }, [birthday]);
    useEffect(() => {
        if (prefix[0] && prefix[0].__isNew__) {
            setCompanyOptions((prevState) => {
                let array = [
                    ...prevState,
                    prefix[0]
                ];
                return array.filter((v, i, a) => a.indexOf(v) === i);
            })
        }
    }, [prefix[0]]);
    useEffect(()=>{
        if(savedPolicy.data){
            setIsOpen(true);
        }
    },[savedPolicy.data]);
    const onSubmit = data => {
        const objectToSend = {
            ...data,
            limit: preData ? preData.limit : null,
            'case-0': preData ? preData['case-0'] : null,
            'case-1': preData ? preData['case-1'] : null,
            term: preData ? preData.term : null,
            holder: data.holder.value,
            male: data.male.value,
        };
        if (data.holder.value === '0') {
            delete objectToSend.inn;
            delete objectToSend.kpp;
            delete objectToSend.ogrn;
            delete objectToSend.organization_name;
            delete objectToSend.second_city;
            delete objectToSend.second_street;
            delete objectToSend.second_house;
            delete objectToSend.second_building;
            delete objectToSend.second_flat;
            delete objectToSend.second_index;
        } else {
            if (data.organization_name && data.organization_prefix) {
                objectToSend.organization_name = `${data.organization_prefix.value} ${data.organization_name}`;
            }
        }
        delete objectToSend.organization_prefix;
        sendData(objectToSend);
    };
    const sendData = async (data) => {
        dispatch(saveAccidentPolicy({
            ...data,
            limit: preData ? preData.limit : null,
            'case-0': preData ? preData['case-0'] : null,
            'case-1': preData ? preData['case-1'] : null,
            holder: savedFields[0] ? savedFields[0] : null,
            email: savedFields[1] ? savedFields[1] : null,
        }));
    }

    const savePolice = async (id) => {
        try {
            const response = await axiosAuth.get(`orders/send/${id}`);
            setIsOpen(false);
            successNotify(response.data.data);
            navigate('/admin');
        } catch (error) {
            setIsOpen(false);
            if (error.response.data) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    const deletePolicy = async (id) => {
        try {
            const response = await axiosAuth.delete(`orders/${id}`);
            setIsOpen(false);
            successNotify(response.data.data);
        } catch (error) {
            setIsOpen(false);
            if (error.response.data) {
                failureNotify(error.response.data.errors);
            }
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
                                    <>
                                        <div className="row mb-3">
                                            <div className="col-4">
                                                <Controller
                                                    name="organization_prefix"
                                                    control={control}
                                                    render={({ field }) => {
                                                        return (
                                                            <ParentCreateSelect
                                                                name="organization_prefix"
                                                                options={companyOptions}
                                                                {...field}
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="col-8">
                                                <div className="form-group">
                                                    <input className='form-control' type="text" placeholder='Наименование организации' {...register('organization_name', {
                                                        required: requiredPattern
                                                    })} />
                                                    {errors.organization_name && <span className="error-message">{errors.organization_name.message}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-4">
                                                <div className="form-group">
                                                    <input className='form-control' type="text" placeholder='ИНН' {...register('inn', {
                                                        required: requiredPattern,
                                                        minLength: {
                                                            value: 10,
                                                            message: 'Минимальная длина 10'
                                                        },
                                                        maxLength: {
                                                            value: 10,
                                                            message: 'Максимальная длина 10'
                                                        }
                                                    })} />
                                                    {errors.inn && <span className="error-message">{errors.inn.message}</span>}
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group">
                                                    <input className='form-control' type="text" placeholder='КПП' {...register('kpp', {
                                                        required: requiredPattern,
                                                        minLength: {
                                                            value: 9,
                                                            message: 'Минимальная длина 9'
                                                        },
                                                        maxLength: {
                                                            value: 9,
                                                            message: 'Максимальная длина 9'
                                                        }
                                                    })} />
                                                    {errors.kpp && <span className="error-message">{errors.kpp.message}</span>}
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group">
                                                    <input className='form-control' type="text" placeholder='ОГРН' {...register('ogrn', {
                                                        required: requiredPattern,
                                                        minLength: {
                                                            value: 13,
                                                            message: 'Минимальная длина 13'
                                                        },
                                                        maxLength: {
                                                            value: 13,
                                                            message: 'Максимальная длина 13'
                                                        }
                                                    })} />
                                                    {errors.ogrn && <span className="error-message">{errors.ogrn.message}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {allFields.holder.value === "1" && (
                                    <>
                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <h5>Адрес</h5>
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
                                                        required: false
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
                                        </div>
                                    </>
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
                                            <input className='form-control' min={1} max={31} type="number" placeholder='День'  {...register('birthday_day', {
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
                                            <input className='form-control' min={1} max={12} type="number" placeholder='Месяц'  {...register('birthday_month', {
                                                valueAsNumber: true,
                                                required: requiredPattern,
                                                min: {
                                                    value: 1,
                                                    message: "Минимальный месяц 1"
                                                },
                                                max: {
                                                    value: 12,
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
                                                validate: {
                                                    positive: value => new Date().getFullYear() - value >= 18 || 'Возраст должен быть больше 18',
                                                    lessThan: value => (new Date().getFullYear() - value) + +(preData.term / 12).toFixed(2) <= 65 || 'Возраст должен быть меньше 65',
                                                }
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
                                        <h5>Дата выдачи паспорта</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' min={1} max={31} type="number" placeholder='День' {...register('passport_day', {
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
                                            <input className='form-control' min={1} max={12} type="number" placeholder='Месяц' {...register('passport_month', {
                                                valueAsNumber: true,
                                                required: requiredPattern,
                                                min: {
                                                    value: 1,
                                                    message: "Минимальный месяц 1"
                                                },
                                                max: {
                                                    value: 12,
                                                    message: "Максимальный месяц 12"
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
                                                required: false
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
                                <div className="row">
                                    <div className="col-12">
                                        <h4>Дата выдачи кредита</h4>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' min={1} max={31} type="number" placeholder='День' {...register('credit_day', {
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
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' min={1} max={12} type="number" placeholder='Месяц' {...register('credit_month', {
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
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' min={1} type="number" placeholder='Год' {...register('credit_year', {
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCardCreate holder={savedFields[0]} data={preData} complete={true} loading={savedPolicy.loading} />
                    </div>
                </div>
            </form>
            <CustomModal policeData={savedPolicy.data} modalIsOpen={modalIsOpen} onClose={() => { setIsOpen(false) }} onDelete={(id) => deletePolicy(id)} onSaveClick={(id) => savePolice(id)} />
        </div>
    );
}

export default CreateForm;