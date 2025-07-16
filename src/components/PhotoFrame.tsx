'use client';

import { useState, useEffect } from 'react';

interface PhotoFrameProps {
  photoFileName?: string; // e.g., "hui-mun-photo.jpg"
}

export default function PhotoFrame({ photoFileName }: PhotoFrameProps) {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (photoFileName) {
      // Load the photo from the public folder
      const photoPath = `/${photoFileName}`;
      setPhotoSrc(photoPath);
      setHasError(false);
    }
  }, [photoFileName]);

  return (
    <div 
      className="w-32 h-32 rounded-lg border-4 flex items-center justify-center relative overflow-hidden"
      style={{
        borderColor: '#4ebcff',
        background: 'linear-gradient(135deg, rgba(78, 188, 255, 0.1), rgba(148, 92, 180, 0.1))',
        boxShadow: '0 4px 8px rgba(78, 188, 255, 0.3)'
      }}
    >
      {photoSrc && !hasError ? (
        <img 
          src={photoSrc} 
          alt="Birthday person" 
          className="w-full h-full object-cover rounded"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="text-center text-gray-500">
          <div className="text-2xl mb-1">📷</div>
          <div className="text-xs">
            {photoFileName ? 'Photo not found' : 'Add Photo'}
          </div>
          {photoFileName && (
            <div className="text-xs mt-1 opacity-75">
              Place {photoFileName} in components folder
            </div>
          )}
        </div>
      )}
      
      {/* Decorative corners */}
      <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: '#945cb4' }}></div>
      <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: '#945cb4' }}></div>
      <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: '#945cb4' }}></div>
      <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: '#945cb4' }}></div>
    </div>
  );
}
