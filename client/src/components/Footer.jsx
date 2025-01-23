import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col items-center gap-3 px-4 lg:px-44 py-3'>
        <img width={150}  src={assets.logo} alt="" />
        <p className='border-1 border-gray-400 pl-4 text-sm text-gray-500'>
          &copy; 2025 BG Vanish | All rights reserved. | MMM Info Tech
        </p>

        <div className='flex gap-6'>
        <a href="https://github.com/mmb0129" target="_blank" rel="noopener noreferrer">
            <img width={40} src={assets.github_icon} alt="" />
        </a>
        <a href="https://www.linkedin.com/in/micheal-berdinanth-m" target="_blank" rel="noopener noreferrer">
            <img width={40} src={assets.linkedin} alt="" />
        </a>
        </div>
    </div>
  );
};


export default Footer