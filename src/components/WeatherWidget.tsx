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

    const fetchWeather = async () => {
      try {
        let result: WeatherData | null = null;
        // Multiple IP-based services to broaden detection (all free/no key)
        const ipServices = [
          'https://ipapi.co/json/',
          'https://freegeoip.app/json/',
          'https://ipwhois.app/json/'
        ];

        for (const svc of ipServices) {
          try {
            const locationResponse = await fetch(svc, { cache: 'no-store' });
            const loc = await locationResponse.json();
            const city: string | undefined = loc?.city || loc?.region || loc?.country_name || loc?.country || loc?.state_prov || loc?.state;
            if (!city) continue;

            // wttr.in simple text format: "Sunny +75°F"
            const weatherResponse = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=%C+%t`, { cache: 'no-store' });
            const weatherText = (await weatherResponse.text()).trim();
            if (!weatherText || weatherText.toLowerCase().includes('unknown')) continue;

            const parts = weatherText.split(' ');
            const tempStr = parts[parts.length - 1];
            const temp = parseInt(tempStr.replace(/[°F+]/g, ''), 10);
            const condition = parts.slice(0, -1).join(' ');

            result = {
              temperature: Number.isFinite(temp) ? temp : 75,
              condition: condition || 'Clear',
              icon: getWeatherIcon(condition),
              location: city,
            };
            break; // success
          } catch (_) {
            // try next service
            continue;
          }
        }

        // Final fallback to Grand Rapids if all services failed
        if (!result) {
          try {
            const weatherResponse = await fetch('https://wttr.in/Grand%20Rapids?format=%C+%t', { cache: 'no-store' });
            const weatherText = (await weatherResponse.text()).trim();
            const parts = weatherText.split(' ');
            const tempStr = parts[parts.length - 1];
            const temp = parseInt(tempStr.replace(/[°F+]/g, ''), 10);
            const condition = parts.slice(0, -1).join(' ');
            result = {
              temperature: Number.isFinite(temp) ? temp : 75,
              condition: condition || 'Clear',
              icon: getWeatherIcon(condition),
              location: 'Grand Rapids',
            };
          } catch (_) {
            result = { temperature: 75, condition: 'Clear', icon: '☀️', location: 'Grand Rapids' };
          }
        }

        if (isMounted) setWeather(result);
      } catch (_) {
        if (isMounted) setWeather({ temperature: 75, condition: 'Clear', icon: '☀️', location: 'Grand Rapids' });
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
