import React, { useState } from 'react';
import MyContext from './ContexExp';

const FONT_OPTIONS = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Calibri', value: 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif' },
  { label: 'Cambria', value: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif' },
  { label: 'Candara', value: 'Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif' },
  { label: 'Consolas', value: 'Consolas, monaco, monospace' },
  { label: 'Constantia', value: 'Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif' },
  { label: 'Corbel', value: 'Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
  { label: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
  { label: 'Lucida Sans Unicode', value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif' },
  { label: 'Palatino Linotype', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Segoe UI', value: '"Segoe UI", "Segoe WP", Tahoma, Arial, sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, Geneva, Verdana, sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
];

const MyProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    vehicleCode: '',
    vehicleNumber: '',
    timeIn: '',
    timeOut: '',
    weight1: '',
    weight2: '',
    netWeight: '',
    bags: '',
    charges: '250',
    driverStatus: 'Without Driver',
  });
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS.find(f => f.label === 'Courier New').value);

  const handleFontChange = (event) => {
    setFontFamily(event.target.value);
  };

  return (
    <MyContext.Provider value={{ formData, setFormData, fontFamily, setFontFamily, FONT_OPTIONS, handleFontChange }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;  