import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Image as ImageIcon } from 'lucide-react';
import Dialog from './Dialog';
import { GALLERY_CATEGORIES, GALLERY_MEDIA } from '../data/galleryData';
import { SectionHeading, TextLink } from './UI';

function VideoPlayer({ media }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="video-player">
      {failed ? (
        <div className="media-error" role="alert">
          <p>This video could not be played.</p>
          <p>Please try another browser, or <a href={media.src} target="_blank" rel="noopener noreferrer">open the video directly</a>.</p>
        </div>
      ) : (
        <video
          src={media.src}
          poster={media.poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          aria-label={media.title}
          onError={(event) => { console.error('Unable to play Kartomania video:', media.src, event.currentTarget.error); setFailed(true); }}
        />
      )}
    </div>
  );
}

export function MediaDialog({ items, initialId, onClose }) {
  const [index, setIndex] = useState(() => items.findIndex((item) => item.id === initialId));
  const media = items[index];
  const move = (direction) => setIndex((current) => (current + direction + items.length) % items.length);

  return (
    <Dialog
      title={media.title}
      onClose={onClose}
      className="media-dialog"
      onKeyDown={(event) => {
        if (media.type === 'image' && items.length > 1 && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      {media.type === 'video'
        ? <VideoPlayer key={media.id} media={media} />
        : <img className="lightbox-image" src={media.src} alt={media.description} />}
      <div className="media-dialog-footer">
        <p>{media.description}</p>
        {items.length > 1 && (
          <div className="lightbox-controls">
            <button type="button" className="icon-button" aria-label="Previous capture" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button>
            <span aria-live="polite">{index + 1} / {items.length}</span>
            <button type="button" className="icon-button" aria-label="Next capture" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default function GallerySection({ preview = false }) {
  const [category, setCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const items = preview
    ? [GALLERY_MEDIA[0], GALLERY_MEDIA[2], GALLERY_MEDIA[3]]
    : GALLERY_MEDIA.filter((item) => category === 'All' || item.category === category);

  return (
    <section className="section gallery-section" id="gallery" tabIndex={-1}>
      <div className="container">
        <SectionHeading eyebrow="More than a lap. A feeling." title="This is what" accent="the rush looks like.">
          {preview && <TextLink to="/gallery">Go trackside</TextLink>}
        </SectionHeading>
        {!preview && (
          <div className="gallery-toolbar">
            <div className="filter-group" role="group" aria-label="Filter gallery">
              {GALLERY_CATEGORIES.map((value) => (
                <button type="button" key={value} aria-pressed={category === value} onClick={() => { setCategory(value); setSelectedId(null); }}>{value}</button>
              ))}
            </div>
            <p role="status">{items.length} {items.length === 1 ? 'capture' : 'captures'}</p>
          </div>
        )}
        <div className={`gallery-grid${preview ? ' gallery-grid--preview' : ''}`}>
          {items.map((item) => (
            <button className={`gallery-card${item.type === 'video' ? ' gallery-card--video' : ''}`} type="button" key={item.id} onClick={() => setSelectedId(item.id)} aria-label={`${item.type === 'video' ? 'Watch' : 'View'} ${item.title}`} aria-haspopup="dialog">
              <img src={item.type === 'video' ? item.poster : item.src} alt="" width="1024" height="682" loading="lazy" decoding="async" />
              <span className="gallery-category">{item.category}</span>
              <span className="gallery-card-icon">{item.type === 'video' ? <Play size={20} fill="currentColor" aria-hidden="true" /> : <ImageIcon size={18} aria-hidden="true" />}</span>
              <span className="gallery-card-caption"><strong>{item.title}</strong><ArrowUpRight size={20} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>
      {selectedId && <MediaDialog items={items} initialId={selectedId} onClose={() => setSelectedId(null)} />}
    </section>
  );
}
