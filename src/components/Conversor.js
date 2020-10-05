import React, { Component } from "react";
import "./Conversor.css";

// import { Container } from './styles';

export default class Conversor extends Component {
  constructor(props) {
    super(props);

    //console.log("CONSTRUTOR");

    this.state = {
      moedaA: "USD",
      moedaB: "BRL",
      moedaA_valor: "",
      moedaB_valor: 0,
    };

    this.converter = this.converter.bind(this);
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeA(event) {
    this.setState({ moedaA: event.target.value });
  }

  handleChangeB(event) {
    this.setState({ moedaB: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.moedaA);
    console.log(this.state.moedaB);
  }

  converter() {
    this.handleSubmit();
    let de_para = `${this.state.moedaA}_${this.state.moedaB}`;
    let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=6c4109b1b5394b3441d6`;

    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then((json) => {
        let cotacao = json[de_para];
        let convertido = parseFloat(this.state.moedaA_valor) * cotacao;
        let moedaB_valor = convertido.toFixed(2);

        this.setState({ moedaB_valor });
      });
  }

  render() {
    return (
      <div clasName="Conversor">
        <h2>
          <select value={this.state.moedaA} onChange={this.handleChangeA}>
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="EUR">EUR</option>
            <option value="PHP">PHP</option>
            <option value="DKK">DKK</option>
          </select>{" "}
          para{" "}
          <select value={this.state.moedaB} onChange={this.handleChangeB}>
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="EUR">EUR</option>
            <option value="PHP">PHP</option>
            <option value="DKK">DKK</option>
          </select>{" "}
        </h2>
        <input
          type="text"
          onChange={(event) => {
            this.setState({ moedaA_valor: event.target.value });
          }}
        ></input>

        <input type="button" value="Converter" onClick={this.converter}></input>

        <h2>{this.state.moedaB_valor}</h2>
      </div>
    );
  }
}
