import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({ item }) => {
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
                    {item.external ? (
                        <a href={item.link} target='_blank'>
                            <button className="btn btn-primary">Оформить</button>
                        </a>
                    ) : (
                        <Link to={item.link}>
                            <button className="btn btn-primary">Оформить</button>
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ProductCard;