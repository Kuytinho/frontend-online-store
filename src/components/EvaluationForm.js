import React from 'react';
import PropTypes from 'prop-types';
import '../style/ProductDetails.css';

class EvaluationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      rate: 0,
      email: 'Email',
      comment: 'Comentários',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clearState = () => {
    this.setState({
      rate: 0,
      email: 'Email',
      comment: 'Comentários',
    });
  }

  render() {
    const {
      rate,
      email,
      comment,
    } = this.state;
    const { addEvaluation, id } = this.props;
    return (
      <form className="formAvaliation">
        <input
          data-testid="product-detail-email"
          id="email"
          type="email"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <textarea
          data-testid="product-detail-evaluation"
          id="comment"
          name="comment"
          onChange={ this.handleChange }
          value={ comment }
        />

        <div onChange={ this.handleChange }>
          <input type="radio" value={ 1 } name="rate" data-testid="1-rating" />
          {' '}
          1
          {' '}
          <input type="radio" value={ 2 } name="rate" data-testid="2-rating" />
          {' '}
          2
          {' '}
          <input type="radio" value={ 3 } name="rate" data-testid="3-rating" />
          {' '}
          3
          {' '}
          <input type="radio" value={ 4 } name="rate" data-testid="4-rating" />
          {' '}
          4
          {' '}
          <input type="radio" value={ 5 } name="rate" data-testid="5-rating" />
          {' '}
          5
          {' '}
        </div>

        <button
          data-testid="submit-review-btn"
          type="button"
          onClick={ () => {
            addEvaluation(id, rate, email, comment);
            this.clearState();
          } }
        >
          Salvar
        </button>
      </form>
    );
  }
}

EvaluationForm.propTypes = {
  addEvaluation: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default EvaluationForm;
