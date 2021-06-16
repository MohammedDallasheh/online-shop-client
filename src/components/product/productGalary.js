import React from 'react';

import { Image } from 'antd';

import CardSlider from '../layout/CardSlider';
import { imageFallback } from '../../utils/imageFallback';

const ProductGalary = ({ imgs, carousel = 4, soldOut = false }) => {
  return (
    <div>
      {soldOut && (
        <img
          src={'/img/soldOut.png'}
          style={{
            position: 'absolute',
            zIndex: 55,
            left: '10%',
            width: '80%',
            height: '100%',
          }}
        />
      )}
      <CardSlider
        items={imgs}
        number={1}
        Component={({ items }) => (
          <Image
            src={items?.url}
            alt={items?.alt}
            width="100%"
            height="300px"
            fallback={imageFallback}
          />
        )}
        carousel={carousel}
      />
    </div>
  );
};

export default ProductGalary;
