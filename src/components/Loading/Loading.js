import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({isLoading}) => {
    return isLoading ? <h4>Please wait...</h4> : null;
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loading;
