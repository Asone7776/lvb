import { tariffs } from '../constants';
import { useNavigate } from 'react-router-dom';
import TariffCard from '../components/TariffCard';
import { saveItem } from '../redux/slices/safeSlice';
import { useDispatch } from 'react-redux';
import CheckIcon from './Icons/CheckIcon';

const PackagesWrapper = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const saveTariff = (tariff) => {
        dispatch(saveItem(tariff));
        navigate('/admin/create-dv');
    }
    return (
        <div className='today-orders'>
            <div className="row h-100">
                {tariffs.filter((tariff) => tariff.orderNo !== 0).map((tariff, index) => (
                    <div className="col-6" key={`card-${index}`}>
                        <TariffCard tariff={tariff} index={index} onSelect={saveTariff} />
                    </div>
                ))}
                <div className="col-12">
                    <div className="franshize mt-0">
                        <div className="card">
                            <h3>Франшиза</h3>
                            <p>
                                30 000 руб. на конструктивные элементы, отделку, инженерное оборудование<br />
                                10 000 руб. на торговое / офисное оборудование (в т.ч. оргтехника) / мебель
                            </p>
                        </div>
                    </div>
                    <div className="franshize">
                        <div className="card tariff-card">
                            <h3>Риски</h3>
                            <div className='risks'>
                                <div className="row">
                                    <div className="col-4">
                                        <ul>
                                            <li className='risk-item'>
                                                <div className='risk-icon'>
                                                    <CheckIcon />
                                                </div>
                                                <p>
                                                    Падение летательных аппаратов
                                                </p>
                                            </li>
                                            <li className='risk-item'>
                                                <div className='risk-icon'>
                                                    <CheckIcon />
                                                </div>
                                                <p>
                                                    Стихийные бедствия (опасные природные явления)
                                                </p>
                                            </li>
                                            <li className='risk-item'>
                                                <div className='risk-icon'>
                                                    <CheckIcon />
                                                </div>
                                                <p>
                                                    Действие воды (аварии водопроводных, канализационных, отопительных, противопожарных систем)
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-4">
                                        <ul>
                                            <li className='risk-item'>
                                                <div className='risk-icon'>
                                                    <CheckIcon />
                                                </div>
                                                <p>
                                                    Залив – Проникновение воды из соседних (чужих) помещений)
                                                </p>
                                            </li>
                                            <li className='risk-item'>
                                                <div className='risk-icon'>
                                                    <CheckIcon />
                                                </div>
                                                <p>
                                                    Противоправные действия третьих лиц ДТЛ (кража с незаконным проникновением, грабеж, разбой; уничтожение или повреждение застрахованного имущества)
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-4">
                                        <ul>
                                            <li className='risk-item'>
                                                <div className='risk-icon'>
                                                    <CheckIcon />
                                                </div>
                                                <p>
                                                    Пожар
                                                </p>
                                            </li>
                                            <li className='risk-item'>
                                                <div className='risk-icon'>
                                                    <CheckIcon />
                                                </div>
                                                <p>
                                                    Удар молнии
                                                </p>
                                            </li>
                                            <li className='risk-item'>
                                                <div className='risk-icon'>
                                                    <CheckIcon />
                                                </div>
                                                <p>
                                                    Взрыв
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackagesWrapper;