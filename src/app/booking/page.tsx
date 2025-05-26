'use client';
import { useState } from 'react';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  return (
    <div>
      <input 
        type="date" 
        onChange={(e) => setSelectedDate(new Date(e.target.value))} 
      />
      {selectedDate && <p>تاریخ انتخاب شده: {selectedDate.toLocaleDateString('fa-IR')}</p>}
    </div>
  );
}
