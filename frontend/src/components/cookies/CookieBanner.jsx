import React from 'react';
import PropTypes from 'prop-types';

import Cookies from './Cookies';
import CookieBannerContent from './CookieBannerContent';
import { isServer } from './helpers';

import {toast} from "react-toastify";

const CONSENT_GIVEN = 'rcl_consent_given';
const STATISTICS_COOKIE = 'rcl_statistics_consent';
const MARKETING_COOKIE = 'rcl_marketing_consent';

class CookieBanner extends React.Component {
  constructor(props) {
    super(props);

    const {
      statisticsDefaultChecked = false,
      marketingDefaultChecked = false,
      wholeDomain = props.wholeDomain,
    } = this.props;

    this.onScroll = this.onScroll.bind(this);
    this.onToggleStatisticsCookies = this.onToggleStatisticsCookies.bind(this);
    this.onToggleMarketingCookies = this.onToggleMarketingCookies.bind(this);
    this.onAcceptAll = this.onAcceptAll.bind(this);
    this.confirm = this.confirm.bind(this);
    this.decline = this.decline.bind(this);
    this.consetsCallback = this.consetsCallback.bind(this);

    this.cookies = new Cookies(wholeDomain);
    this.state = {
      statisticsCookies: statisticsDefaultChecked,
      marketingCookies: marketingDefaultChecked,
    };
  }


  componentWillUnmount() {
    if (isServer()) {
      return;
    }

    if (window.removeEventListener) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  onScroll() {
    this.confirm();
  }


  onToggleStatisticsCookies(value) {
    this.setState({ statisticsCookies: value });
  }

  onToggleMarketingCookies(value) {
    this.setState({ marketingCookies: value });
  }

  onAcceptAll() {
    const {
      onAcceptStatistics = () => {},
      onAcceptMarketing = () => {},
    } = this.props;

      this.cookies.set(CONSENT_GIVEN);
      this.cookies.set(STATISTICS_COOKIE);
      this.cookies.set(MARKETING_COOKIE);
      toast.success("Saved: FUNKTIONALE_COOKIE");
      toast.success("Saved: STATISTICS_COOKIE");
      toast.success("Saved: MARKETING_COOKIE");


      onAcceptStatistics();
      onAcceptMarketing();

      this.forceUpdate();
  }

  confirm() {

      const { statisticsCookies, marketingCookies } = this.state;

      this.cookies.set(CONSENT_GIVEN);
      toast.success("Saved: FUNKTIONALE_COOKIE");

      if (statisticsCookies) {
        this.cookies.set(STATISTICS_COOKIE);
        toast.success("Saved: STATISTICS_COOKIE");
      } else {
        if (this.cookies.get(STATISTICS_COOKIE)) {
          this.cookies.remove(STATISTICS_COOKIE);
          toast.info("Removed: STATISTICS_COOKIE");
        }
      }

      if (marketingCookies) {
        this.cookies.set(MARKETING_COOKIE);
        toast.success("Saved: MARKETING_COOKIE");
      } else {
        if (this.cookies.get(MARKETING_COOKIE)) {
          this.cookies.remove(MARKETING_COOKIE);
          toast.info("Removed: MARKETING_COOKIE");
        }
      }


    this.forceUpdate();


  }



  decline() {
    const {
      onDeclineStatistics = () => {},
      onDeclineMarketing = () => {},
    } = this.props;

      this.cookies.set(CONSENT_GIVEN);
      toast.success("Saved: FUNKTIONALE_COOKIE");
      if (this.cookies.get(MARKETING_COOKIE)) {
        this.cookies.remove(MARKETING_COOKIE);
        toast.info("Removed: MARKETING_COOKIE");
      }
      if (this.cookies.get(STATISTICS_COOKIE)) {
        this.cookies.remove(STATISTICS_COOKIE);
        toast.info("Removed: STATISTICS_COOKIE");
      }

      onDeclineStatistics();
      onDeclineMarketing();

    this.forceUpdate();

  }

  consetsCallback() {
    const {
      onAccept = () => {},
      onAcceptStatistics = () => {},
      onAcceptMarketing = () => {},
      onDeclineStatistics = () => {},
      onDeclineMarketing = () => {},
    } = this.props;

    const hasStatisticsCookie = this.cookies.get(STATISTICS_COOKIE);
    const hasMarketingCookie = this.cookies.get(MARKETING_COOKIE);

    onAccept();

    if (hasStatisticsCookie) {
      onAcceptStatistics();
    } else {
      onDeclineStatistics();
    }

    if (hasMarketingCookie) {
      onAcceptMarketing();
    } else {
      onDeclineMarketing();
    }
  }

  render() {
    const {
      styles,
      className,
      message,
      policyLink,
      privacyPolicyLinkText,
      necessaryOptionText,
      statisticsOptionText,
      marketingOptionText,
      showDeclineButton,
      acceptButtonText,
      declineButtonText,
      managePreferencesButtonText,
      savePreferencesButtonText,
      showPreferencesOption,
      showStatisticsOption,
      showMarketingOption,
      preferencesDefaultChecked,
      statisticsDefaultChecked,
      marketingDefaultChecked,
    } = this.props;

    if (this.cookies.get(CONSENT_GIVEN) && !this.props.wholeDomain) {
      this.consetsCallback();
      return null;
    }


    const contentProps = {
      styles,
      className,
      message,
      policyLink,
      privacyPolicyLinkText,
      necessaryOptionText,
      statisticsOptionText,
      marketingOptionText,
      showDeclineButton,
      acceptButtonText,
      declineButtonText,
      managePreferencesButtonText,
      savePreferencesButtonText,
      showPreferencesOption,
      showStatisticsOption,
      showMarketingOption,
      preferencesDefaultChecked,
      statisticsDefaultChecked,
      marketingDefaultChecked,
      onToggleStatisticsCookies: this.onToggleStatisticsCookies,
      onToggleMarketingCookies: this.onToggleMarketingCookies,
      onDecline: this.decline,
      onConfirm: this.confirm,
      onAcceptAll: this.onAcceptAll,
    };



    return <CookieBannerContent {...contentProps} />;
  }
}

CookieBanner.protoTypes = {
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
  managePreferencesButtonText: PropTypes.string,
  savePreferencesButtonText: PropTypes.string,
  showDeclineButton: PropTypes.bool,
  dismissOnScroll: PropTypes.bool,
  showPreferencesOption: PropTypes.bool,
  showStatisticsOption: PropTypes.bool,
  showMarketingOption: PropTypes.bool,
  preferencesDefaultChecked: PropTypes.bool,
  statisticsDefaultChecked: PropTypes.bool,
  marketingDefaultChecked: PropTypes.bool,
  onAccept: PropTypes.func,
  onAcceptPreferences: PropTypes.func,
  onAcceptStatistics: PropTypes.func,
  onAcceptMarketing: PropTypes.func,
  onDeclinePreferences: PropTypes.func,
  onDeclineStatistics: PropTypes.func,
  onDeclineMarketing: PropTypes.func,
};

export default CookieBanner;
