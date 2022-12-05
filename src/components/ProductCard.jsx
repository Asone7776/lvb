import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveItem } from '../redux/slices/safeSlice';
import { useNavigate } from 'react-router-dom';
import { tariffs } from '../constants';
const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const saveSafeItem = () => {
        if (item.orderNo != null) {
            dispatch(saveItem(tariffs[item.orderNo]));
            navigate('/admin/calculate');
        }
        if (item.link) {
            if (item.external) {
                window.open(item.link, '_blank');
            } else {
                navigate(item.link);
            }
        }
    }
    return (
        <div className="card product-card">
            <div className="card-body">
                <div className="top">
                    <div className="icon">
                        <item.icon />
                    </div>
                    <h5>{item.subTitle}</h5>
                    <h4 dangerouslySetInnerHTML={{ __html: item.title }}></h4>
                    <p>{item.content}</p>
                </div>
                <div className="bottom">
                    <button className="btn btn-primary" onClick={saveSafeItem}>Оформить</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;