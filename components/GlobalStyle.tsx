import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;800;900&family=Montserrat:wght@100;200;300;500;600;900&display=swap');

  *{
    box-sizing: border-box;

  }

  body{
    background-color:#faf7f6;
    font-feature-settings:'tnum';
    font-variant-numeric: tabular-nums;
  }
`;

export default globalStyle;
