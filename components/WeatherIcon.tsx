import React from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudRain, 
  CloudDrizzle, 
  CloudLightning, 
  Snowflake, 
  CloudFog,
  Moon
} from 'lucide-react';

interface Props {
  code: number;
  isDay: number;
  className?: string;
}

const WeatherIcon: React.FC<Props> = ({ code, isDay, className = "w-16 h-16" }) => {
  
  // WMO Code mapping
  if (code === 0) return isDay ? <Sun className={className} /> : <Moon className={className} />;
  if (code === 1 || code === 2) return <CloudSun className={className} />;
  if (code === 3) return <Cloud className={className} />;
  if ([45, 48].includes(code)) return <CloudFog className={className} />;
  if ([51, 53, 55, 61, 80].includes(code)) return <CloudDrizzle className={className} />;
  if ([63, 65, 81, 82].includes(code)) return <CloudRain className={className} />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <Snowflake className={className} />;
  if ([95, 96, 99].includes(code)) return <CloudLightning className={className} />;
  
  return <Sun className={className} />;
};

export default WeatherIcon;