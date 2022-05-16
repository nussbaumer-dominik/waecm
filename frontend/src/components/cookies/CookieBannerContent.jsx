import React from 'react';
import bannerStyle from '../cookies/bannerStyle';
import CookieBannerPreferences from '../cookies/CookieBannerPreferences';

class CookieBannerContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showPreferences: true };
  }

  render() {
    const {
      styles = {},
      className = 'Cookies',
      message = 'No text',
      policyLink = '/data-rights',
      privacyPolicyLinkText = 'Datenschutz-Richtlinie',
      acceptButtonText = 'Alle akzeptieren',
      cancelAll = 'Alle Ablehnen',
      savePreferencesButtonText = 'Speichern',
      onConfirm = () => {},
      onAcceptAll = () => {},
        onDecline = () =>{},
    } = this.props;

    const { showPreferences } = this.state;

    const {
      dialog: dialogStyle,
      container: containerStyle,
      message: messageStyle,
      policy: policyStyle,
      buttonWrapper: buttonWrapperStyle,
      button: buttonStyle,
    } = { ...bannerStyle, ...styles };

    return (
      <div
        className={`react-cookie-law-dialog ${className}`}
        style={dialogStyle}
        id="myCookiesBanner"
      >

        <div className="react-cookie-law-container" style={containerStyle}>
          <div className="react-cookie-law-msg" style={messageStyle}>
            {message}
          </div>
          <a
              href={policyLink}
              className="react-cookie-law-policy"
              style={policyStyle}
          >{privacyPolicyLinkText}
          </a>

          {showPreferences && <CookieBannerPreferences {...this.props} />}



          <div
            className="react-cookie-law-button-wrapper"
            style={buttonWrapperStyle}
          >

            <button
                type="button"
                className="react-cookie-law-accept-btn"
                style={buttonStyle}
                onClick={() => {onAcceptAll()}}
            >
              <span>{acceptButtonText}</span>
            </button>


            <button
                type="button"
                className="react-cookie-law-save-btn"
                style={buttonStyle}
                onClick={() => {onDecline()}}
            >
              <span>{cancelAll}</span>
            </button>

            <button

                type="button"
                className="react-cookie-law-save-btn"
                style={buttonStyle}
                onClick={() => {onConfirm()}}
            >
              <span>{savePreferencesButtonText}</span>
            </button>

          </div>
        </div>
      </div>
    );
  }
}

export default CookieBannerContent;
