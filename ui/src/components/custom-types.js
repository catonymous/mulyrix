import PropTypes from 'prop-types';

const params = PropTypes.shape({
    artist: PropTypes.string,
    year: PropTypes.string,
    album: PropTypes.string,
    disk: PropTypes.string,
    track: PropTypes.string,
    title: PropTypes.string
});

export default Object.freeze({
    apiCall: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
        done: PropTypes.bool.isRequired,
        error: PropTypes.instanceOf(Error)
    }),
    params,
    match: PropTypes.shape({
        params: params.isRequired,
        url: PropTypes.string.isRequired,
        isExact: PropTypes.bool.isRequired
    })
});
