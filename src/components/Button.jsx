import PropTypes from 'prop-types';

function Button(props) {
  return (
    <>
      <button className="calculator-button" onClick={props.onClick}>
        {props.label}
      </button>
    </>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
