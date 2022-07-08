import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSelect from './ParentSelect';
import InputRange from './InputRange';
import CaseItem from './CaseItem';
import InfoCard from './InfoCard';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { resetCalculatePolicy } from '../redux/slices/policeSlice';
import { calculatePolicy } from '../redux/actions/policeActions';
const PreCreateForm = () => {
    const dispatch = useDispatch();
    const calculatePolicyData = useSelector((state) => state.police.calculatePolicy);
    const options = [
        { value: '0', label: 'Физическое лицо' },
        { value: '1', label: 'Юридическое лицо' }
    ];
    const caseItems = [
        { title: 'Смерть', content: 'Смерть Застрахованного в результате несчастного случая произошедшего в период страхования' },
        { title: 'Инвалидность', content: 'Установление инвалидности 1 или 2 группы в результате несчастного случая произошедшего с Застрахованным в период страхования' },
    ];
    const { setValue, control, watch, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            holder: { value: '0', label: 'Физическое лицо' },
            "case-0": true,
            "case-1": true,
            limit: 500000,
            term: 12,
            limit: 500000,
        }
    });
    const allFields = watch();
    const limitValue = watch("limit");
    const termValue = watch("term");
    
    useEffect(() => {
        register("limit");
        register("term");
    }, [register]);

    useEffect(() => {
        return () => {
            dispatch(resetCalculatePolicy());
        }
    }, []);
    const onSubmit = data => {
        sendData(data);
    };
    const cases = watch(['case-0', 'case-1']);
    const sendData = async (data) => {
        Cookies.set('pre-data', JSON.stringify(data));
        let objectToSend = {
            ...data,
            holder: data.holder ? data.holder.value : 0
        };
        dispatch(calculatePolicy(objectToSend));
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
                                <div className="form-group">
                                    <label>Лимит покрытия (рубли)</label>
                                    <InputRange
                                        withInput={true}
                                        step={'50000'}
                                        suffix={''}
                                        needToFormat={true}
                                        defaultValue={limitValue}
                                        min={150000}
                                        max={10000000}
                                        onChangeValue={(value) => { setValue('limit', value ? value : 150000) }}
                                    />
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
                                                <CaseItem cases={cases} item={item} {...register('case-' + index)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Срок страхования</label>
                                    <InputRange
                                        suffix={'месяцев'}
                                        needToFormat={false}
                                        defaultValue={12}
                                        min={1}
                                        max={36}
                                        onChangeValue={(value) => { setValue('term', value) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCard success={!!calculatePolicyData.data} allFields={allFields} complete={true} loading={calculatePolicyData.loading} price={calculatePolicyData.data} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PreCreateForm;