import CheckIcon from '../components/Icons/CheckIcon';
import CrossIcon from '../components/Icons/CrossIcon';
import { formatPrice } from '../functions';


const TariffCard = ({ tariff, onSelect }) => {
    console.log(tariff);
    const onSelectTariff = () => {
        onSelect(tariff);
    }
    return (
        <div className="card tariff-card">
            <div className="tariff-top">
                <h3>{tariff.tariffName}</h3>
                <div className="divider"></div>
                <div className="risks">
                    <h4>Объекты страхования</h4>
                    <ul>
                        {tariff.risks && tariff.risks.map((risk, index) => (
                            <li className='risk-item' key={`risk-${index}`}>
                                <div className='risk-icon'>
                                    {risk.includes ? <CheckIcon /> : <CrossIcon />}
                                </div>
                                <p>
                                    {risk.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='tariff-bottom'>
                <div className="divider"></div>
                <div className='d-flex justify-content-between'>
                    <div className="price">
                        <h5>Страховая премия</h5>
                        {tariff.premium ? formatPrice(tariff.premium) + ' ₽' : null}
                    </div>
                    <div className="price">
                        <h5>Общая страховая сумма</h5>
                        {tariff.amount ? formatPrice(tariff.amount) + ' ₽' : null}
                    </div>
                </div>
                <button className='btn btn-blue' onClick={onSelectTariff}>
                    Оформить
                </button>
            </div>
        </div>
    );
}

export default TariffCard;