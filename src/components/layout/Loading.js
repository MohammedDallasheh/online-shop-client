import React from 'react';

import { Spin } from 'antd';

const Loading = ({ ...rest }) => {
  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        margin: 'auto',
        display: 'block',
        position: 'relative',
      }}
      {...rest}
    >
      <Spin
        tip="Loading..."
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%) scale(2)',
        }}
      ></Spin>
    </div>
  );
};

export default Loading;
