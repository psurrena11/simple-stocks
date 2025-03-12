import React from 'react';

interface StockAstrologyProps {
  symbol: string;
  openPrice: string;
  timestamp: string;
}

const StockAstrology: React.FC<StockAstrologyProps> = ({ symbol, openPrice, timestamp }) => {
  const renderAstrologicalSign = (timestamp: string): string => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // JS months are 0-indexed
    const day = date.getDate();
    
    // Determine astrological sign based on date
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '♈ Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '♉ Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return '♊ Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return '♋ Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '♌ Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '♍ Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return '♎ Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return '♏ Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return '♐ Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '♑ Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '♒ Aquarius';
    return '♓ Pisces'; // Feb 19 - Mar 20
  };

  const getStockFortune = (symbol: string, open: string): string => {
    // Generate a "fortune" based on the stock symbol and open price
    const openNum = parseFloat(open);
    const sumDigits = symbol.split('')
      .map(char => char.charCodeAt(0))
      .reduce((sum, code) => sum + code, 0);
    
    const fortuneIndex = (sumDigits + Math.floor(openNum * 100)) % fortunes.length;
    return fortunes[fortuneIndex];
  };
  
  // List of fortune predictions
  const fortunes = [
    "This stock shows great promise. The stars align for prosperity.",
    "Caution is advised. Mercury retrograde may affect performance.",
    "A favorable time for growth. Jupiter's influence brings expansion.",
    "Volatile energies surround this choice. Consider diversifying.",
    "The celestial bodies favor this investment in the coming lunar cycle.",
    "Saturn's position suggests patience will be rewarded.",
    "Venus brings harmony to this financial decision.",
    "The cosmic alignment suggests steady, gradual growth.",
    "Mars energy indicates potential for sudden movements. Stay alert.",
    "The moon's phase suggests this is a time of new beginnings."
  ];

  return (
    <div className="astro-section">
      <p className="sign">{renderAstrologicalSign(timestamp)}</p>
      <p className="fortune">{getStockFortune(symbol, openPrice)}</p>
    </div>
  );
};

export default StockAstrology;