import InvalidIcon from './components/Icons/InvalidIcon'
import CardHolderIcon from './components/Icons/CardHolderIcon'
// import ProtectionIcon from './components/Icons/ProtectionIcon'
export const companiesOptions = [
    { value: 'ООО', label: 'ООО' },
    { value: 'ИП', label: 'ИП' },
    { value: 'АО', label: 'АО' },
];
export const options = [
    { value: '0', label: 'Физическое лицо' },
    { value: '1', label: 'Юридическое лицо' }
];

export const maleOptions = [
    { value: '1', label: 'Мужской' },
    { value: '2', label: 'Женский' }
];

export const InsuranceProducts = [
    {
        icon: InvalidIcon,
        subTitle: 'Полис страхования',
        title: 'Страхование от несчастных случаев',
        content: 'Страхования заемщиков кредитов от несчастных случаев и болезней',
        link: '/admin/accident'
    },
    {
        icon: CardHolderIcon,
        subTitle: 'Полис страхования',
        title: 'Карточный сейф',
        content: 'Страхование банковских карт',
        link: '/admin/cardsafe'
    },
    // {
    //     icon: ProtectionIcon,
    //     subTitle: 'Полис страхования',
    //     title: 'Защита бизнеса Стандарт',
    //     content: 'Комплексное страхование имущества ЮЛ Индивидуальный расчет'
    // },
];
export const dashboardPathNames = [
    '/admin',
    '/admin/products',
];