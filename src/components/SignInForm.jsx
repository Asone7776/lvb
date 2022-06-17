import React from "react";
import { useForm } from "react-hook-form";

const SignInForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className="sign-in-form">
            <h4>Войти в личный кабинет</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Логин</label>
                <input {...register("login", { required: true })} />
                {errors.login && <span>This field is required</span>}
                {/* include validation with required or other standard HTML validation rules */}
                <input type={'password'} {...register("password", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.password && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    );
}

export default SignInForm;