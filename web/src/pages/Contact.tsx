import { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Send,
  Clock,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { IconBox } from '@/components/ui/IconBox';
import { accentOrder } from '@/lib/accents';
import { LinkButton } from '@/components/ui/LinkButton';
import { contact } from '@/data/general';

const inputCls =
  'w-full rounded-none border border-neutral-300 bg-transparent px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none dark:border-neutral-800 dark:text-white dark:focus:border-indigo-400 transition-colors';

const channels = [
  { icon: Mail, label: 'Email', value: 'contact@brainlabs.inc', href: contact.email },
  { icon: Github, label: 'GitHub', value: 'BrAINLabs-Inc', href: contact.github },
  { icon: Linkedin, label: 'LinkedIn', value: 'BrAIN Labs Inc.', href: contact.linkedin },
];

type FormStatus = 'idle' | 'sending' | 'sent';

const emptyForm = { name: '', email: '', subject: '', type: 'general', message: '' };

export const Contact = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1400));
    setStatus('sent');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="bg-transparent transition-colors">
      <SEO
        title="Contact Us"
        description="Get in touch with BrAIN Labs for research collaborations, partnerships, internship inquiries, or any questions about our AI and neuroscience work."
        keywords={[
          'Contact BrAIN Labs',
          'AI Research Collaboration',
          'Research Partnership',
          'Neuroscience Lab Contact',
        ]}
      />

      <PageHero
        eyebrow="GET IN TOUCH"
        icon={<MessageSquare size={13} className="text-indigo-600 dark:text-indigo-400" />}
        title="Let's start a conversation."
        description="Whether you're looking to collaborate, partner, or simply learn more about our research, we're always happy to connect."
        stats={[
          { value: '3-5', label: 'Business Days Reply Time' },
          { value: 'Global', label: 'Collaborations Welcome', accent: true },
        ]}
      />

      <Section>
        <div className="grid grid-cols-1 border-l border-t border-neutral-200 dark:border-neutral-800 lg:grid-cols-2">
          <div className="border-b border-r border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950 md:p-12">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              DIRECT CHANNELS
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Reach Us Directly
            </h2>
            <p className="mt-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              Response timeframe: 3-5 business days
            </p>

            <div className="mt-8 space-y-3">
              {channels.map(({ icon: Icon, label, value, href }, idx) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-neutral-200 bg-neutral-50/50 p-4 transition-colors hover:border-indigo-600 dark:border-neutral-800 dark:bg-neutral-900/30 dark:hover:border-indigo-400"
                >
                  <div className="flex items-center gap-3">
                    <IconBox
                      icon={<Icon size={16} />}
                      accent={accentOrder[idx % accentOrder.length]}
                      size="sm"
                    />
                    <div>
                      <div className="font-mono text-[10px] uppercase text-neutral-400">
                        {label}
                      </div>
                      <div className="text-sm font-semibold text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {value}
                      </div>
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-neutral-400 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  />
                </a>
              ))}
            </div>

            <div className="mt-8 border border-neutral-200 dark:border-neutral-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9117578!2d79.97279!3d6.914849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e352ea8f8c8!2sSLIIT!5e0!3m2!1sen!2slk!4v1718000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BrAIN Labs Location - SLIIT"
              />
            </div>

            <div className="mt-6 space-y-2.5 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span>SLIIT, New Kandy Road, Malabe, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span>Reply timeframe: 3-5 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span>Remote &amp; global collaborations welcome</span>
              </div>
            </div>
          </div>

          <div className="border-b border-r border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950 md:p-12">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              CONTACT FORM
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Send a Message
            </h2>

            {status === 'sent' ? (
              <div className="mt-8 border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-indigo-600 text-white">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                  Message Sent
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Thank you for reaching out. We'll review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData(emptyForm);
                  }}
                  className="mt-6 font-mono text-xs text-indigo-600 underline dark:text-indigo-400"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Dr. Jane Smith"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@university.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="type"
                      className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                    >
                      INQUIRY TYPE
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`${inputCls} cursor-pointer bg-white dark:bg-neutral-950`}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="collaboration">Research Collaboration</option>
                      <option value="internship">Internship / PhD</option>
                      <option value="partnership">Industry Partnership</option>
                      <option value="media">Media &amp; Press</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                    >
                      SUBJECT *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your research interests, proposal, or question..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <LinkButton
                  type="submit"
                  disabled={status === 'sending'}
                  full
                  icon={status === 'sending' ? undefined : <Send size={14} />}
                >
                  {status === 'sending' ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </LinkButton>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};
