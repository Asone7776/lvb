import { formatPrice } from "../functions";
import InfoItem from '../components/InfoItem';
import { RISKS_DESCRIPTIONS } from '../risk-constants';

const CompleteCard = ({ data, price }) => {

    return (
        <div className='card custom-card-small complete-card'>
            <div className={'info-wrapper'}>
                {data && data.map(item => (
                    <>
                        <InfoItem title={RISKS_DESCRIPTIONS[item.code]} subTitle={'Страховая премия'}
                            info={`${formatPrice(item.sum)} рублей`}
                        />
                        <div className="divider"></div>
                    </>
                ))}
                <div className="info-block">
                    <span className="mb-0">Стоимость полиса</span>
                    <div className="pre-price mb-0">{price != null ? `${formatPrice(price)} ₽` : ''}</div>
                </div>
            </div>
        </div>
    );
}

export default CompleteCard;