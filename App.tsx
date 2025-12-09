import React, { useState, useEffect } from 'react';
import { CITIES, INITIAL_CITY } from './constants';
import { fetchWeatherData, getWeatherDescription } from './services/weatherService';
import { getOutfitRecommendation } from './services/geminiService';
import { WeatherData, City } from './types';
import WeatherIcon from './components/WeatherIcon';
import { 
  Droplets, 
  Wind, 
  Umbrella, 
  Sunset, 
  Loader2, 
  MapPin, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(INITIAL_CITY);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Initial Fetch
  useEffect(() => {
    loadWeather(selectedCity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const loadWeather = async (city: City) => {
    setLoading(true);
    setAdvice(null); // Reset advice on city change
    try {
      const data = await fetchWeatherData(city.lat, city.lng);
      setWeather(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAdvice = async () => {
    if (!weather) return;
    setLoadingAdvice(true);
    const result = await getOutfitRecommendation(selectedCity, weather);
    setAdvice(result);
    setLoadingAdvice(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans text-stone-800">
      
      {/* Main Mobile/Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col min-h-[800px]">
        
        {/* Header Section - Matches Wireframe Top Bar */}
        <div className="bg-vibe-sage/60 p-6 flex justify-between items-center relative z-20">
          <div className="font-serif text-2xl tracking-wide italic text-stone-800">
            My Weather APP
          </div>
          
          {/* Custom Dropdown Trigger */}
          <div className="relative">
             <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-medium hover:bg-stone-50 transition-colors"
             >
                {selectedCity.name}
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
             </button>

             {/* Dropdown Menu */}
             {isDropdownOpen && (
               <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-stone-100 overflow-hidden">
                 {CITIES.map((city) => (
                   <button
                    key={city.name}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-vibe-sage/30 transition-colors flex justify-between items-center"
                   >
                     {city.name}
                     {selectedCity.name === city.name && <div className="w-2 h-2 rounded-full bg-vibe-teal" />}
                   </button>
                 ))}
               </div>
             )}
          </div>
        </div>

        {/* Weather Info Section - Wireframe Middle */}
        <div className="flex-1 bg-white p-6 pt-10 flex flex-col items-center relative z-10">
          
          {loading ? (
             <div className="flex-1 flex items-center justify-center">
               <Loader2 className="w-10 h-10 animate-spin text-vibe-teal" />
             </div>
          ) : weather ? (
            <>
              {/* City Name - Serif & Big */}
              <h2 className="font-serif text-6xl text-center mb-2 italic text-stone-900">
                {selectedCity.name}
              </h2>
              
              <p className="text-stone-500 uppercase tracking-widest text-xs mb-8">
                {selectedCity.country}
              </p>

              <div className="w-full flex justify-between items-center px-4 mb-10">
                {/* Temperature */}
                <div className="flex flex-col">
                  <span className="font-serif text-7xl leading-none">
                    {Math.round(weather.temperature)}
                    <span className="text-4xl align-top font-sans font-light">°C</span>
                  </span>
                  <span className="text-stone-400 capitalize mt-2">
                    {getWeatherDescription(weather.weatherCode)}
                  </span>
                </div>

                {/* Main Icon Circle - Matches Black Circle in Wireframe */}
                <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center shadow-2xl text-white transform hover:scale-105 transition-transform duration-500">
                   <WeatherIcon code={weather.weatherCode} isDay={weather.isDay} className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Metrics Row */}
              <div className="w-full grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center p-3 bg-stone-50 rounded-2xl">
                   <Droplets className="w-5 h-5 text-vibe-teal mb-1" />
                   <span className="text-xs text-stone-400 font-medium">Humidity</span>
                   <span className="font-semibold text-lg">{weather.humidity}%</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-stone-50 rounded-2xl">
                   <Wind className="w-5 h-5 text-vibe-teal mb-1" />
                   <span className="text-xs text-stone-400 font-medium">Wind</span>
                   <span className="font-semibold text-lg">{Math.round(weather.windSpeed)}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-stone-50 rounded-2xl">
                   <Umbrella className="w-5 h-5 text-vibe-teal mb-1" />
                   <span className="text-xs text-stone-400 font-medium">Rain</span>
                   <span className="font-semibold text-lg">{weather.precipitationProb}%</span>
                </div>
              </div>
              
              <div className="w-full flex justify-center items-center text-xs text-stone-400 gap-2 mb-6">
                 <Sunset className="w-4 h-4" /> 
                 <span>Sunset at {weather.sunset}</span>
              </div>
            </>
          ) : (
            <div className="text-center text-red-400">Failed to load data</div>
          )}
        </div>

        {/* Large City Image - Wireframe Bottom */}
        {/* We use a negative margin to pull it up or just let it sit */}
        <div className="relative h-72 w-full mt-auto group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img 
            src={selectedCity.imageUrl} 
            alt={selectedCity.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
             <div className="text-white">
                <p className="text-xs opacity-80 uppercase tracking-widest mb-1">Current View</p>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-vibe-sage" />
                  <span className="font-medium">{selectedCity.name}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Outfit Recommendation Button - Sticky or Bottom Overlay */}
        <div className="absolute bottom-6 right-6 z-30">
          <button
            onClick={handleGetAdvice}
            disabled={loading || loadingAdvice || !weather}
            className="bg-white/90 backdrop-blur-md text-stone-900 pr-5 pl-4 py-3 rounded-full shadow-lg hover:bg-vibe-sage transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group border border-white/20"
          >
             <div className="bg-stone-900 text-white rounded-full p-2 group-hover:rotate-12 transition-transform">
               {loadingAdvice ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
             </div>
             <span className="font-serif italic font-medium">
               {loadingAdvice ? "Styling..." : "Outfit Advice"}
             </span>
          </button>
        </div>

        {/* AI Advice Modal/Overlay */}
        {advice && (
          <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
             <div className="bg-white w-full max-w-sm rounded-3xl p-8 relative animate-in fade-in slide-in-from-bottom-10 duration-500 shadow-2xl">
               <button 
                 onClick={() => setAdvice(null)}
                 className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
               >
                 ✕
               </button>
               
               <div className="flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-vibe-sage/30 rounded-full flex items-center justify-center mb-4 text-vibe-teal">
                    <Sparkles className="w-6 h-6" />
                 </div>
                 <h3 className="font-serif text-2xl italic mb-4 text-stone-800">Today's Look</h3>
                 <p className="text-stone-600 leading-relaxed text-sm">
                   {advice}
                 </p>
                 <div className="mt-6 w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-vibe-teal/50 w-1/3 mx-auto rounded-full" />
                 </div>
               </div>
             </div>
          </div>
        )}

      </div>
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#e8e6e1]">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-vibe-teal/5 rounded-full blur-3xl" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-vibe-sage/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default App;