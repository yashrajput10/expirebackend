const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Return "Invalid Date" if invalid date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const currentDate = new Date();
    const timeDiff = expiry.getTime() - currentDate.getTime();
    const dayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    return timeDiff <= dayInMs && timeDiff >= 0; // Expiring in the next day
  };
  
  module.exports = { formatDate, isExpiringSoon };
  