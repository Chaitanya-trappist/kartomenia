import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

export default function Dialog({ title, children, onClose, className = '', onKeyDown }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.querySelector('[data-autofocus]')?.focus();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const handleBackdrop = (event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`dialog ${className}`}
      aria-labelledby={titleId}
      onClick={handleBackdrop}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        } else {
          onKeyDown?.(event);
        }
      }}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
    >
      <div className="dialog-heading">
        <h2 id={titleId}>{title}</h2>
        <button type="button" className="icon-button" onClick={onClose} aria-label={`Close ${title}`}>
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
