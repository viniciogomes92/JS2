// Importação do módulo "validaCPF"
import ValidaCPF from './validaCPF.js';

// Criação da classe ValidaFormulario
class ValidaFormulario {
  /* O construtor da nossa classe puxa a TAG HTML de classe .form pra dentro do objeto de nome formulario
  Também disparamos o método eventos() assim que a classe é instânciada */
  constructor() {
    this.formulario = document.querySelector('.form');
    this.eventos();
  }

  /* O método eventos tem como objetivo "escutar" o submit do objeto formulario,
  quando tal evento for acionado, chamamos o método handleSubmit() passando o evento escutado como parâmetro */
  eventos() {
    this.formulario.addEventListener('submit', event => {
      this.handleSubmit(event);
    })
  }

  // Método handleSubmit recebe um evento e joga o que retornar dos métodos camposSaoValidos e senhasSaoValidas pra dentro das variaveis de mesmo nome
  handleSubmit(event) {
    event.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    // Verificamos se cambas são verdadeiras, se sim nosso formulário foi todo valido e está pronto pra ser enviado
    if (camposValidos && senhasValidas) {
      alert('Formulário enviado.');
      this.formulario.submit();
    }
  }

  // Método que que verifica todos os campos do formulário
  camposSaoValidos() {
    // Variável que indica se os campos são válidos, aqui é iniciada como true
    let valid = true;

    // Com um loop for, eliminamos todos os erros que possam existir de uma chamada anterior
    for(let errorText of this.formulario.querySelectorAll('.erroMsg')) {
      errorText.remove();
    }

    // Com outro loop for, passamos por todos os campos verificando se estão em branco ou se atendem as especificidades de cada um deles
    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText.slice(0, -1);

      // Verifica se o atual campo do loop está em branco
      if(!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
        valid = false;    
      }

      // Chama o método validaCPF caso o atual campo do loop seja inputCPF
      if(campo.classList.contains('inputCpf')) {
        if(!this.validaCPF(campo)) valid = false;
      }

      // Chama o método validaUsuario caso o atual campo do loop seja inputCPF
      if(campo.classList.contains('inputUsuario')) {
        if(!this.validaUsuario(campo)) valid = false;
      }
    }

    return valid;
  }

  // Método para validação do CPF que usa a classe ValidaCPF importada para isso
  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);
    let valid = true;

    if(!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido.');
      valid = false;
    }

    return valid;
  }
  
  // Método validaUsuario
  validaUsuario(campo) {
    // Recebe o campo atual do loop for de Validação e verifica se o campo usuario atende às especifidades, retorna valid ao final da execução do método
    const usuario = campo.value;
    let valid = true;

    if(usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário Inválido.');
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisa conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  // Método para validação das senhas, verifica se atende às regras e returna valid ao final da execução do método
  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('.inputSenha');
    const senhaRepetida = this.formulario.querySelector('.inputSenhaRepetida');

    if (senha.value !== senhaRepetida.value) {
      valid = false;
      this.criaErro(senha, 'Senhas devem ser idênticas.');
      this.criaErro(senhaRepetida, 'Senhas devem ser idênticas');
    }

    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?\/-])[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/-]{6,12}$/.test(senha.value))) {
      valid = false;
      this.criaErro(senha, 'Senha deve ter entre 6 e 12 caracteres, sendo eles: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caracter especial.')
    }

    return valid;
  }

  // Método utilizado para gerar os erros, recebe um campo e uma string para exibir como mensagem
  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('erroMsg');
    campo.insertAdjacentElement('afterend', div);

  }
}

const valida = new ValidaFormulario();