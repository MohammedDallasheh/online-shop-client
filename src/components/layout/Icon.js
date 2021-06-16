import React, { useState } from 'react';
import '../../icon/iconfont.css';
const Icon = ({
  name,
  color = 'black',
  size,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onClick,
  hover,
  clickable,
  style,
  className,
}) => {
  const [iconColor, setIconColor] = useState(color);
  const [staticIconColor, setStaticIconColor] = useState();
  return (
    <>
      <span
        style={{
          color: staticIconColor || iconColor,
          fontSize: 0.9 * size + 'rem',
          paddingTop: '0rem',
          ...style,
        }}
        className={`iconfont2 icon-${name} ${className}`}
        onFocus={onFocus}
        onClick={() => {
          if (clickable)
            setStaticIconColor((color) =>
              !color
                ? typeof clickable == 'boolean'
                  ? 'blue'
                  : clickable
                : null
            );
          if (!onClick) return;
          if (typeof onClick == 'function') onClick();
          else if (typeof onClick.color == 'string')
            setStaticIconColor((color) =>
              !color ? onClick.color : null
            );
        }}
        onMouseEnter={(e) => {
          hover && setIconColor(hover);
          onMouseEnter && onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          setIconColor(color);
          onMouseLeave && onMouseLeave(e);
        }}
      ></span>
    </>
  );
};

export default Icon;
