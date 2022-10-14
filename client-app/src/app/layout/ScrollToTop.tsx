import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {}
const ScrollToTop: React.FC<ScrollToTopProps> = (props) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

export default ScrollToTop;