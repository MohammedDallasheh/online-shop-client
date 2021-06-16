import React, { useState, useEffect, useMemo } from 'react';

import { Slider } from 'antd';
import TextField from '@material-ui/core/TextField';

const RangeFilter = (props) => {
  const { maxMin, selectedRange = '', setSelectedRange } = props;
  const [minRange, maxRange] = maxMin;
  const [range, setRange] = useState([0, 0]);

  useEffect(() => {
    const range = selectedRange?.range?._id?.split('--') || maxMin;
    setRange(rangeCorrection(range));
  }, [selectedRange]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target || {};

    const newRange = [...range];
    newRange[name === 'Min' ? 0 : 1] = +value;

    setRange(newRange);
  };

  const handleBlur = () => {
    const currentRange = rangeCorrection(range);
    setRange(currentRange);
    if (currentRange[0] == minRange && currentRange[1] == maxRange) {
      setSelectedRange(false);
    } else {
      setSelectedRange(currentRange.join('--'));
    }
  };

  const rangeCorrection = ([a, b]) => {
    [a, b] = [+a, +b];
    if (a > b) [a, b] = [b, a];
    if (isNaN(a) || a < minRange) a = minRange;
    if (isNaN(b) || b > maxRange) b = maxRange;
    return [a, b];
  };

  const input = (label, value) => (
    <div className="w-50 pr-2 mt-3">
      <TextField
        type="number"
        variant="outlined"
        size="small"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{ min: minRange, max: maxRange }}
        label={label}
        name={label}
        value={value}
      />
    </div>
  );

  const marksSpace = (maxOrmin) => {
    if (range[1] - range[0] < 100)
      return maxOrmin == 'max' ? '0' : '-100';
    if (maxOrmin == 'max' && maxRange - range[1] < 50) return '-100';
    if (maxOrmin == 'min' && range[0] - minRange < 50) return '0';
    return maxOrmin == 'max' ? '-50' : '-50';
  };

  const marks = useMemo(
    () => ({
      [range[0]]: {
        label: range[0],
        style: { transform: `translateX(${marksSpace('min')}%)` },
      },
      [range[1]]: {
        label: range[1],
        style: { transform: `translateX(${marksSpace('max')}%)` },
      },
    }),
    [selectedRange, maxMin]
  );

  return (
    <div className="d-flex flex-wrap justify-content-around text-center">
      {input('Min', range[0] || 0)}
      {input('Max', range[1] || 0)}

      <div className="w-100 my-2" />
      <Slider
        className="w-100"
        value={range}
        marks={marks}
        onChange={setRange}
        onAfterChange={handleBlur}
        min={minRange}
        max={maxRange}
        range
      />
    </div>
  );
};

export default RangeFilter;
