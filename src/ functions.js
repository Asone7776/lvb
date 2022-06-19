export const requiredPattern = {
    value: true,
    message: "Поле обязательно для заполнения"
};
export const emailPattern = {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Введите корректный e-mail'
}
export const formatPrice = (price) => {
    const n = String(price),
        p = n.indexOf('.');

    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m} ` : m
    );
};