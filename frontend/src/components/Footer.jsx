import React from 'react';
import Policy from './policy';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  const handleNavigateToPolicy = (e) => {
    e.preventDefault();
    navigate('../policy');
  };
  return (
    <footer style={footerStyle}>
      <hr style={hrStyle} />

      <p style={{ copyrightStyle, padding: '0',margin:'0' }}>
  &copy; 2024 Clustle. All rights reserved.
  <a href="../policy" onClick={handleNavigateToPolicy} style={{ textDecoration: 'none',color: 'grey', justifyContent: 'center', marginLeft: '10px' }}>
    Policies
  </a>
</p>


    </footer>
  );
};
// Styles
const footerStyle = {
	backgroundColor: '#333',
	color: '#fff',
	textAlign: 'center',
	width: '100%',
  position:"sticky",
	bottom: 0,
	left: 0 ,
	right:0,
	padding:'10px',
  // Set maximum width to 100% of the viewport width
  };
const hrStyle = {
  borderColor: '#555',
};
const copyrightStyle = {
  fontSize: '14px',
  marginTop: '10px',
};
export default Footer;