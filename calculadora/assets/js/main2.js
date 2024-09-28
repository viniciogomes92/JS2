/* Esse script foi feito utilizando os conceitos de função construtora passados posteriaormente */

//Cria a calculadora
function Calculadora () {
    //Trás as TAG HTML de classes "display" e "btn-clear" pras propriedades de mesmo nome
    const display = document.querySelector('.display')
    const btnClear = document.querySelector('.btn-clear')


    //Dispara as funções básicas de nossa calculadora
    this.inicia = () => {
      this.cliqueBotoes();
      this.clearDisplay();
      this.pressEnter();
    }

    /* Ao pressionar uma tecla dentro do display, verifica se ela é a tecla ENTER,
    caso seja, chama a função doTheMath para efetuar a conta */
    this.pressEnter = () => {
      display.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          this.doTheMath();
        }
      })
    }
    

    /* Recebe o valor do nosso display, executa uma expressão JS via eval,
    depois verifica se o resultado é um número, se não for retorna um alert dizendo
    que o cálculo é inválido. Se for um número ele retorna o  valor através de uma
    string pro nosso display */
    this.doTheMath = () => {
      let conta = display.value;

      try {
        conta = eval(conta);

        if (!conta) {
          alert('Conta inválida.');
          return;
        }

        display.value = String(conta);
      } catch (e) {
        alert('Conta inválida.');
        return;
      }
    }

    //Remove um digíto do nosso display quando esta função for chamada
    this.removeOne = () => {
      display.value = this.display.value.slice(0, -1)
    }
    //Zera nosso display quando esta função for chamada
    this.clearDisplay = () => {
      display.value = '';
    }

    /* Função que captura o evento CLICK do nosso HTML e verifica quem foi clicado,
    se for um elemento da conta, chama btnParaDisplay. Se for o botão CLEAR, chama
    a função clearDisplay. Se for botão DEL, chama a função removeOnde e se for o botão IGUAL
    chama a função doTheMath */
    this.cliqueBotoes = () => {
      document.addEventListener('click', (event) => {
        const elemen = event.target;
        if(elemen.classList.contains('btn-num')){
          this.btnParaDisplay(elemen.innerText);
        }
        
        if (elemen.classList.contains('btn-clear')){
          this.clearDisplay();
        }

        if (elemen.classList.contains('btn-del')){
          this.removeOne();
        }

        if (elemen.classList.contains('btn-equal')){
          this.doTheMath();
        }
      })
    }

    //Função que concatena os valores inseridos no display
    this.btnParaDisplay = (valor) => {
      display.value += valor;
    }
  }

//Joga a nossa factory function criaCalculadora pra dentro da const calculadora
const calculadora = new Calculadora();

//Chama o método inicia para "startar" nossa calculadora
calculadora.inicia();