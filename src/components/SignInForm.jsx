import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { requiredPattern, emailPattern } from "../functions";
import { login } from '../redux/actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import cn from 'classnames';
import Spinner from "./Spinner";

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUser);
    const { register, handleSubmit, formState: { errors } } = useForm({});
    useEffect(() => {
        if (currentUser.success || Cookies.get('token')) {
            navigate('/admin');
        }
    }, [currentUser.success]);
    const onSubmit = data => {
        dispatch(login(data));
    };
    return (
        <div className="sign-in-form">
            <h4>Войти в личный кабинет</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Ваш e-mail</label>
                    <div className="input-group">
                        <input placeholder="Введите e-mail" className="form-control email-form-control" {...register("email", {
                            required: requiredPattern, pattern: emailPattern
                        })} />
                    </div>
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input placeholder="Введите пароль" className="form-control" type={'password'} {...register("password", {
                        required: requiredPattern
                    })} />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                <button disabled={currentUser.loading} type="submit" className={cn('btn btn-primary', { 'loading': true })}>
                    {currentUser.loading ? (
                        <Spinner />
                    ) : 'Войти'}
                </button>
            </form>
        </div>
    );
}

export default SignInForm;