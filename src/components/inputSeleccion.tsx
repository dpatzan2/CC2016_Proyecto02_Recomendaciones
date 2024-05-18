'use client';

import { ImageInputProps } from '@/types/types';
import React from 'react';



export default function ImageInput({ title, image, selected, onClick  }: ImageInputProps) {
  return (
    <div 
      className={`relative w-full h-40 rounded-lg overflow-hidden cursor-pointer ${selected ? 'ring-2 ring-blue-500' : 'ring-2 ring-transparent'}`}
      onClick={onClick}
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h2 className="text-c text-lg font-bold">{title}</h2>
      </div>
      <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
        {selected && <span className="text-blue-500 ">&#10003;</span>}
      </div>
    </div>
  );
}