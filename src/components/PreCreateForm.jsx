import React from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSelect from './ParentSelect';
import InputRange from './InputRange';
const PreCreateForm = () => {
    const options = [
        { value: '0', label: 'Физическое лицо' },
        { value: '1', label: 'Юридическое лицо' }
    ]
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
                                    <div className="row">
                                        <div className="col-6">
                                            <input type="checkbox" />
                                        </div>
                                        <div className="col-6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
            </form>
        </div>
    );
}

export default PreCreateForm;