import React from 'react';
import CookieOption from '../cookies/CookieOption';
import bannerStyle from '../cookies/bannerStyle';

export default (props = {}) => {
  const {
    styles = {},
    necessaryOptionText = 'Funktionale',
    statisticsOptionText = 'Statistics',
    marketingOptionText = 'Marketing',
    showStatisticsOption = true,
    showMarketingOption = true,
    statisticsDefaultChecked = false,
    marketingDefaultChecked = false,
    onToggleStatisticsCookies = () => {},
    onToggleMarketingCookies = () => {},

  } = props;

  const {
    selectPane: selectPaneStyle,
    optionWrapper: optionWrapperStyle,
    optionLabel: optionLabelStyle,
    checkbox: checkboxStyle,
  } = { ...bannerStyle, ...styles };

  const cookieOptionStyle = {
    optionWrapperStyle,
    optionLabelStyle,
    checkboxStyle,
  };

  return (
    <div className="react-cookie-law-select-pane" style={selectPaneStyle}>
        <>
          <CookieOption
            id="check-required-cookies"
            text={necessaryOptionText}
            styles={cookieOptionStyle}
            disabled
            checked
          />

          {showStatisticsOption && (
            <CookieOption
              id="check-statistics-cookies"
              text={statisticsOptionText}
              styles={cookieOptionStyle}
              checked={statisticsDefaultChecked}
              onChange={onToggleStatisticsCookies}
            />
          )}

          {showMarketingOption && (
            <CookieOption
              id="check-marketing-cookies"
              text={marketingOptionText}
              styles={cookieOptionStyle}
              checked={marketingDefaultChecked}
              onChange={onToggleMarketingCookies}
            />
          )}
        </>
    </div>
  );
};
