/**
 * Format a date string into a readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Check if it's a valid date
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Same day (today)
  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  // Yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  // This week (within 7 days)
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  if (date > oneWeekAgo) {
    return `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  // Default format for older dates
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Calculate win rate percentage
 */
export const calculateWinRate = (wins: number, losses: number): number => {
  if (wins === 0 && losses === 0) return 0;
  return (wins / (wins + losses)) * 100;
};

/**
 * Format a number with a + sign if positive
 */
export const formatWithSign = (num: number): string => {
  return num > 0 ? `+${num}` : `${num}`;
};