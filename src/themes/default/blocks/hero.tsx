import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { SocialAvatars } from './social-avatars';

export function Hero({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const highlightText = section.highlight_text ?? '';
  let texts = null;
  if (highlightText) {
    texts = section.title?.split(highlightText, 2);
  }

  return (
    <section
      id={section.id}
      className={cn(
        'min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 pt-16 font-sans text-gray-900 overflow-hidden relative',
        section.className,
        className
      )}
    >
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none z-0" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {section.announcement && (
        <Link
          href={section.announcement.url || ''}
          target={section.announcement.target || '_self'}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-bold text-indigo-600 border border-indigo-100 shadow-sm">
            {section.announcement.title}
          </span>
        </Link>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-16 text-center">
        {texts && texts.length > 0 ? (
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            {texts[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 ml-2">
              {highlightText}
            </span>
            {texts[1]}
          </h1>
        ) : (
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            {section.title}
          </h1>
        )}

        <p
          className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
        />

        {section.buttons && (
          <div className="flex items-center justify-center gap-4">
            {section.buttons.map((button, idx) => (
              <div key={idx} className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-900 to-black rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <Link
                  href={button.url ?? ''}
                  target={button.target ?? '_self'}
                  className="relative px-12 py-5 bg-gray-900 text-white text-xl font-bold rounded-full hover:bg-black transition duration-300 shadow-xl flex items-center justify-center"
                >
                  {button.icon && <SmartIcon name={button.icon as string} />}
                  <span>{button.title}</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {section.tip && (
          <p
            className="text-muted-foreground mt-6 block text-center text-sm"
            dangerouslySetInnerHTML={{ __html: section.tip ?? '' }}
          />
        )}

        {section.show_avatars && (
          <SocialAvatars tip={section.avatars_tip || ''} />
        )}
        {section.image && (section.image_invert?.src || section.image?.src) && (
          <div className="mt-20 relative w-full max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-white transform hover:scale-[1.01] transition duration-500">
            <div className="aspect-w-16 aspect-h-9 bg-gray-50">
              <Image
                src={section.image?.src || section.image_invert?.src || ''}
                alt={section.image?.alt || section.image_invert?.alt || ''}
                width={section.image?.width || section.image_invert?.width || 1200}
                height={section.image?.height || section.image_invert?.height || 630}
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
                quality={75}
              />
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
