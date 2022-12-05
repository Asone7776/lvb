import cn from "classnames";
import { formatPrice } from "../functions";
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';
import { RISKS_DESCRIPTIONS } from '../risk-constants';


const CoveragesCard = ({ loading, data, disabledValues, price, onProceed }) => {
    let customData = data ? Object.entries(data) : [];

    return (
        <div className='card custom-card-small'>
            <div className={'info-wrapper'}>
                {customData.map(([key, value], index) => (
                    disabledValues && disabledValues[index] && (
                        <div key={`info-block-${index}`}>
                            <div className="info-block">
                                <span>{RISKS_DESCRIPTIONS[key]}</span>
                                <span className="gray-heading">Сумма страхования</span>
                                <h4>{`${formatPrice(value)} ₽`}</h4>
                            </div>
                            <div className="divider"></div>
                        </div>
                    )
                ))}
                <div className="info-block">
                    <span className="mb-0">Стоимость полиса</span>
                    <h4 className="pre-price">{price ? formatPrice(price) : 0} ₽</h4>
                </div>
                <div>
                    <button type="submit" disabled={loading} className={cn('btn btn-primary', { 'loading': loading })}>
                        {loading ? (
                            <Spinner />
                        ) : 'Рассчитать'}
                    </button>
                    {price ? (
                        <button onClick={onProceed} className="btn btn-primary mb-3 ml-0">
                            Оформить
                        </button>
                    ) : null}
                    <Link to={'/admin'}>
                        <button className="btn btn-primary-transparent ml-0">
                            Отменить
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CoveragesCard;