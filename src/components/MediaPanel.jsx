import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function MediaPanel({ character }) {
  const [showVideo, setShowVideo] = useState(false);
  return <section className="panel">
    <h2>Multimedia</h2>
    {showVideo && character.video
      ? <iframe className="guide-video" src={`https://www.youtube.com/embed/${character.video}`}
          title={`Video de ${character.name}`} allowFullScreen loading="lazy" />
      : <img className="guide-image" src={character.image} alt={`Ilustración de ${character.name}`} />}
    {character.video
      ? <Button className="mt-3" onClick={() => setShowVideo(!showVideo)}>{showVideo ? 'Ver imagen' : 'Ver video'}</Button>
      : <a className="d-inline-block mt-3" href="https://www.youtube.com/@ProjectMoonOfficial">Ver canal oficial de Project Moon</a>}
  </section>;
}
