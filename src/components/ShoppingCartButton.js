import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/ProcuctList.css';

class ShoppingCartButton extends React.Component {
  render() {
    const { cart } = this.props;
    return (
      <div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          <button
            type="button"
            className="cartButton"
          >
            <img
              src="https://thumbs.dreamstime.com/b/vetor-do-%C3%ADcone-do-carrinho-de-compras-preto-e-branco-eps-91406635.jpg"
              alt="carrinho de compras"
              className="cartImage"
            />
          </button>
        </Link>
        <p data-testid="shopping-cart-size">
          {' '}
          { cart.length }
          {' '}
        </p>
      </div>
    );
  }
}

ShoppingCartButton.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ShoppingCartButton;
