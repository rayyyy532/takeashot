import React from 'react';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function TakeashotFeatureCards({
    section,
    className,
}: {
    section: Section;
    className?: string;
}) {
    const buttonText = section.button_text || 'Try now';

    const categoryByPath: Record<string, string> = {
        '/dream-frame': 'dream_frame',
        '/ai-couple': 'couple',
        '/future-baby': 'special',
        '/pet-companion': 'pet_companion',
    };
    return (
        <section
            id={section.id}
            className={cn('py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto', className)}
        >
            {section.title && (
                <h2 className="text-3xl md:text-4xl font-extrabold text-left mb-12 text-foreground">
                    {section.title}
                </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items?.map((item, idx) => (
                    <Link
                        key={idx}
                        href={(() => {
                            const url = item.url ?? '#';
                            const category = categoryByPath[url];
                            if (!category || url === '#') return url;
                            return `${url}?category=${encodeURIComponent(category)}`;
                        })()}
                        className="group relative overflow-hidden rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-8 flex flex-col justify-between h-80"
                    >
                        <div>
                            <div
                                className={cn(
                                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg',
                                    item.className || 'bg-primary shadow-primary/20'
                                )}
                            >
                                {item.icon && (
                                    <SmartIcon name={item.icon as string} className="w-7 h-7 text-white" />
                                )}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-foreground relative inline-block">
                                {item.title}
                                <span
                                    className={cn(
                                        'absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full',
                                        item.className?.replace('bg-', 'bg-') || 'bg-primary'
                                    )}
                                ></span>
                            </h3>
                            <p className="text-muted-foreground text-lg mt-2">
                                {item.description}
                            </p>
                        </div>
                        <div className="mt-6 flex items-center text-foreground font-bold group-hover:translate-x-2 transition duration-300">
                            {buttonText}{' '}
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center ml-2 group-hover:bg-accent">
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
