import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { team } from '@/data/team';
import { CollaborationIcon } from '@/components/ui/PageIcons';
import { Mail, Linkedin, Globe, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';

export const Team = () => {
    // Separate PI/director from rest if possible (by checking position string)
    const sorted = [...team].sort((a, b) => {
        const rank = (pos: string) => {
            if (/director|principal|pi\b|professor|dr\./i.test(pos)) return 0;
            if (/supervisor|co-supervisor/i.test(pos)) return 1;
            return 2;
        };
        return rank(a.position) - rank(b.position);
    });

    return (
        <div className="min-h-screen">
            <SEO
                title="Our Team"
                description="Meet the multidisciplinary team of experts pushing the boundaries of AI and neuroscience research at BrAIN Labs."
                keywords={['AI Researchers', 'Neuroscience Team', 'BrAIN Labs Team', 'Research Scientists']}
            />

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
                <div className="absolute left-0 top-20 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl lg:pl-4"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/15 text-xs font-medium uppercase tracking-wide">
                            <CollaborationIcon size={14} />
                            Our Team
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                            Meet the{' '}
                            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                Researchers
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            A multidisciplinary team of experts pushing the boundaries of AI and neuroscience research.
                        </p>

                        {/* Team count */}
                        <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground text-base">{team.length}</span>
                            <span>researchers across AI, ML, and neuroscience</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Team Grid ────────────────────────────────────────── */}
            <section className="py-8 md:py-14">
                <div className="container mx-auto px-4 lg:pl-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {sorted.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.07, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="h-full border-border/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group bg-card/80">
                                    <CardHeader className="pb-3 pt-6 px-6">
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="shrink-0">
                                                {member.image ? (
                                                    <img
                                                        src={member.image}
                                                        alt={member.name}
                                                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-border group-hover:ring-primary/40 transition-all duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center ring-1 ring-border group-hover:ring-primary/30 transition-all">
                                                        <span className="text-xl font-bold text-primary/80">
                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <CardTitle className="text-base font-semibold mb-1 group-hover:text-primary transition-colors leading-snug">
                                                    {member.name}
                                                </CardTitle>
                                                <CardDescription className="text-xs font-semibold text-primary mb-0.5 uppercase tracking-wide">
                                                    {member.position}
                                                </CardDescription>
                                                <p className="text-xs text-muted-foreground/80 truncate">{member.university}</p>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="px-6 pb-6 space-y-4">
                                        {/* Research Areas */}
                                        <div className="space-y-2">
                                            <div className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest">
                                                Research Areas
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {member.researchInterests.slice(0, 4).map((interest, i) => (
                                                    <Badge
                                                        key={i}
                                                        variant="secondary"
                                                        className="bg-primary/6 text-foreground/80 hover:bg-primary/12 hover:text-primary text-[10px] px-2 py-0.5 font-medium border border-primary/10 hover:border-primary/25 transition-colors cursor-default"
                                                    >
                                                        {interest}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-4 pt-3 border-t border-border/40">
                                            {member.contact && (
                                                <a
                                                    href={`mailto:${member.contact}`}
                                                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group/link py-0.5"
                                                >
                                                    <Mail size={13} className="group-hover/link:scale-110 transition-transform" />
                                                    Email
                                                </a>
                                            )}
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin.startsWith('http') ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group/link py-0.5"
                                                >
                                                    <Linkedin size={13} className="group-hover/link:scale-110 transition-transform" />
                                                    LinkedIn
                                                </a>
                                            )}
                                            {member.website && (
                                                <a
                                                    href={member.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group/link py-0.5"
                                                >
                                                    <Globe size={13} className="group-hover/link:scale-110 transition-transform" />
                                                    Website
                                                </a>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="py-20 border-t border-border/40">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto text-center space-y-6"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
                            <UserPlus size={24} className="text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Join Our Team</h2>
                        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                            We regularly accept interns and PhD candidates. Check out our open positions or get in touch regarding opportunities.
                        </p>
                        <Link to="/contact">
                            <Button className="h-10 px-7 text-sm bg-foreground text-background hover:bg-foreground/90 rounded-full shadow-md hover:shadow-lg transition-all">
                                <Mail className="mr-2" size={14} />
                                Contact Us
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
