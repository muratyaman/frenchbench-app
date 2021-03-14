import { Fragment, useContext } from 'react';
import { FbLinkExt } from '../components';
import { FbI18nContext } from '../contexts';
import { makeBlogLink } from '../makeRoutes';

export const FbFooterLinks = () => {
  const { i18n } = useContext(FbI18nContext);
  const links = [
    { target: '_blank', href: makeBlogLink('about-us'), label: i18n._('link_about_us') },
    { target: '_blank', href: makeBlogLink('contact-us'), label: i18n._('link_contact_us') },
    { target: '_blank', href: makeBlogLink('terms-of-service'), label: i18n._('link_terms_of_service') },
    { target: '_blank', href: makeBlogLink('privacy-policy'), label: i18n._('link_privacy_policy') },
    { target: '_blank', href: makeBlogLink('safety'), label: 'Safety' },
  ];
  return (
    <>
      {links.map(({ label, ...rest }, idx) => (
        <Fragment key={`${label}-${idx}`}>
          <FbLinkExt {...rest}>{label}</FbLinkExt>{idx < 4 ? ` - ` : null}
        </Fragment>
      ))}
    </>
  );
}
