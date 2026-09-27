import { useId } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';
import { SectionHeading, TextLink } from './UI';

export default function FAQSection() {
  const groupName = useId();
  return (
    <section className="section faq-section" id="faq" tabIndex={-1}>
      <div className="container faq-layout">
        <div>
          <SectionHeading eyebrow="A little prep. A lot of fun." title="First lap?" accent="We’ve got you." description="Everything you need to know before the helmet goes on." />
          <TextLink to="/contact#enquiry-form">Talk to our team</TextLink>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.id} name={groupName}>
              <summary><span className="faq-number">0{index + 1}</span><span>{item.question}</span><Plus size={19} aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
