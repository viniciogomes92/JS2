//Cria a calculadora
function criaCalculadora () {
  return {
    //Trás as TAG HTML de classes "display" e "btn-clear" pras propriedades de mesmo nome
    display: document.querySelector('.display'),
    btnClear: document.querySelector('.btn-clear'),


    //Dispara as funções básicas de nossa calculadora
    inicia () {
      this.cliqueBotoes();
      this.clearDisplay();
      this.pressEnter();
    },

    /* Ao pressionar uma tecla dentro do display, verifica se ela é a tecla ENTER,
    caso seja, chama a função doTheMath para efetuar a conta */
    pressEnter() {
      this.display.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          this.doTheMath();
        }
      })
    },
    

    /* Recebe o valor do nosso display, executa uma expressão JS via eval,
    depois verifica se o resultado é um número, se não for retorna um alert dizendo
    que o cálculo é inválido. Se for um número ele retorna o  valor através de uma
    string pro nosso display */
    doTheMath(){
      let conta = this.display.value;

      try {
        conta = eval(conta);

        if (!conta) {
          alert('Conta inválida.');
          return;
        }

        this.display.value = String(conta);
      } catch (e) {
        alert('Conta inválida.');
        return;
      }
    },

    //Remove um digíto do nosso display quando esta função for chamada
    removeOne(){
      this.display.value = this.display.value.slice(0, -1)
    },

    //Zera nosso display quando esta função for chamada
    clearDisplay() {
      this.display.value = '';
    },

    /* Função que captura o evento CLICK do nosso HTML e verifica quem foi clicado,
    se for um elemento da conta, chama btnParaDisplay. Se for o botão CLEAR, chama
    a função clearDisplay. Se for botão DEL, chama a função removeOnde e se for o botão IGUAL
    chama a função doTheMath */
    cliqueBotoes() {
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
    },

    //Função que concatena os valores inseridos no display
    btnParaDisplay(valor){
      this.display.value += valor;
    }
  };
}

//Joga a nossa factory function criaCalculadora pra dentro da const calculadora
const calculadora = criaCalculadora();

//Chama o método inicia para "startar" nossa calculadora
calculadora.inicia();