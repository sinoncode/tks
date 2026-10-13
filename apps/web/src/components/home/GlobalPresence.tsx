import { useState } from 'react';
import {
  ArrowUpRight,
  Globe2,
  MapPin,
  Network,
} from 'lucide-react';
import './global-presence.css';

interface Location {
  country: string;
  city: string;
  code: string;
  flag: string;
  region: string;
  description: string;
  coordinates: string;
}

const locations: Location[] = [
  {
    country: 'India',
    city: 'New Delhi',
    code: 'IN',
    flag: '🇮🇳',
    region: 'SOUTH ASIA',
    description:
      'Supporting network infrastructure, engineering, and technology delivery.',
    coordinates: '28.6139° N · 77.2090° E',
  },
  {
    country: 'United States',
    city: 'USA',
    code: 'US',
    flag: '🇺🇸',
    region: 'NORTH AMERICA',
    description:
      'Connecting businesses through scalable network infrastructure solutions.',
    coordinates: '39.8283° N · 98.5795° W',
  },
  {
    country: 'United Arab Emirates',
    city: 'Dubai',
    code: 'AE',
    flag: '🇦🇪',
    region: 'MIDDLE EAST',
    description:
      'Enabling digital connectivity and infrastructure across the region.',
    coordinates: '25.2048° N · 55.2708° E',
  },
  {
    country: 'Philippines',
    city: 'Manila',
    code: 'PH',
    flag: '🇵🇭',
    region: 'SOUTHEAST ASIA',
    description:
      'Delivering engineering expertise for evolving connectivity needs.',
    coordinates: '14.5995° N · 120.9842° E',
  },
  {
    country: 'United Kingdom',
    city: 'UK',
    code: 'GB',
    flag: '🇬🇧',
    region: 'EUROPE',
    description:
      'Supporting network deployment, optimisation, and digital transformation.',
    coordinates: '51.5072° N · 0.1276° W',
  },
  {
    country: 'Kenya',
    city: 'Nairobi',
    code: 'KE',
    flag: '🇰🇪',
    region: 'EAST AFRICA',
    description:
      'Contributing to connected communities through reliable infrastructure.',
    coordinates: '1.2921° S · 36.8219° E',
  },
];

export function GlobalPresence() {
  const [activeLocation, setActiveLocation] = useState<string | null>(
    null,
  );

  return (
    <section
      className="global-presence"
      id="global-presence"
      aria-labelledby="global-presence-title"
    >
      <div className="global-presence-container">
        {/* Section heading */}
        <header className="global-presence-header">
          <div className="global-presence-eyebrow">
            <span className="global-presence-eyebrow-line" />
            <Globe2 size={15} strokeWidth={1.8} />
            <span>OUR GLOBAL PRESENCE</span>
          </div>

          <h2
            className="global-presence-title"
            id="global-presence-title"
          >
            Engineering connectivity,
            <br />
            <span>across borders.</span>
          </h2>

          <p className="global-presence-description">
            Connecting markets, enabling infrastructure, and delivering
            engineering expertise across multiple regions worldwide.
          </p>
        </header>

        {/* Global network visual */}
        <div className="global-presence-network">
          <div className="global-network-orbit global-network-orbit-one" />
          <div className="global-network-orbit global-network-orbit-two" />

          <div className="global-network-content">
            <div className="global-network-icon">
              <Globe2 size={23} strokeWidth={1.4} />
            </div>

            <div className="global-network-copy">
              <span>CONNECTED BY EXPERTISE</span>
              <p>One vision. Multiple markets.</p>
            </div>

            <div className="global-network-indicator">
              <span />
              Global reach
            </div>
          </div>

          <div className="global-network-decoration">
            <Network size={90} strokeWidth={0.65} />
          </div>
        </div>

        {/* Location cards */}
        <div className="global-presence-grid">
          {locations.map((location, index) => {
            const isActive = activeLocation === location.code;

            return (
              <article
                key={location.code}
                className={`global-location-card ${
                  isActive ? 'global-location-card-active' : ''
                }`}
                style={
                  {
                    '--card-index': index,
                  } as React.CSSProperties
                }
                onMouseEnter={() =>
                  setActiveLocation(location.code)
                }
                onMouseLeave={() => setActiveLocation(null)}
                onFocus={() => setActiveLocation(location.code)}
                onBlur={() => setActiveLocation(null)}
              >
                {/* Animated card background */}
                <div
                  className="global-location-pattern"
                  aria-hidden="true"
                />

                <div
                  className="global-location-glow"
                  aria-hidden="true"
                />

                {/* Card top */}
                <div className="global-location-top">
                  <div className="global-location-flag">
                    <span aria-hidden="true">
                      {location.flag}
                    </span>
                  </div>

                  <span className="global-location-code">
                    {location.code}
                  </span>

                  <div className="global-location-arrow">
                    <ArrowUpRight
                      size={19}
                      strokeWidth={1.6}
                    />
                  </div>
                </div>

                {/* Card content */}
                <div className="global-location-content">
                  <span className="global-location-region">
                    {location.region}
                  </span>

                  <h3>{location.country}</h3>

                  <div className="global-location-city">
                    <MapPin size={14} strokeWidth={1.8} />
                    <span>{location.city}</span>
                  </div>

                  <p className="global-location-description">
                    {location.description}
                  </p>
                </div>

                {/* Card footer */}
                <div className="global-location-footer">
                  <span className="global-location-coordinates">
                    {location.coordinates}
                  </span>

                  <span className="global-location-status">
                    <span />
                    <span>GLOBAL NETWORK</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <footer className="global-presence-footer">
          <div className="global-footer-symbol">
            <Network size={18} strokeWidth={1.6} />
          </div>

          <p>
            <strong>Global perspective.</strong>{' '}
            <span>Local understanding. Reliable delivery.</span>
          </p>

          <div className="global-footer-count">
            <span>06</span>
            <span>MARKETS</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default GlobalPresence;