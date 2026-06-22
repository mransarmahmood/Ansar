import { asset } from '../utils/asset';

/* Full designed service poster (16:9) shown as a contained showcase band. */
export default function ServicePoster({ src, alt }) {
  return (
    <section className="svc-poster" aria-label={alt}>
      <div className="container">
        <figure className="svc-poster__frame">
          <img className="svc-poster__img" src={asset(src)} alt={alt} loading="eager" decoding="async" />
        </figure>
      </div>
    </section>
  );
}
