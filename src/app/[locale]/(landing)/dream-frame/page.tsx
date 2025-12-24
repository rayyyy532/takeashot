import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { TakeashotGenerator } from '@/themes/default/blocks';
import { getMetadata } from '@/shared/lib/seo';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
    metadataKey: 'takeashot.dream_frame.metadata',
    canonicalUrl: '/dream-frame',
});

export default async function DreamFramePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    await getTranslations('takeashot.dream_frame');

    const page: DynamicPage = {
        sections: {
            generator: {
                component: <TakeashotGenerator featureKey="dream_frame" />,
            },
        },
    };

    const Page = await getThemePage('dynamic-page');

    return <Page locale={locale} page={page} />;
}
