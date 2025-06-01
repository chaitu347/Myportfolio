import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './ContactInfo.css';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'info@yourcompany.com',
      link: 'mailto:info@yourcompany.com'
    },
    {
      icon: <FiPhone />,
      label: 'Phone',
      value: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: <FiMapPin />,
      label: 'Location',
      value: '17.4851° N, 78.4056° E',
      link: 'https://maps.google.com/?q=17.4851,78.4056'
    }
  ];

  return (
    <div className="contact-info-container">
      <div className="contact-info-wrapper">
        {contactDetails.map((item, index) => (
          <div key={index} className="contact-info-item">
            <div className="contact-icon">
              {item.icon}
            </div>
            <div className="contact-details">
              <span className="contact-label">{item.label}</span>
              <a 
                href={item.link}
                target={item.label === 'Location' ? '_blank' : '_self'}
                rel={item.label === 'Location' ? 'noopener noreferrer' : ''}
                className="contact-value"
              >
                {item.value}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;