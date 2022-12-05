import React from 'react';
import ProductCard from '../../components/ProductCard';
import { InsuranceProducts } from '../../constants';
const Products = () => {
    return (
        <div className="products information list-wrapper">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <div className="info-top-header">
                            <h3 className='default-heading'>Страховые продукты</h3>
                        </div>
                        <div className="row">
                            {InsuranceProducts && InsuranceProducts.map((item, index) => (
                                <div className="col-4" style={{ marginBottom: 30 }} key={index}>
                                    <ProductCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;