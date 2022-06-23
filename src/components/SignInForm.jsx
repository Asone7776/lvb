import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { requiredPattern, emailPattern } from "../ functions";
import { login } from '../redux/actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import { successNotify } from "../notifications";
const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUser);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "test@gmail.com",
            password: '123456'
        }
    });
    useEffect(() => {
        if (currentUser.data) {
            navigate('/admin');
        }
    }, [currentUser.data]);
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
                        {/* <div className="input-group-append">
                            <div className="form-control">
                                <button className="btn btn-blue-transparent" type="button">Подтвердить</button>
                            </div>
                        </div> */}
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
                <button disabled={currentUser.loading} type="submit" className="btn btn-primary">Войти</button>
            </form>
        </div>
    );
}

export default SignInForm;