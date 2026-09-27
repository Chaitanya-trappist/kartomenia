import { ArrowRight, ArrowUpRight, Check, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import siteConfig from '../data/siteConfig';

export function ActionLink({ to, href, children, variant = 'primary', className = '', external = false, ...props }) {
  const classes = `button button--${variant} ${className}`.trim();
  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }
  return (
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
      {children}
    </a>
  );
}

export function BookingLink({ children = 'Book a race', className = '', variant = 'primary', ...props }) {
  return (
    <ActionLink href={siteConfig.urls.booking} external variant={variant} className={className} {...props}>
      {children}<ArrowUpRight size={18} aria-hidden="true" />
      <span className="sr-only"> (opens RaceFacer in a new tab)</span>
    </ActionLink>
  );
}

export function SectionHeading({ eyebrow, title, accent, description, children, light = false }) {
  return (
    <div className={`section-heading-row${light ? ' is-light' : ''}`}>
      <div className="section-heading-copy">
        {eyebrow && <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>}
        <h2 className="section-title">{title}{accent && <> <span>{accent}</span></>}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function PageIntro({ eyebrow, title, accent, description, children }) {
  return (
    <section className="page-intro">
      <div className="page-intro-pattern" aria-hidden="true" />
      <div className="container page-intro-inner">
        <div>
          <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
          <h1>{title} <span>{accent}</span></h1>
          {description && <p className="page-intro-description">{description}</p>}
        </div>
        {children || <Flag className="page-intro-flag" strokeWidth={1} aria-hidden="true" />}
      </div>
    </section>
  );
}

export function CheckList({ items, className = '' }) {
  return (
    <ul className={`check-list ${className}`}>
      {items.map((item) => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  );
}

export function TextLink({ to, children, className = '' }) {
  return <Link className={`text-link ${className}`} to={to}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}
