import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Clock,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { contact } from '@/data/general';

const inputCls =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none ring-0 transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20';

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mahima.w@sliit.lk',
    href: contact.email,
    description: 'Reach us directly for collaborations or inquiries.',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'BrAINLabs-Inc',
    href: contact.github,
    description: 'Explore our open-source projects and contributions.',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'BrAIN Labs',
    href: contact.linkedin,
    description: 'Connect with us professionally and follow updates.',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    value: '@brainlabs',
    href: contact.twitter,
    description: 'Latest news, threads, and research highlights.',
  },
];

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export const Contact = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general',
    message: '',
  });

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
    <div className="min-h-screen">
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

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
        <div className="absolute right-0 top-0 w-[28rem] h-[28rem] bg-primary/4 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl lg:pl-4"
          >
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/15 text-xs font-medium uppercase tracking-wide">
              <MessageSquare size={14} />
              Get in Touch
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
              Let's Start a{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Whether you're looking to collaborate, partner, or simply learn more about our
              research; we're always happy to connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Get in Touch ────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="rounded-3xl border border-border/60 bg-card/60 shadow-lg backdrop-blur-sm overflow-hidden">
              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border/40">

                {/* Left: Reach Us Directly */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/15">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Reach Us Directly</h2>
                      <p className="text-xs text-muted-foreground">We respond within 3–5 business days</p>
                    </div>
                  </div>

                  {/* Channel List */}
                  <div className="space-y-3 mb-6">
                    {channels.map(({ icon: Icon, label, value, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-xl border border-border/50 bg-background/60 p-3.5 transition-all hover:border-primary/40 hover:bg-background hover:shadow-md"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                          <Icon size={18} className="text-foreground/70 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground">{label}</span>
                            <ExternalLink size={12} className="shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                          </div>
                          <p className="text-xs text-primary/80 font-medium">{value}</p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Map */}
                  <div className="overflow-hidden rounded-2xl border border-border/50 bg-muted mb-5">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9117578!2d79.97279!3d6.914849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e352ea8f8c8!2sSLIIT!5e0!3m2!1sen!2slk!4v1718000000000"
                      width="100%"
                      height="180"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="BrAIN Labs Location - SLIIT"
                    />
                  </div>

                  {/* Quick Contact Info */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <MapPin size={13} className="text-primary/70 shrink-0" />
                      <span>SLIIT, New Kandy Road, Malabe, Sri Lanka</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Clock size={13} className="text-primary/70 shrink-0" />
                      <span>Reply within 3–5 business days</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Phone size={13} className="text-primary/70 shrink-0" />
                      <span>Remote collaboration welcome</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Send a Message */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="p-6 md:p-8 bg-background/30"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/15">
                      <Send className="text-primary" size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Send a Message</h2>
                      <p className="text-xs text-muted-foreground">Fill out the form below</p>
                    </div>
                  </div>

                  {status === 'sent' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-4 py-10 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                        <CheckCircle2 size={28} className="text-primary" />
                      </div>
                      <h3 className="text-base font-bold">Message Sent!</h3>
                      <p className="text-xs text-muted-foreground max-w-[240px]">
                        Thank you for reaching out. We'll review your message and get back to you within 3–5 business days.
                      </p>
                      <button
                        onClick={() => {
                          setStatus('idle');
                          setFormData({ name: '', email: '', subject: '', type: 'general', message: '' });
                        }}
                        className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-3.5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Full Name *
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
                          <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Email Address *
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

                      <div className="grid gap-3.5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label htmlFor="type" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Inquiry Type
                          </label>
                          <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={inputCls}
                          >
                            <option value="general">General Inquiry</option>
                            <option value="collaboration">Research Collaboration</option>
                            <option value="internship">Internship / PhD</option>
                            <option value="partnership">Industry Partnership</option>
                            <option value="media">Media & Press</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="subject" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Subject *
                          </label>
                          <input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            placeholder="What's this about?"
                            value={formData.subject}
                            onChange={handleChange}
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Message *
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

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-md transition-all hover:bg-foreground/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-muted-foreground">
                        We respect your privacy. Your information is never shared.
                      </p>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
