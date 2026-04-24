import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section style={{ padding: '120px 20px', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '6rem', margin: 0, color: 'var(--navy)' }}>404</h1>
        <p style={{ fontSize: '1.25rem', margin: '16px 0 32px' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-gold">
          <i className="fas fa-home"></i> Back to Home
        </Link>
      </div>
    </section>
  );
}
