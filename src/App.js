import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  // função constructor de inicialização
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
    };
  }

  // função para resetar o click no botão;
  returnToInitialState = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    });
  };

  // função para validar o botão Salvar;
  validSaveButton = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;

    const lengthValid = (
      cardName.length
      && cardDescription.length
      && cardImage.length
      && cardRare.length) > 0;

    const max = 90;
    const min = 0;
    const sum = 210;

    const attr1Valid = cardAttr1 >= min && cardAttr1 <= max;
    const attr2Valid = cardAttr2 >= min && cardAttr2 <= max;
    const attr3Valid = cardAttr3 >= min && cardAttr3 <= max;
    // os atributos attr vem em forma de string, então vc precisa usar o parseInt para transformá-la em um number
    const sumAttr = (parseInt(cardAttr1, 10)
    + parseInt(cardAttr2, 10)
    + parseInt(cardAttr3, 10)) <= sum;

    if (lengthValid && attr1Valid && attr2Valid && attr3Valid && sumAttr) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  };

  // Função para capturar as mudanças nos inputs
  onInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    const valueOrCheck = type === 'checkbox' ? checked : value;
    this.setState(({
      [name]: valueOrCheck,
    }), this.validSaveButton);
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const newObject = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo };

    this.setState((prevState) => ({
      savedCards: [...prevState.savedCards, newObject],
    }), this.returnToInitialState);
  };

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
