import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSimpleSelect from './ParentSimpleSelect';
import InfoCardCreateDV from './InfoCardCreateDV';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern } from '../functions';
import { useNavigate } from 'react-router-dom';
import { prepareOrgName } from '../functions';
import { updatePolicy } from '../redux/actions/policeActions';
import { resetUpdateDVPolicy } from '../redux/slices/policeSlice';
import SearchableSelect from './SearchableSelect';
import DateSelect from './DateSelect';
import { documentTypes } from '../constants';
import moment from 'moment';
import { parse } from 'date-fns';
import ReactTooltip from 'react-tooltip';
import QuestionIcon from '../components/Icons/QuestionIcon';
import { useSelector, useDispatch } from 'react-redux';
const allowed = ["BUSINESS_PROTECTION_CONSTRUCTIVE", "BUSINESS_PROTECTION_FINISHING_AND_EQUIPMENT"];
const EditDVForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const police = useSelector(state => state.police.updatedDvPolicy);
    const editFormData = useSelector(state => state.police.holdedPolice);
    const safe = useSelector(state => state.safe.data);
    console.log('safe', safe);
    // console.log('safe', editFormData);
    console.log('updated too', police);
    const [documentTypeOptions] = useState([
        { value: 'Устав', label: 'Устав' },
        { value: 'Доверенность', label: 'Доверенность' },
        { value: 'Свидетельство о государственной регистрации ФЛ в качестве ИП', label: 'ИП' },
        { value: 'Лист записи ЕГРИП', label: 'Лист записи ЕГРИП' }
    ]);
    const { getValues, control, watch, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: editFormData.form.name,
            inn: editFormData.form.inn,
            kpp: editFormData.kpp,
            index: editFormData.form.index,
            ogrn: editFormData.form.ogrn,
            email: editFormData.email,
            house: editFormData.form.house,
            flat: editFormData.form.flat,
            property_name: editFormData.form.property_name,
            position: editFormData.form.position,
            city: editFormData.form.city,
            street: editFormData.form.street,
            object_area: editFormData.form.object_area,
            floor: editFormData.form.floor,
            number_of_floors: editFormData.form.number_of_floors,
            signer: editFormData.form.signer,
            phone: editFormData.form.phone,
            building: editFormData.form.building,
            document_type: { value: editFormData.form.document_type, label: editFormData.form.document_type },
            legal_address: {
                name: editFormData.form.legal_address,
                value: editFormData.form.kladr,
            },
            legal_type: editFormData.form.legal_type,
            attorney: editFormData.form.attorney,
            attorney_date: editFormData.form.attorney_date ? parse(editFormData.form.attorney_date, "dd.MM.yyyy", new Date()) : null,
            // attorney_date: editFormData.form.attorney_date ? editFormData.form.attorney_date : null,
            // premium: safe ? safe.premium : undefined
        }
    });
    useEffect(() => {
        if (!safe) {
            navigate('/admin');
        }
    }, [safe]);
    useEffect(() => {
        if (police.success) {
            dispatch(resetUpdateDVPolicy());
            navigate('/admin/complete');
        }
    }, [police]);
    const prefix = watch(['legal_type']);
    const documentType = watch(['document_type']);
    const full_name = watch(['name']);
    const cardData = watch(['signer', 'legal_address', 'index', 'city', 'street', 'house', 'building', 'flat']);
    const currentLegalType = getValues('legal_type');
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
            id: editFormData && editFormData.id,
            legal_address: data ? data.legal_address.name : null,
            kladr: data ? data.legal_address.kladr_id : null,
            legal_type: editFormData ? editFormData.form && editFormData.form.legal_type : null,
            document_type: data ? data.document_type && data.document_type.value : null,
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
        dispatch(updatePolicy(objectToSend));
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
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Название страхователя' {...register('name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                                </div>
                                <h4>Реквизиты</h4>
                                <div className="form-group">
                                    <h5>ИНН</h5>
                                    <input className='form-control' type="text" placeholder='ИНН' {...register('inn', {
                                        required: requiredPattern,
                                        minLength: {
                                            value: 10,
                                            message: 'Минимальная длина 10'
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: 'Максимальная длина 12'
                                        }
                                    })} />
                                    {errors.inn && <span className="error-message">{errors.inn.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>КПП</h5>
                                    <input placeholder='КПП' className='form-control' type="text" {...register('kpp', {
                                        required: currentLegalType === 'IP' ? false : requiredPattern,
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
                                        <a data-tip data-for="jur-address-tooltip">Юридический адрес</a>
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
                                <h4>Подписант</h4>
                                <div className="form-group">
                                    <h5>Подписант ФИО</h5>
                                    <input placeholder='Подписант' className='form-control' type="text" {...register('signer', {
                                        required: requiredPattern
                                    })} />
                                    {errors.signer && <span className="error-message">{errors.signer.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Подписант должность</h5>
                                    <input placeholder='Должность' className='form-control' type="text" {...register('position', {
                                        required: currentLegalType === 'IP' ? requiredPattern : false
                                    })} />
                                    {errors.position && <span className="error-message">{errors.position.message}</span>}
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
                                        <a data-tip data-for="build-name-tooltip" style={{ marginLeft: 10 }}><QuestionIcon /></a>
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
                        <InfoCardCreateDV submitTitle='Обновить полис' organization_name={prepareOrgName('', full_name[0] ? full_name[0] : '')} data={cardData} premium={editFormData && editFormData.amount ? Number(editFormData.amount) : undefined} loading={police.loading} />
                    </div>
                </div>
            </form >
        </div >
    );
}

export default EditDVForm;