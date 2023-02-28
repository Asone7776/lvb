import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentCreateSelect from './ParentCreateSelect';
import InfoCardSafeCreate from './InfoCardSafeCreate';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern, minPattern, maxPattern } from '../functions';
import { successNotify, failureNotify } from '../notifications';
import { useDispatch } from 'react-redux';
import { axiosAuth } from '../axios-instances';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveCardSafePolicy } from '../redux/actions/policeActions';
import { resetSavedData } from '../redux/slices/policeSlice';
import CustomCardSafeModal from './CustomCardSafeModal';
const prices = [
    { value: 50000, label: '50 000' },
    { value: 100000, label: '100 000' },
    { value: 200000, label: '200 000' },
    { value: 400000, label: '400 000' },
    { value: 600000, label: '600 000' },
    { value: 800000, label: '800 000' },
];

const CreateCardSafeForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const savedPolicy = useSelector(state => state.police.savedPolicy);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [companyOptions, setCompanyOptions] = useState([
        { value: 'OOO', label: 'OOO' },
        { value: 'AO', label: 'AO' },
        { value: 'IP', label: 'ИП' },
    ]);

    const { control, setValue, watch, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phone: "+7(___)___-__-__",
            legal_type: { value: 'OOO', label: 'OOO' },
            // name:'organization',
            sum: prices[3],
            // email: "asone7776@gmail.com",
            // inn: 3456782324,
            // kpp: 695001001,
        }
    });

    const sumValue = watch("sum");

    useEffect(() => {
        return () => {
            dispatch(resetSavedData());
        }
    }, []);
    useEffect(() => {
        register("sum");
    }, [register]);

    const allFields = watch();
    const prefix = watch(['legal_type']);
    const currentType = prefix && prefix[0] && prefix[0].value;
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
    useEffect(() => {
        if (savedPolicy.data) {
            setIsOpen(true);
        }
    }, [savedPolicy.data]);
    const onSubmit = data => {
        sendData(data);
    };
    const sendData = async (data) => {
        const dataToSend = {
            ...data,
            legal_type: data.legal_type ? data.legal_type.value : null,
            sum: data.sum ? data.sum.value : null
        }
        dispatch(saveCardSafePolicy(dataToSend));
    }

    const savePolice = async (id) => {
        try {
            const response = await axiosAuth.get(`orders/send/${id}`);
            setIsOpen(false);
            successNotify(response.data.data);
            navigate('/admin/cardsafe');
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
                                    <h5>Страховая сумма (рубли)</h5>

                                    <Controller
                                        name="sum"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <ParentCreateSelect
                                                    name="sum"
                                                    options={prices}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                    {/* <InputRangeSteps
                                        withInput={false}
                                        step={'200000'}
                                        suffix={''}
                                        needToFormat={true}
                                        defaultValue={sumValue}
                                        min={400000}
                                        middle={600000}
                                        max={800000}
                                        onChangeValue={(value) => { setValue('sum', value ? value : 400000) }}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div className="card custom-card">
                            <div className="card-body">

                                <div className="row mb-3">
                                    <div className="col-4">
                                        <Controller
                                            name="legal_type"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <ParentCreateSelect
                                                        name="legal_type"
                                                        options={companyOptions}
                                                        {...field}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Наименование организации' {...register('name', {
                                                required: requiredPattern
                                            })} />
                                            {errors.name && <span className="error-message">{errors.name.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='ИНН' {...register('inn', {
                                                required: currentType === "IP" ? false : requiredPattern,
                                                minLength: {
                                                    value: 10,
                                                    message: 'Минимальная длина 10'
                                                },
                                                maxLength: currentType === "IP" ? maxPattern(12) : maxPattern(10)
                                            })} />
                                            {errors.inn && <span className="error-message">{errors.inn.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='КПП' {...register('kpp', {
                                                required: currentType === "IP" ? false : requiredPattern,
                                                minLength: minPattern(9),
                                                maxLength: maxPattern(12)
                                            })} />
                                            {errors.kpp && <span className="error-message">{errors.kpp.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input placeholder='E-mail' className='form-control' type="email" {...register('email', {
                                        required: requiredPattern,
                                        pattern: emailPattern
                                    })} />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
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
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCardSafeCreate data={{ ...allFields, sum: allFields.sum.value }} complete={true} loading={savedPolicy.loading} />
                    </div>
                </div>
            </form>
            <CustomCardSafeModal policeData={savedPolicy.data} modalIsOpen={modalIsOpen} onClose={() => { setIsOpen(false) }} onDelete={(id) => deletePolicy(id)} onSaveClick={(id) => savePolice(id)} />
        </div>
    );
}

export default CreateCardSafeForm;