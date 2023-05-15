import React from 'react';
import PropTypes from 'prop-types';
import '../style/ProcuctList.css';

class CategoriesMenu extends React.Component {
  render() {
    const { name, onClick, id } = this.props;
    return (
      <label htmlFor="category">
        <button
          onClick={ () => { onClick(id); } }
          type="button"
          data-testid="category"
          id="category"
          className="categoriesButton"
        >
          { name }

        </button>
      </label>
    );
  }
}
CategoriesMenu.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
export default CategoriesMenu;
