import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/ProcuctList.css';

class ProductCard extends React.Component {
  render() {
    const {
      name, price, image, buttonClick, id, freeShipping, availableQuantity,
    } = this.props;
    const qtd = 1;
    return (
      <div className="product" data-testid="product">
        <Link
          to={ `/product-details/${id}` }
          data-testid="product-detail-link"
        >
          <img src={ image } alt={ name } />
        </Link>
        { freeShipping && <p data-testid="free-shipping">Frete grátis</p>}
        <p>{ price }</p>
        <p>{ name }</p>
        <button
          type="button"
          id={ name }
          data-testid="product-add-to-cart"
          onClick={ () => buttonClick(price, name, qtd, availableQuantity) }
          className="addToCartButton"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  freeShipping: PropTypes.bool.isRequired,
};

export default ProductCard;
