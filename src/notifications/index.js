import IziToast from "izitoast";

export const successNotify = (text = "OK") => {
    IziToast.success({
        message: text,
        timeout: 3000
    });
};
export const failureNotify = (text = "Error") => {
    IziToast.error({
        message: text,
        timeout: 3000
    });
};
