import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { TakeashotGenerator } from '@/themes/default/blocks';
import { getMetadata } from '@/shared/lib/seo';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
    metadataKey: 'takeashot.ai_couple.metadata',
    canonicalUrl: '/ai-couple',
});

export default async function AiCouplePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    await getTranslations('takeashot.ai_couple');

    const page: DynamicPage = {
        sections: {
            generator: {
                component: <TakeashotGenerator featureKey="ai_couple" />,
            },
        },
    };

    const Page = await getThemePage('dynamic-page');

    return <Page locale={locale} page={page} />;
}
