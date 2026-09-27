import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, Pencil, ShieldCheck } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQSection';
import { PageIntro, SectionHeading, ActionLink } from '../components/UI';
import { GROUP_SIZES, buildEnquiryDraft, validateEnquiry } from '../utils/enquiry';

export default function ContactPage() {
  const [data, setData] = useState({ name: '', phone: '', email: '', drivers: GROUP_SIZES[0], message: '' });
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null);
  const hadDraft = useRef(false);
  const draftHeading = useRef(null);

  useEffect(() => {
    if (draft) draftHeading.current?.focus();
    else if (hadDraft.current) document.getElementById('enquiry-name')?.focus();
    hadDraft.current = Boolean(draft);
  }, [draft]);

  const update = (event) => {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateEnquiry(data);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`enquiry-${firstError}`)?.focus();
      return;
    }
    setDraft(buildEnquiryDraft(data));
  };

  const fieldProps = (name) => ({
    id: `enquiry-${name}`,
    name,
    value: data[name],
    onChange: update,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `error-${name}` : undefined
  });

  return (
    <>
      <PageIntro eyebrow="We’ll meet you at the track" title="Your race" accent="starts here." description="Find us at Entertainland Mall, plan a visit with your people, or ask the team anything before your first lap." />
      <ContactSection showHeading={false} />
      <section className="section section--soft" id="enquiry-form" tabIndex={-1}>
        <div className="container enquiry-layout">
          <div>
            <SectionHeading eyebrow="Let’s talk racing" title="Big plans?" accent="Start a conversation." description="A visit with friends, a family day out, or a group booking. Tell us what you have in mind." />
            <div className="enquiry-reassurance"><MessageCircle size={23} aria-hidden="true" /><p>Your enquiry opens as a draft in WhatsApp, so you can review it before sending.</p></div>
            <div className="enquiry-reassurance"><ShieldCheck size={23} aria-hidden="true" /><p>Your details are not stored by this website. Nothing is sent until you press Send in WhatsApp.</p></div>
          </div>
          {draft ? (
            <div className="enquiry-form draft-panel">
              <span className="draft-icon"><MessageCircle size={26} aria-hidden="true" /></span>
              <h2 ref={draftHeading} tabIndex={-1}>Your message is ready.</h2>
              <p>Nothing has been sent yet. Open WhatsApp, review your message, then press Send to contact our team.</p>
              <pre className="draft-message">{draft.message}</pre>
              <ActionLink href={draft.url} external className="button--full">Open WhatsApp & review<ArrowUpRight size={18} aria-hidden="true" /></ActionLink>
              <button className="button button--outline button--full" type="button" onClick={() => setDraft(null)}><Pencil size={16} aria-hidden="true" />Edit my details</button>
            </div>
          ) : (
            <form className="enquiry-form" onSubmit={submit} noValidate>
              <h2>A few details, then you’re off.</h2>
              <p className="form-intro">Fields marked * are required.</p>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="enquiry-name">Your name *</label>
                  <input {...fieldProps('name')} type="text" autoComplete="name" required maxLength={80} placeholder="Your full name" />
                  {errors.name && <p className="field-error" id="error-name" role="alert">{errors.name}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-phone">Phone number *</label>
                  <input {...fieldProps('phone')} type="tel" autoComplete="tel" required maxLength={30} placeholder="+91 98765 43210" />
                  {errors.phone && <p className="field-error" id="error-phone" role="alert">{errors.phone}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-email">Email <span>(optional)</span></label>
                  <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" />
                  {errors.email && <p className="field-error" id="error-email" role="alert">{errors.email}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-drivers">Group size</label>
                  <select {...fieldProps('drivers')}>{GROUP_SIZES.map((size) => <option key={size}>{size}</option>)}</select>
                  {errors.drivers && <p className="field-error" id="error-drivers" role="alert">{errors.drivers}</p>}
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="enquiry-message">What do you have in mind? <span>(optional)</span></label>
                  <textarea {...fieldProps('message')} rows={4} maxLength={2000} placeholder="Preferred date, type of race, or anything you’d like to ask…" />
                  {errors.message && <p className="field-error" id="error-message" role="alert">{errors.message}</p>}
                </div>
              </div>
              <button type="submit" className="button button--primary button--full"><MessageCircle size={18} aria-hidden="true" />Prepare WhatsApp enquiry<ArrowUpRight size={18} aria-hidden="true" /></button>
              <p className="form-note">You will review the message before opening WhatsApp.</p>
            </form>
          )}
        </div>
      </section>
      <FAQSection />
    </>
  );
}
