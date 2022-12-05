import InvalidIcon from './components/Icons/InvalidIcon'
import CardHolderIcon from './components/Icons/CardHolderIcon'
import ProtectionIcon from './components/Icons/ProtectionIcon'
import { RISK_CONSTANTS, TARIFF_NAMES, RISKS_DESCRIPTIONS } from "./risk-constants";
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
        link: '/admin/accident',
        external: false,
    },
    {
        icon: CardHolderIcon,
        subTitle: 'Полис страхования',
        title: 'Карточный сейф',
        content: 'Страхование банковских карт',
        link: '/admin/cardsafe',
        external: false,
    },
    {
        icon: ProtectionIcon,
        subTitle: 'Полис страхования',
        title: 'Защита бизнеса<br/>Пакеты',
        content: 'Комплексное страхование имущества ЮЛ. Коробочные решения',
        secondContent: 'Коробочные решения',
        link: 'https://vskcorp.ru/shield',
        external: true,
    },
    // {
    //     orderNo: 0,
    //     icon: ProtectionIcon,
    //     subTitle: 'Защита бизнеса',
    //     title: 'Страхование имущества в залоге',
    //     link: '/admin/calculate',
    //     external: false,
    // },
    {
        icon: ProtectionIcon,
        subTitle: 'Полис страхования',
        title: 'Защита бизнеса Стандарт',
        content: 'Комплексное страхование имущества ЮЛ Индивидуальный расчет',
        link: '/admin/packages',
        external: false,
    },
];
export const dashboardPathNames = [
    '/admin',
    '/admin/products',
];


export const tariffs = [
    {
        tariffName: TARIFF_NAMES.PLEDGE_TARIFF.name,
        programCode: TARIFF_NAMES.PLEDGE_TARIFF.code,
        orderNo: 0,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_CONSTRUCTIVE,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION_CONSTRUCTIVE,
                required: false,
                sum: 10000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_FINISHING_AND_EQUIPMENT,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION_FINISHING_AND_EQUIPMENT,
                required: false,
                sum: 5000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: false,
                sum: 5000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: false,
                sum: 3000000,
                asSlider: true
            }
        ]
    },
    {
        tariffName: TARIFF_NAMES.BOX_1.name,
        programCode: TARIFF_NAMES.BOX_1.code,
        orderNo: 1,
        premium: TARIFF_NAMES.BOX_1.premium,
        amount: TARIFF_NAMES.BOX_1.amount,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                sum: 5000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 500000,
                asSlider: false
            }
        ],
        risks: [
            {
                name: 'Конструктивные элементы',
                price: '250 000 руб',
                includes: true
            },
            {
                name: 'Внутренняя отделка, инженерное оборудование',
                price: '275 000 руб',
                includes: true
            },
            {
                name: 'Движимое имущество (торговое / офисное оборудование, оргтехника, мебель)',
                price: '275 000 руб',
                includes: true
            },
        ]
    },
    {
        tariffName: TARIFF_NAMES.BOX_2.name,
        programCode: TARIFF_NAMES.BOX_2.code,
        orderNo: 2,
        premium: TARIFF_NAMES.BOX_2.premium,
        amount: TARIFF_NAMES.BOX_2.amount,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                sum: 7000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 700000,
                asSlider: false
            }
        ],
        risks: [
            {
                name: 'Конструктивные элементы',
                price: '400 000 руб',
                includes: true
            },
            {
                name: 'Внутренняя отделка, инженерное оборудование',
                price: '575 000 руб',
                includes: true
            },
            {
                name: 'Движимое имущество (торговое / офисное оборудование, оргтехника, мебель)',
                price: '575 000 руб',
                includes: true
            },
        ]
    },
    {
        tariffName: TARIFF_NAMES.BOX_3.name,
        programCode: TARIFF_NAMES.BOX_3.code,
        orderNo: 3,
        premium: TARIFF_NAMES.BOX_3.premium,
        amount: TARIFF_NAMES.BOX_3.amount,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                sum: 10000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.INTERRUPTION_DESC,
                code: RISK_CONSTANTS.INTERRUPTION,
                required: true,
                sum: 100000,
                asSlider: false
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 1000000,
                asSlider: false
            }
        ],
        risks: [
            {
                name: 'Конструктивные элементы',
                price: '500 000 руб',
                includes: true
            },
            {
                name: 'Внутренняя отделка, инженерное оборудование',
                price: '1 000 000 руб',
                includes: true
            },
            {
                name: 'Движимое имущество (торговое / офисное оборудование, оргтехника, мебель)',
                price: '1 000 000 руб',
                includes: true
            },
        ]
    },
    {
        tariffName: TARIFF_NAMES.BOX_4.name,
        programCode: TARIFF_NAMES.BOX_4.code,
        orderNo: 4,
        premium: TARIFF_NAMES.BOX_4.premium,
        amount: TARIFF_NAMES.BOX_4.amount,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                sum: 10000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.INTERRUPTION_DESC,
                code: RISK_CONSTANTS.INTERRUPTION,
                required: true,
                sum: 100000,
                asSlider: false
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 1000000,
                asSlider: false
            }
        ],
        risks: [
            {
                name: 'Конструктивные элементы',
                price: '1 000 000 руб',
                includes: true
            },
            {
                name: 'Внутренняя отделка, инженерное оборудование',
                price: '1 250 000 руб',
                includes: true
            },
            {
                name: 'Движимое имущество (торговое / офисное оборудование, оргтехника, мебель)',
                price: '1 250 000 руб',
                includes: true
            },
        ]
    }
];

export const documentTypes = {
    DOCUMENT_TYPE_1: 'Доверенность',
    DOCUMENT_TYPE_2: 'Устав',
    DOCUMENT_TYPE_3: 'Свидетельство о государственной регистрации ФЛ в качестве ИП',
    DOCUMENT_TYPE_4: 'Лист записи ЕГРИП'
}