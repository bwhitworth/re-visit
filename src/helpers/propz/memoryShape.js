import PropTypes from 'prop-types';

const memoryShape = PropTypes.shape({
  categoryId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  tripId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { memoryShape };
