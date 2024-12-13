import PropTypes from 'prop-types';

function Display(props) {
  return (
    <>
      <input id="display" type="text" value={props.value} />
    </>
  );
}

Display.propTypes = {
  value: PropTypes.string,
};

export default Display;
