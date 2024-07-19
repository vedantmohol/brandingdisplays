import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [homeTextAreaContent, setHomeTextAreaContent] = useState('BRANDING DISPLAYS WELCOMES YOU!');
  const [footerHeading, setFooterHeading] = useState('Footer Heading Here');
  const [footerTextArea1, setFooterTextArea1] = useState('Footer Text Area 1');
  const [footerTextArea2, setFooterTextArea2] = useState('Footer Text Area 2');
  const [footerTextArea3, setFooterTextArea3] = useState('Footer Text Area 3');
  const [homeImages, setHomeImages] = useState(['/image1.jpg', '/image2.jpg', '/image3.jpg']);
  const [homeTexts, setHomeTexts] = useState(['Text 1', 'Text 2', 'Text 3']);

  const [aboutTextAreaContent, setAboutTextAreaContent] = useState('About Us Content');
  const [aboutImage, setAboutImage] = useState('/about-image.jpg');
  const [aboutText, setAboutText] = useState('More About Us');

  const [portfolioTextAreaContent, setPortfolioTextAreaContent] = useState('Our Portfolio');
  const [portfolioItems, setPortfolioItems] = useState([
    { extraText: 'Extra Text 1', text: 'Portfolio Item 1', image: '/portfolio1.jpg' },
    { extraText: 'Extra Text 2', text: 'Portfolio Item 2', image: '/portfolio2.jpg' },
    { extraText: 'Extra Text 3', text: 'Portfolio Item 3', image: '/portfolio3.jpg' },
    { extraText: 'Extra Text 4', text: 'Portfolio Item 4', image: '/portfolio4.jpg' },
    { extraText: 'Extra Text 5', text: 'Portfolio Item 5', image: '/portfolio5.jpg' },
    { extraText: 'Extra Text 6', text: 'Portfolio Item 6', image: '/portfolio6.jpg' }
  ]);

  return (
    <AdminContext.Provider value={{
        isAdmin, setIsAdmin,
        homeTextAreaContent, setHomeTextAreaContent,
        footerHeading, setFooterHeading,
        footerTextArea1, setFooterTextArea1,
        footerTextArea2, setFooterTextArea2,
        footerTextArea3, setFooterTextArea3,
        homeImages, setHomeImages,
        homeTexts, setHomeTexts,
        aboutTextAreaContent, setAboutTextAreaContent,
        aboutImage, setAboutImage,
        aboutText, setAboutText,
        portfolioTextAreaContent, setPortfolioTextAreaContent,
        portfolioItems, setPortfolioItems
      }}>
        {children}
      </AdminContext.Provider>
  );
};
