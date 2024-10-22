import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Notice } from '../types';

const Notices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/.netlify/functions/api/notices');
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  // ... rest of the component remains the same
};

export default Notices;