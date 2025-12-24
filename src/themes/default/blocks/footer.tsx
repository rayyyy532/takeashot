import { Link } from '@/core/i18n/navigation';
import {
  BrandLogo,
  BuiltWith,
  Copyright,
  LocaleSelector,
  ThemeToggler,
} from '@/shared/blocks/common';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { NavItem } from '@/shared/types/blocks/common';
import { Footer as FooterType } from '@/shared/types/blocks/landing';

export function Footer({ footer }: { footer: FooterType }) {
  return (
    <footer
      id={footer.id}
      className={`bg-white border-t border-gray-100 mt-12 py-8 ${footer.className || ''} overflow-x-hidden`}
      // overflow-x-hidden防止-footer-撑出水平滚动条
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="text-center text-sm text-gray-500">
          {footer.copyright ? (
            <span dangerouslySetInnerHTML={{ __html: footer.copyright }} />
          ) : footer.brand ? (
            <Copyright brand={footer.brand} />
          ) : null}
        </div>

        {(footer.show_built_with !== false ||
          footer.show_theme !== false ||
          footer.show_locale !== false ||
          footer.agreement ||
          footer.social ||
          footer.nav) && (
          <div className="mt-6 space-y-6">
            <div className="flex min-w-0 flex-wrap items-center justify-center gap-4 sm:gap-8">
              {footer.show_built_with !== false ? <BuiltWith /> : null}
              {footer.show_theme !== false ? (
                <ThemeToggler type="toggle" />
              ) : null}
              {footer.show_locale !== false ? (
                <LocaleSelector type="button" />
              ) : null}
            </div>

            {(footer.agreement || footer.social) && (
              <div className="flex min-w-0 flex-wrap items-center justify-center gap-4">
                {footer.agreement ? (
                  <div className="flex min-w-0 flex-wrap items-center gap-4">
                    {footer.agreement?.items.map((item: NavItem, index: number) => (
                      <Link
                        key={index}
                        href={item.url || ''}
                        target={item.target || ''}
                        className="text-muted-foreground hover:text-primary block text-xs break-words underline duration-150"
                      >
                        {item.title || ''}
                      </Link>
                    ))}
                  </div>
                ) : null}

                {footer.social ? (
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    {footer.social?.items.map((item: NavItem, index) => (
                      <Link
                        key={index}
                        href={item.url || ''}
                        target={item.target || ''}
                        className="text-muted-foreground hover:text-primary bg-background block cursor-pointer rounded-full p-2 duration-150"
                        aria-label={item.title || 'Social media link'}
                      >
                        {item.icon && (
                          <SmartIcon name={item.icon as string} size={20} />
                        )}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
