import { WhatsAppIcon } from './Icons';
import siteConfig from '../data/siteConfig';

export default function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href={siteConfig.urls.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with our team on WhatsApp (opens a new tab)">
      <WhatsAppIcon aria-hidden="true" />
      <span>Let’s talk racing</span>
    </a>
  );
}
