import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { TakeashotGenerator } from '@/themes/default/blocks';
import { getMetadata } from '@/shared/lib/seo';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
    metadataKey: 'takeashot.pet_companion.metadata',
    canonicalUrl: '/pet-companion',
});

export default async function PetCompanionPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    await getTranslations('takeashot.pet_companion');

    const page: DynamicPage = {
        sections: {
            generator: {
                component: <TakeashotGenerator featureKey="pet_companion" />,
            },
        },
    };

    const Page = await getThemePage('dynamic-page');

    return <Page locale={locale} page={page} />;
}
