'use client';

import React, { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  location: string;
}

const getWeatherIcon = (condition: string): string => {
  const cond = (condition || '').toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return '☀️';
  if (cond.includes('cloud') || cond.includes('overcast')) return '☁️';
  if (cond.includes('rain') || cond.includes('drizzle') || cond.includes('shower')) return '🌧️';
  if (cond.includes('snow')) return '❄️';
  if (cond.includes('thunder') || cond.includes('storm')) return '⛈️';
  return '☀️';
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchWeatherByCoords = async (lat: number, lon: number) => {
      const cacheBuster = Date.now();
      const weatherResponse = await fetch(
        `https://wttr.in/${lat},${lon}?format=%C+%t+%l&_=${cacheBuster}`
      );
      const weatherText = (await weatherResponse.text()).trim();
      
      if (!weatherText || weatherText.toLowerCase().includes('unknown')) {
        throw new Error('Invalid weather response');
      }

      const parts = weatherText.split(' ');
      const tempStr = parts.find(p => p.includes('°F') || p.includes('°C')) || parts[parts.length - 2];
      const temp = parseInt(tempStr.replace(/[°F°C+]/g, ''), 10);
      const locationPart = parts[parts.length - 1];
      const condition = parts.slice(0, parts.indexOf(tempStr)).join(' ');

      return {
        temperature: Number.isFinite(temp) ? temp : 75,
        condition: condition || 'Clear',
        icon: getWeatherIcon(condition),
        location: locationPart || 'Your Location',
      };
    };

    const fetchWeatherByCity = async (city: string) => {
      const cacheBuster = Date.now();
      const weatherResponse = await fetch(
        `https://wttr.in/${encodeURIComponent(city)}?format=%C+%t&_=${cacheBuster}`
      );
      const weatherText = (await weatherResponse.text()).trim();
      
      if (!weatherText || weatherText.toLowerCase().includes('unknown')) {
        throw new Error('Invalid weather response');
      }

      const parts = weatherText.split(' ');
      const tempStr = parts[parts.length - 1];
      const temp = parseInt(tempStr.replace(/[°F+]/g, ''), 10);
      const condition = parts.slice(0, -1).join(' ');

      return {
        temperature: Number.isFinite(temp) ? temp : 75,
        condition: condition || 'Clear',
        icon: getWeatherIcon(condition),
        location: city,
      };
    };

    const fetchWeather = async () => {
      try {
        let result: WeatherData | null = null;

        // Strategy 1: Try browser geolocation (most accurate, but requires permission)
        if ('geolocation' in navigator) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
                maximumAge: 300000, // Cache for 5 minutes
              });
            });
            result = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          } catch (geoErr) {
            // User denied or timeout - continue to IP fallback
          }
        }

        // Strategy 2: IP-based geolocation with wttr.in (no external service needed)
        if (!result) {
          try {
            // wttr.in can detect location from IP directly
            const cacheBuster = Date.now();
            const weatherResponse = await fetch(
              `https://wttr.in/?format=%C+%t+%l&_=${cacheBuster}`
            );
            const weatherText = (await weatherResponse.text()).trim();
            
            if (weatherText && !weatherText.toLowerCase().includes('unknown')) {
              const parts = weatherText.split(' ');
              const tempStr = parts.find(p => p.includes('°F') || p.includes('°C')) || parts[parts.length - 2];
              const temp = parseInt(tempStr.replace(/[°F°C+]/g, ''), 10);
              const locationPart = parts[parts.length - 1];
              const condition = parts.slice(0, parts.indexOf(tempStr)).join(' ');

              result = {
                temperature: Number.isFinite(temp) ? temp : 75,
                condition: condition || 'Clear',
                icon: getWeatherIcon(condition),
                location: locationPart || 'Your Location',
              };
            }
          } catch (ipErr) {
            // Continue to final fallback
          }
        }

        // Strategy 3: Final fallback to Grand Rapids
        if (!result) {
          result = await fetchWeatherByCity('Grand Rapids, MI');
        }

        if (isMounted) setWeather(result);
      } catch (err) {
        // Ultimate fallback
        if (isMounted) {
          setWeather({ temperature: 75, condition: 'Clear', icon: '☀️', location: 'Grand Rapids' });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        lineHeight: '1'
      }}>
        <span style={{ display: 'inline-block', fontSize: '16px', lineHeight: '1', transform: 'translateY(1px)' }}>⏳</span>
        <span style={{ lineHeight: '1' }}>--°</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      color: 'rgba(255, 255, 255, 0.6)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      lineHeight: '1'
    }}>
      <span style={{ fontSize: '16px', display: 'inline-block', lineHeight: '1', transform: 'translateY(1px)' }}>{weather.icon}</span>
      <span style={{ lineHeight: '1' }}>{weather.temperature}°</span>
    </div>
  );
};

export default WeatherWidget;
