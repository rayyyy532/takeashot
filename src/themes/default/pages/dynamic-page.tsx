import { getThemeBlock } from '@/core/theme';
import type { DynamicPage as DynamicPageType } from '@/shared/types/blocks/landing';
import {
  CTA,
  FAQ,
  Features,
  FeaturesAccordion,
  FeaturesFlow,
  FeaturesList,
  FeaturesMedia,
  FeaturesStep,
  Hero,
  Logos,
  Showcases,
  ShowcasesFlow,
  Stats,
  Subscribe,
  TakeashotFeatureCards,
  TakeashotGenerator,
  Testimonials,
} from '@/themes/default/blocks';

export default async function DynamicPage({
  locale,
  page,
  data,
}: {
  locale?: string;
  page: DynamicPageType;
  data?: Record<string, any>;
}) {
  return (
    <>
      {page.title && !page.sections?.hero && (
        <h1 className="sr-only">{page.title}</h1>
      )}
      {page?.sections &&
        (await Promise.all(
          Object.keys(page.sections).map(async (sectionKey: string) => {
            const section = page.sections?.[sectionKey];
            if (!section) {
              return null;
            }

            // block name
            const block = section.block || section.id || sectionKey;

            const element = await (async () => {
              switch (block) {
                case 'hero':
                  return <Hero section={section} />;
                case 'logos':
                  return <Logos section={section} />;
                case 'features':
                  return <Features section={section} />;
                case 'features-list':
                  return <FeaturesList section={section} />;
                case 'features-accordion':
                  return <FeaturesAccordion section={section} />;
                case 'features-flow':
                  return <FeaturesFlow section={section} />;
                case 'features-media':
                  return <FeaturesMedia section={section} />;
                case 'features-step':
                  return <FeaturesStep section={section} />;
                case 'showcases':
                  return <Showcases section={section} />;
                case 'showcases-flow':
                  return <ShowcasesFlow section={section} />;
                case 'stats':
                  return <Stats section={section} />;
                case 'testimonials':
                  return <Testimonials section={section} />;
                case 'faq':
                  return <FAQ section={section} />;
                case 'cta':
                  return <CTA section={section} />;
                case 'subscribe':
                  return <Subscribe section={section} />;
                case 'takeashot-feature-cards':
                  return <TakeashotFeatureCards section={section} />;
                case 'takeashot-generator':
                  return (
                    <TakeashotGenerator
                      featureKey={section.featureKey || 'dream_frame'}
                    />
                  );

                default:
                  try {
                    if (section.component) {
                      return section.component;
                    }

                    const DynamicBlock = await getThemeBlock(block);
                    return (
                      <DynamicBlock
                        section={section}
                        {...(data || section.data || {})}
                      />
                    );
                  } catch (error) {
                    console.log(`Dynamic block "${block}" not found`);
                    return null;
                  }
              }
            })();

            return element ? (
              <div key={sectionKey} id={section.id || sectionKey}>
                {element}
              </div>
            ) : null;
          })
        ))}
    </>
  );
}
