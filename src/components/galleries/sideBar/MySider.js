import React, { useState } from 'react';

import { Layout } from 'antd';

const { Sider } = Layout;

const MySider = ({ children, ...props }) => {
  const [breakpoint, setBreakpoint] = useState(false);

  return (
    <div className={`my-sider-container`}>
      <div className="my-sider-wrapper ">
        <Sider
          className={`my-sider p-2 bg-light  ${breakpoint && 'break'}`}
          // breakpoint ? 'absolute' : 'sticky'
          collapsible={true}
          collapsedWidth={0}
          width={250}
          breakpoint="md"
          onBreakpoint={setBreakpoint}
          zeroWidthTriggerStyle={{ zIndex: 99 }}
          {...props}
        >
          {children}
        </Sider>
      </div>
    </div>
  );
};
export default MySider;
