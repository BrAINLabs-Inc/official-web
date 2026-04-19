import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet } from 'lucide-react';

export const NewGrant: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
            <SEO title="New Grant | BrainLabs" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(-1)} 
                    className="gap-2 mb-8 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Button>

                <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-12 text-center shadow-xl">
                    <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                        <Wallet className="text-primary" size={32} />
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">New Research Grant</h1>
                    <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                        Apply for or register a new research grant. This module will allow you to track funding and deliverables.
                    </p>

                    <div className="w-full max-w-md mx-auto aspect-video rounded-2xl border border-dashed border-border bg-muted/30 flex items-center justify-center mb-8">
                        <span className="text-sm text-muted-foreground italic">Grant application form placeholder</span>
                    </div>

                    <Button onClick={() => navigate(-1)} className="px-8 py-6 rounded-full text-lg shadow-lg shadow-primary/20">
                        Return to Workspace
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};
