import { asset } from '../utils/asset';

const CLIENTS = [
  { file: 'northgate.svg', name: 'Northgate Energy' },
  { file: 'vantage.svg', name: 'Vantage Oil & Gas' },
  { file: 'meridian.svg', name: 'Meridian Construction' },
  { file: 'apex.svg', name: 'Apex Infrastructure' },
  { file: 'strata.svg', name: 'Strata Industries' },
  { file: 'core.svg', name: 'Core Petrochem' },
  { file: 'summit.svg', name: 'Summit Facilities' },
  { file: 'orion.svg', name: 'Orion Marine' },
];

export default function ClientLogos() {
  return (
    <section className="client-logos" aria-label="Trusted by">
      <div className="container">
        <div className="client-logos__head">
          <span className="client-logos__eyebrow">Trusted on Projects For</span>
          <p className="client-logos__sub">
            Frontline HSE delivery across energy, construction &amp; infrastructure leaders.
          </p>
        </div>
        <ul className="client-logos__grid">
          {CLIENTS.map((c) => (
            <li className="client-logos__item" key={c.file}>
              <img
                className="client-logos__logo"
                src={asset(`assets/images/clients/${c.file}`)}
                alt={c.name}
                loading="lazy"
                decoding="async"
                width="220"
                height="64"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
