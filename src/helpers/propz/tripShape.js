import PropTypes from 'prop-types';

const tripShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { tripShape };
