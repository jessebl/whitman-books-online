import React, { Component } from 'react';
import validator from 'validator';
import isbn from 'node-isbn';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Page from './Page';

class Sell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isbnValue: '',
      book: null,
      condition: '',
      price: '',
      priceError: '',
      isbnErrorText: '',
      isbnButtonDisabled: true,
      priceButtonDisabled: true,

    };
  }

  handleIsbnChange = (event) => {
    const isbnValue = event.target.value;
    if (validator.isISBN(isbnValue)) {
      this.setState({
        isbnValue,
        isbnErrorText: '',
        isbnButtonDisabled: false,
      });
    } else {
      this.setState({
        isbnErrorText: 'This is not a valid ISBN.',
        isbnValue,
        isbnButtonDisabled: true,
      });
    }
  }

  handleConditionChange = (event, index, condition) => {
    this.setState({
      condition,
    });
  }

  handlePriceChange = (event) => {
    const price = event.target.value;
    if (validator.isCurrency(price)) {
      this.setState({
        price,
        priceError: '',
        priceButtonDisabled: false,
      });
    } else {
      this.setState({
        price,
        priceError: 'This is not a valid price',
        priceButtonDisabled: true,
      });
    }
  }

  handleIsbnClick = (e) => {
    e.preventDefault();
    isbn.resolve(this.state.isbnValue, (err, book) => {
      if (err) {
        console.log("Book not found", err);
      } else {
        this.setState({
          book
        })
      }
    });
  }

  render() {
    const { book } = this.state;

    return (
      <Page>
        <h1> Sell your book:</h1>
        <TextField
          floatingLabelText="Input your book's ISBN here:"
          value={this.state.isbnValue}
          errorText={this.state.isbnErrorText}
          onChange={this.handleIsbnChange}
        />

        <FlatButton
          primary
          label="Confirm"
          onClick={this.handleIsbnClick}
          disabled={this.state.isbnButtonDisabled}
        />

        {book &&
          <div>
            <Card>
              <CardHeader
                title={book.title}
                subtitle={book.authors}
                avatar={book.imageLinks && book.imageLinks.thumbnail}
                actAsExpander
                showExpandableButton
              />

              <CardText expandable>
                Publisher:  {book.publisher}
                <br />
                Published Date:  {book.publishedDate}
                <br />
                <br />
                {book.description}
              </CardText>
            </Card>

            <br />

            <SelectField
              floatingLabelText="Condition"
              value={this.state.condition}
              onChange={this.handleConditionChange}
            >
              <MenuItem value="Poor" primaryText="Poor" />
              <MenuItem value="Used" primaryText="Used" />
              <MenuItem value="Like New" primaryText="Like new" />
              <MenuItem value="New" primaryText="New" />
            </SelectField>

            <br />

            <TextField
              floatingLabelText="Input your desired price:"
              value={this.state.price}
              onChange={this.handlePriceChange}
              errorText={this.state.priceError}
            />
            <FlatButton
              primary
              label="Submit"
              disabled={this.state.priceButtonDisabled}
            />
          </div>
        }
      </Page>
    );
  }
}


export default Sell;
