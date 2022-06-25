import moment from "moment";
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


export function openBase64NewTab(base64Pdf) {
    var blob = base64toBlob(base64Pdf);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
    } else {
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_self');
    }
}

function base64toBlob(base64Data) {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: "application/pdf" });
}

export const formatDate = date => {
    let modifiedDate = moment(date).format('DD.MM.yyyy HH:mm');
    return modifiedDate;
}

export const debounce = (func, wait, immediate) => {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

export const withDebounce = debounce((action) => {
    action();
}, 300, false);

export const getStatusName = (id) => {
    let statusName = '';
    switch (id) {
        case -1:
            statusName = 'Отменено';
            break;
        case 0:
            statusName = 'Не оплачено';
        case 2:
            statusName = 'Подтверждено'
        case 3:
            statusName = 'Оплачено'
        default:
            statusName = 'Сохранено'
    }
    return statusName;
}