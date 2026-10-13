import { useState } from 'react';
import './customer-carousel.css';

interface Customer {
  name: string;
  logo: string;
  url?: string;
}

const customers: Customer[] = [
  {
    name: 'Ericsson',
    logo: '/images/client-logo/1.png',
  },
  {
    name: 'AT&T',
    logo: '/images/client-logo/2.png',
  },
//   {
//     name: 'Idea',
//     logo: '/images/client-logo/3.png',
//   },
  {
    name: 'Safaricom',
    logo: '/images/client-logo/4.png',
  },
  {
    name: 'Vi',
    logo: '/images/client-logo/9.png',
  },
  {
    name: 'Samsung',
    logo: '/images/client-logo/6.png',
  },
  {
    name: 'T-Mobile',
    logo: '/images/client-logo/7.png',
  },
  {
    name: 'Nokia',
    logo: '/images/client-logo/8.png',
  },
];

export function CustomerCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the logos to create a seamless infinite carousel.
  const carouselItems = [...customers, ...customers];

  return (
    <section
      className="customer-section"
      id="customers"
      aria-labelledby="customer-heading"
    >
      <div className="customer-container">
        <div className="customer-header">
          <span className="customer-eyebrow">
            TRUSTED PARTNERS
          </span>

          <h2 id="customer-heading" className="customer-title">
            Trusted by teams building
            <span className="customer-title-highlight">
              {' '}what comes next.
            </span>
          </h2>

          <p className="customer-description">
            Working alongside ambitious organizations to deliver
            reliable connectivity, infrastructure, and technology
            solutions.
          </p>
        </div>

        <div
          className={`customer-carousel ${
            isPaused ? 'is-paused' : ''
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setIsPaused(false);
            }
          }}
        >
          <div className="customer-carousel-viewport">
            <div className="customer-carousel-track">
              {carouselItems.map((customer, index) => {
                const isDuplicate = index >= customers.length;

                return (
                  <div
                    key={`${customer.name}-${index}`}
                    className="customer-logo-item"
                    aria-hidden={isDuplicate ? true : undefined}
                  >
                    {customer.url && !isDuplicate ? (
                      <a
                        className="customer-logo-link"
                        href={customer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isDuplicate ? -1 : undefined}
                        aria-label={`Visit ${customer.name} website`}
                      >
                        <img
                          src={customer.logo}
                          alt={customer.name}
                          className="customer-logo"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </a>
                    ) : (
                      <div className="customer-logo-link">
                        <img
                          src={customer.logo}
                          alt={isDuplicate ? '' : customer.name}
                          className="customer-logo"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="customer-footer">
          <span className="customer-footer-line" />

          <p>
            Built on trust. Driven by engineering.
          </p>

          <span className="customer-footer-line" />
        </div>
      </div>
    </section>
  );
}