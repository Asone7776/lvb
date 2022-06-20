import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { requiredPattern, emailPattern } from "../ functions";
import { successNotify } from "../notifications";

const SignInForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        navigate('/admin');
        successNotify('Вы успешно авторизовались');
    };
    return (
        <div className="sign-in-form">
            <h4>Войти в личный кабинет</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Ваш e-mail</label>
                    <div className="input-group">
                        <input placeholder="Введите e-mail" className="form-control email-form-control" {...register("login", {
                            required: requiredPattern, pattern: emailPattern
                        })} />
                        <div className="input-group-append">
                            <div className="form-control">
                                <button className="btn btn-blue-transparent" type="button">Подтвердить</button>
                            </div>
                        </div>
                    </div>
                    {errors.login && <span className="error-message">{errors.login.message}</span>}
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input placeholder="Введите пароль" className="form-control" type={'password'} {...register("password", {
                        required: requiredPattern
                    })} />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        </div>
    );
}

export default SignInForm;