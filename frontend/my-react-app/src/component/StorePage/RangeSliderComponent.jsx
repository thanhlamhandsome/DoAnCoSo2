import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const RangeSlider = ({ valuedefault, onValueChange }) => {  // Thêm onValueChange vào props
  const [value, setValue] = useState(valuedefault || [0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onValueChange(newValue);  // Gọi callback khi giá trị thay đổi
  };

  // Hàm để hiển thị giá trị trên slider
  const valuetext = (value) => {
    return `${value}`;
  };

  return (
    <Box sx={{ width: 220, mt: 3 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        min={0}
        max={100}
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default RangeSlider;
