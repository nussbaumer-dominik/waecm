import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CookieBannerContent from './CookieBannerContent';
import { useCookieBanner } from './provides/cookieProviders';
import { isServer } from './helpers';

const ReactCookieBanner = (props) => {
  const {
    statisticsDefaultChecked,
    marketingDefaultChecked,
    dismissOnScroll,
  } = props;

  const [statisticsCookie, setStatisticsCookie] = useState(
    statisticsDefaultChecked,
  );
  const [marketingCookie, setMarketingCookie] = useState(
    marketingDefaultChecked,
  );
  const [, onSaveConsents, onAcceptAll] = useCookieBanner();

  useEffect(() => {
    if (isServer() || dismissOnScroll !== true) {
      return;
    }

    if (window.addEventListener) {
      window.addEventListener('scroll', onAcceptAll);
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', onAcceptAll); // < IE9
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener('scroll', onAcceptAll);
      } else if (window.detachEvent) {
        window.detachEvent('onscroll', onAcceptAll); // < IE9
      }
    };
  }, []);

  const onToggleStatisticsCookies = (e) => {
    setStatisticsCookie(e.target.checked);
  };

  const onToggleMarketingCookies = (e) => {
    setMarketingCookie(e.target.checked);
  };

  const onSave = () => {
    onSaveConsents({
      statistics: statisticsCookie,
      marketing: marketingCookie,
    });
  };

  const contentProps = {
    onToggleStatisticsCookies,
    onToggleMarketingCookies,
    onSave,
    onAcceptAll,
  };

  return <CookieBannerContent {...props} {...contentProps} />;
};

ReactCookieBanner.protoTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  message: PropTypes.string.isRequired,
  wholeDomain: PropTypes.bool,
  policyLink: PropTypes.string,
  privacyPolicyLinkText: PropTypes.string,
  necessaryOptionText: PropTypes.string,
  statisticsOptionText: PropTypes.string,
  marketingOptionText: PropTypes.string,
  acceptButtonText: PropTypes.string,
  declineButtonText: PropTypes.string,
  showDeclineButton: PropTypes.bool,
  dismissOnScroll: PropTypes.bool,
  showStatisticsOption: PropTypes.bool,
  showMarketingOption: PropTypes.bool,
  statisticsDefaultChecked: PropTypes.bool,
  marketingDefaultChecked: PropTypes.bool,
};

export default ReactCookieBanner;
