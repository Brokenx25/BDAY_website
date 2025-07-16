'use client';

import { useState } from 'react';
import CountdownPage from '@/components/CountdownPage';
import WaitingScreen from '@/components/WaitingScreen';
import BirthdayCard from '@/components/BirthdayCard';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'countdown' | 'birthday'>('countdown');

  // Optional GIF backgrounds - you can add GIF files to the public folder and reference them here
  const countdownGif = undefined; // e.g., '/countdown-bg.gif'
  const birthdayGif = undefined;  // e.g., '/birthday-bg.gif'

  const handleCountdownComplete = () => {
    setCurrentPage('birthday');
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'countdown' && (
        <CountdownPage
          onComplete={handleCountdownComplete}
          backgroundGif={countdownGif}
        />
      )}
      {currentPage === 'birthday' && (
        <BirthdayCard backgroundGif={birthdayGif} />
      )}
    </div>
  );
}
