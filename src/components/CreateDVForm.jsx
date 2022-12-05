import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSimpleSelect from './ParentSimpleSelect';
import InfoCardCreateDV from './InfoCardCreateDV';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern, minPattern, maxPattern, prepareOrgName } from '../functions';
import { useNavigate } from 'react-router-dom';
import { savePolicy } from '../redux/actions/policeActions';
import { resetSaveSuccess } from '../redux/slices/policeSlice';
import SearchableSelect from './SearchableSelect';
import DateSelect from './DateSelect';
import { documentTypes } from '../constants';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import QuestionIcon from '../components/Icons/QuestionIcon';
import { useDispatch, useSelector } from 'react-redux';

const allowed = ["BUSINESS_PROTECTION_CONSTRUCTIVE", "BUSINESS_PROTECTION_FINISHING_AND_EQUIPMENT"];


const CreateDVForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const police = useSelector(state => state.police.savedDvPolicy);
    const safe = useSelector(state => state.safe.data);
    // console.log(police);
    // console.log(safe);
    console.log('updated', police);
    const [companyOptions] = useState([
        { value: 'OOO', label: 'OOO' },
        { value: 'PAO', label: 'ПАО' },
        { value: 'AO', label: 'AO' },
        { value: 'IP', label: 'ИП ' }
    ]);

    const [documentTypeOptions] = useState([
        { value: 'Устав', label: 'Устав' },
        { value: 'Доверенность', label: 'Доверенность' },
        { value: 'Свидетельство о государственной регистрации ФЛ в качестве ИП', label: 'Свидетельство о государственной регистрации ФЛ в качестве ИП' },
        { value: 'Лист записи ЕГРИП', label: 'Лист записи ЕГРИП' }
    ]);
    const { control, watch, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: 'test',
            inn: 1234567891,
            kpp: 123456789,
            index: '123',
            ogrn: 1234567891234,
            email: 'test@gmail.com',
            house: 123,
            flat: 1,
            property_name: 'test',
            position: 'Ceo',
            city: 'Moscow',
            object_area: 123,
            floor: 2,
            number_of_floors: 5,
            signer: 'Test signer',
            street:'test',
            // phone: "+7(___)___-__-__",
            phone: "+7(999)999-99-99",
            legal_type: { value: 'OOO', label: 'OOO' },
            document_type: { value: 'Устав', label: 'Устав' },
            legal_address: null
        }
    });
    useEffect(() => {
        if (!safe) {
            navigate('/admin');
        }
    }, [safe]);
    useEffect(() => {
        if (police.success) {
            dispatch(resetSaveSuccess());
            navigate('/admin/complete');
        }
    }, [police]);
    const prefix = watch(['legal_type']);
    const documentType = watch(['document_type']);
    const full_name = watch(['name']);
    const cardData = watch(['signer', 'legal_address', 'index', 'city', 'street', 'house', 'building', 'flat']);
    const currentType = prefix && prefix[0] && prefix[0].value;

    const onSubmit = (data) => {
        let risks = [];

        if (safe?.coverages) {
            risks = safe.coverages.map((coverage) => {
                return {
                    code: coverage.code,
                    sum: coverage.sum
                }
            });
        };
        const objectToSend = {
            ...data,
            legal_address: data ? data.legal_address.name : null,
            kladr: data ? data.legal_address.kladr_id : null,
            legal_type: data ? data.legal_type.value : null,
            document_type: data ? data.document_type.value : null,
            attorney_date: data ? moment(data.attorney_date).format('DD.MM.Y') : null,
            tariff: safe ? safe.orderNo : 0,
            risks
        };
        if (safe && safe.orderNo === 0) {
            const otherRisks = risks.filter(item => !allowed.includes(item.code));
            const arrayOfSum = risks.filter(item => allowed.includes(item.code)).map(item => item.sum).reduce((prev, next) => {
                return Number(prev) + Number(next);
            });
            objectToSend.risks = [
                {
                    code: "BUSINESS_PROTECTION",
                    sum: arrayOfSum
                },
                ...otherRisks
            ];
            const variants = safe.coverages.filter(item => allowed.includes(item.code)).map((variant, index) => {
                if (variant) {
                    return index + 1;
                } else {
                    return;
                }
            });
            objectToSend.variants = variants;
        }
        dispatch(savePolicy(objectToSend));
    };
    return (

        <div className="pre-form create-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8 small-gutters">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="form-group">
                                    <h4>Страхователь</h4>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-4">
                                        <Controller
                                            name="legal_type"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <ParentSimpleSelect
                                                        options={companyOptions}
                                                        {...field}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Название страхователя' {...register('name', {
                                                required: requiredPattern
                                            })} />
                                            {errors.name && <span className="error-message">{errors.name.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <h4>Реквизиты</h4>
                                <div className="form-group">
                                    <h5>ИНН</h5>
                                    <input className='form-control' type="text" placeholder='ИНН' {...register('inn', {
                                        required: requiredPattern,
                                        minLength: minPattern(10),
                                        maxLength: maxPattern(12),
                                    })} />
                                    {errors.inn && <span className="error-message">{errors.inn.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>КПП</h5>
                                    <input placeholder='КПП' className='form-control' type="text" {...register('kpp', {
                                        required: currentType === "IP" ? false : requiredPattern,
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
                                <div className="form-group">
                                    <h5>ОГРН</h5>
                                    <input placeholder='ОГРН' className='form-control' type="text" {...register('ogrn', {
                                        required: requiredPattern,
                                        minLength: {
                                            value: 13,
                                            message: 'Минимальная длина 13'
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: 'Максимальная длина 15'
                                        }
                                    })} />
                                    {errors.ogrn && <span className="error-message">{errors.ogrn.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>
                                        Юридический адрес страхователя
                                        <a style={{ marginLeft: 10 }} data-tip data-for="jur-address-tooltip">
                                            <QuestionIcon />
                                        </a>
                                        <ReactTooltip id='jur-address-tooltip' place="top" type="dark" effect="float" >
                                            Включает название населённого пункта (это может быть город, область поселок и т.д.)
                                        </ReactTooltip>
                                    </h5>
                                    <Controller
                                        name="legal_address"
                                        control={control}
                                        rules={{ required: requiredPattern }}
                                        render={({ field }) => {
                                            return (
                                                <SearchableSelect
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.legal_address && <span className="error-message">{errors.legal_address.message}</span>}
                                </div>
                                <h4>Контакты</h4>
                                <div className="form-group">
                                    <h5>E-mail клиента</h5>
                                    <input placeholder='E-mail клиента' className='form-control' type="email" {...register('email', {
                                        required: requiredPattern,
                                        pattern: emailPattern
                                    })} />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Телефон клиента</h5>
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
                                <h4>Подписанты</h4>
                                <div className="form-group">
                                    <h5>Подписант должность</h5>
                                    <input placeholder='Должность' className='form-control' type="text" {...register('position', {
                                        required: currentType === 'IP' ? requiredPattern : false
                                    })} />
                                    {errors.position && <span className="error-message">{errors.position.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Подписант ФИО</h5>
                                    <input placeholder='Подписант' className='form-control' type="text" {...register('signer', {
                                        required: requiredPattern
                                    })} />
                                    {errors.signer && <span className="error-message">{errors.signer.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Действует на основании</h5>
                                    <Controller
                                        name="document_type"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <ParentSimpleSelect
                                                    options={documentTypeOptions}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                {documentType && documentType[0]?.value !== documentTypes.DOCUMENT_TYPE_2 ? (
                                    <>
                                        <div className="form-group">
                                            <h5>Дата доверенности</h5>
                                            <Controller
                                                name="attorney_date"
                                                control={control}
                                                rules={{ required: requiredPattern }}
                                                render={({ field }) => {
                                                    return (
                                                        <DateSelect
                                                            {...field}
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                        {errors.attorney_date && <span className="error-message">{errors.attorney_date.message}</span>}
                                    </>
                                )
                                    : null}
                                {documentType && documentType[0]?.value === documentTypes.DOCUMENT_TYPE_1 || documentType[0]?.value === documentTypes.DOCUMENT_TYPE_3 ? (
                                    <>
                                        <div className="form-group">
                                            <h5>Доверенность</h5>
                                            <input placeholder='Доверенность' className='form-control' type="text" {...register('attorney', {
                                                required: requiredPattern
                                            })} />
                                            {errors.attorney && <span className="error-message">{errors.attorney.message}</span>}
                                        </div>
                                    </>
                                )
                                    : null}
                                <div className="form-group">
                                    <h5>
                                        Название недвижимости
                                        <a style={{ marginLeft: 10 }} data-tip data-for="build-name-tooltip">
                                            <QuestionIcon />
                                        </a>
                                        <ReactTooltip id='build-name-tooltip' place="top" type="dark" effect="float" >
                                            («Офис, магазин, салон красоты, детский сад»)
                                        </ReactTooltip>
                                    </h5>
                                    <input className='form-control' type="text" placeholder='Название недвижимости' {...register('property_name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.property_name && <span className="error-message">{errors.property_name.message}</span>}
                                </div>
                                <h4>Адрес объекта страхования</h4>
                                <div className="form-group">
                                    <h5>Индекс</h5>
                                    <input placeholder='Индекс' className='form-control' type="text" {...register('index', {
                                        required: requiredPattern
                                    })} />
                                    {errors.index && <span className="error-message">{errors.index.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Город</h5>
                                    <input placeholder='Город' className='form-control' type="text" {...register('city', {
                                        required: requiredPattern
                                    })} />
                                    {errors.city && <span className="error-message">{errors.city.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Улица</h5>
                                    <input placeholder='Улица' className='form-control' type="text" {...register('street', {
                                        required: requiredPattern
                                    })} />
                                    {errors.street && <span className="error-message">{errors.street.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Дом</h5>
                                    <input placeholder='Дом' className='form-control' type="text" {...register('house', {
                                        required: false
                                    })} />
                                    {errors.house && <span className="error-message">{errors.house.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Корпус</h5>
                                    <input placeholder='Корпус' className='form-control' type="text" {...register('building', {
                                        required: false
                                    })} />
                                    {errors.building && <span className="error-message">{errors.building.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Номер офиса</h5>
                                    <input placeholder='Номер офиса' className='form-control' type="text" {...register('flat', {
                                        required: false
                                    })} />
                                    {errors.flat && <span className="error-message">{errors.flat.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Этаж</h5>
                                    <input placeholder='Этаж' className='form-control' type="number" {...register('floor', {
                                        required: requiredPattern
                                    })} />
                                    {errors.floor && <span className="error-message">{errors.floor.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Количество этажей в здании</h5>
                                    <input placeholder='Количество этажей' className='form-control' type="number" {...register('number_of_floors', {
                                        required: requiredPattern
                                    })} />
                                    {errors.number_of_floors && <span className="error-message">{errors.number_of_floors.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Площадь объекта страхования, кв. м.</h5>
                                    <input placeholder='Площадь объекта страхования, кв. м.' className='form-control' type="text" {...register('object_area', {
                                        required: requiredPattern
                                    })} />
                                    {errors.object_area && <span className="error-message">{errors.object_area.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCardCreateDV organization_name={prepareOrgName(prefix[0] ? prefix[0].label ? prefix[0].label : '' : '', full_name[0] ? full_name[0] : '')} data={cardData} premium={safe?.premium} loading={police.loading} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateDVForm;