import React from 'react';
import Card from '../../../../shared/card/Card';

const RelatedProducts = ({relatedProduct}) => {
    return (
        <div className="grid  grid-cols-2 lg:grid-cols-5 ga-3 mt-10">
            {relatedProduct.map(product => <Card key={product._id} product={product}/>)}
        </div>
    );
};

export default RelatedProducts;