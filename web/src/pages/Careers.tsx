import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { careersBenefits, careersFaqs } from '@/data/general';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/15 text-xs font-medium uppercase tracking-wide">
        {children}
    </div>
);

export const Careers = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Careers at BrAIN Labs"
                description="Join BrAIN Labs and contribute to cutting-edge AI and neuroscience research. Explore open positions and opportunities."
                keywords={['BrAIN Labs Careers', 'AI Research Jobs', 'Neuroscience Jobs', 'Research Positions', 'Internships']}
            />

            {/* ── Hero ─────────────────────────────────────────────── */}
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
                        <SectionLabel>
                            <Briefcase size={14} />
                            Join Our Team
                        </SectionLabel>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                            Build the Future of{' '}
                            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                AI Research
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Join a world-class team of researchers and engineers working at the
                            intersection of artificial intelligence and neuroscience.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Benefits ─────────────────────────────────────────── */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 lg:pl-8">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/15">
                                    <CheckCircle2 className="text-primary" size={22} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Why Join BrAIN Labs</h2>
                            </div>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl border-l-2 border-primary/30 pl-4">
                                We offer an environment where curiosity meets impact. Here's what makes our team special.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {careersBenefits.map((benefit, idx) => {
                                const BenefitIcon = (Icons as any)[benefit.iconName] || CheckCircle2;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <Card className="h-full transition-all duration-300 border-border/50 hover:border-primary/40 hover:shadow-md group bg-card/60">
                                            <CardHeader className="space-y-4 pb-4">
                                                <div className="p-3 rounded-xl bg-primary/8 w-fit group-hover:bg-primary/14 transition-colors">
                                                    <BenefitIcon className="text-primary" size={22} />
                                                </div>
                                                <p className="text-base font-semibold leading-snug text-foreground/90">
                                                    {benefit.title}
                                                </p>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {benefit.description}
                                                </p>
                                            </CardHeader>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Current Openings ─────────────────────────────────── */}
            <section className="py-16 bg-muted/30 border-y border-border/40">
                <div className="container mx-auto px-4 lg:pl-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex flex-col items-center gap-3 mb-10">
                            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/15">
                                <Briefcase className="text-primary" size={22} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Current Openings</h2>
                        </div>

                        <Card className="border-border/50 bg-card/60">
                            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="p-4 rounded-full bg-primary/8 border border-primary/15 mb-6">
                                    <Briefcase size={32} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No positions listed yet</h3>
                                <p className="text-sm text-muted-foreground max-w-md mb-6">
                                    We're always looking for talented researchers and engineers. Check back soon for new opportunities, or send us your CV for future consideration.
                                </p>
                                <a href="mailto:mahima.w@sliit.lk">
                                    <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 h-10 text-sm font-medium shadow-md hover:shadow-lg transition-all">
                                        Send Your CV
                                        <ArrowRight size={14} className="ml-2" />
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="py-20">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center space-y-6"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
                            <Users size={24} className="text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to Shape the Future?</h2>
                        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                            Whether you're a PhD student, postdoc, or experienced researcher, we'd love to hear from you. Drop us a line and let's explore how you can contribute.
                        </p>
                        <Link to="/contact">
                            <Button className="h-10 px-7 text-sm bg-foreground text-background hover:bg-foreground/90 rounded-full shadow-md hover:shadow-lg transition-all">
                                Get in Touch
                                <ArrowRight size={14} className="ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────────── */}
            <section className="py-16 bg-muted/30 border-t border-border/50">
                <div className="container mx-auto px-4 lg:pl-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="flex flex-col items-center gap-3 mb-8">
                            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/15">
                                <GraduationCap className="text-primary" size={22} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Common Questions</h2>
                        </div>

                        <Accordion type="single" collapsible className="space-y-3">
                            {careersFaqs.map((item, idx) => (
                                <AccordionItem
                                    key={idx}
                                    value={`item-${idx}`}
                                    className="border border-border/60 rounded-xl px-5 bg-background/60 hover:border-primary/30 transition-colors"
                                >
                                    <AccordionTrigger className="text-base font-medium hover:text-primary transition-colors py-4 hover:no-underline">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
