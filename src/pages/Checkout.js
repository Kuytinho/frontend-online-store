import React from 'react';
import '../style/Checkout.css';

class Checkout extends React.Component {
  render() {
    return (
      <div className="checkoutPage">
        <form className="formCheckout">
          <h1>INFORMAÇÕES</h1>
          <div className="divInputs">
            <label htmlFor="name">
              <p>Nome Completo</p>
              <input
                type="text"
                name="name"
                data-testid="checkout-fullname"
                className="inputs"
              />
            </label>
          </div>
          <div className="divInputs">
            <label htmlFor="email">
              <p>Email</p>
              <input
                type="email"
                name="email"
                data-testid="checkout-email"
                className="inputs"
              />
            </label>
          </div>
          <div className="divInputs">
            <label htmlFor="cpf">
              <p>CPF</p>
              <input
                type="text"
                name="cpf"
                data-testid="checkout-cpf"
                className="inputs"
              />
            </label>
          </div>
          <div className="divInputs">
            <label htmlFor="phone">
              <p>Telefone</p>
              <input
                type="string"
                name="phone"
                data-testid="checkout-phone"
                className="inputs"
              />
            </label>
          </div>
          <div className="divInputs">
            <label htmlFor="cep">
              <p>CEP</p>
              <input
                type="text"
                name="cep"
                data-testid="checkout-cep"
                className="inputs"
              />
            </label>
          </div>
          <div className="divInputs">
            <label htmlFor="address">
              <p>Endereço</p>
              <input
                type="text"
                name="address"
                data-testid="checkout-address"
                className="inputs"
              />
            </label>
          </div>
          <div className="divButtonFinish">
            <button className="buttonFinish" type="button">Finalizar compra</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Checkout;
