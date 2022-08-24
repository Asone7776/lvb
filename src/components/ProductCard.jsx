import React from "react";
const ProductCard = ({ item }) => {
    return (
        <div className="card product-card">
            <div className="card-body">
                <div className="top">
                    <div className="icon">
                        <item.icon />
                    </div>
                    <h5>{item.subTitle}</h5>
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                </div>
                <div className="bottom">
                    <button className="btn btn-primary">Оформить</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;