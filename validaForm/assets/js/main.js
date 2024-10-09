function validaForm () {
  // Puxamos o form, as TAG p de erro de cada campo e a div resultado
  const form = document.querySelector('.form');
  const erroMsgNome = document.querySelector('.erroMsgNome');
  const erroMsgSobrenome = document.querySelector('.erroMsgSobrenome');
  const erroMsgCpf = document.querySelector('.erroMsgCpf');
  const erroMsgSenha = document.querySelector('.erroMsgSenha');
  const erroMsgSenhaRepetida = document.querySelector('.erroMsgSenhaRepetida');
  const resultado = document.querySelector('.resultado');

  // gera um elemento p e o retorna
  function addMsg () {
    const p = document.createElement('p');
    return p;
  }

  // gera um elemento h1 e o retorna
  function addTitle() {
    const h1 = document.createElement('h1');
    return h1;
  }

  // Classe que utilizamos para validar CPF oriundo do exercício anterior
  class ValidaCPF {
    constructor (cpfEnviado) {
      Object.defineProperty(this, 'cpfLimpo', {
        writable: false,
        enumerable: true,
        configurable: false,
        value: cpfEnviado.replace(/\D+/g, '')
      });
    }
  
    isSequencial() {
      return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo ? true : false;
    }
  
    geraNovoCpf() {
      const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
      const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
      const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
      this.novoCpf = cpfSemDigitos + digito1 + digito2;
    }
  
    static geraDigito(cpfSemDigitos) {
      let total = 0;
      let reverso = cpfSemDigitos.length + 1;
  
      for (let stringNumerica of cpfSemDigitos) {
        total += reverso * Number(stringNumerica);
        reverso--;
      }
  
      const digito = 11 - (total % 11);
      return digito <= 9 ? String(digito) : '0'
    }
  
    valida() {
      if (!this.cpfLimpo) return false;
      if (typeof this.cpfLimpo !== 'string') return false;
      if (this.cpfLimpo.length !== 11) return false;
      if (this.isSequencial()) return false;
      this.geraNovoCpf();
      return this.novoCpf === this.cpfLimpo ? true: false;
    }
  }

  // Função que zera o resultado gerado anterior caso haja
  function zeraResultado () {
    if (resultado.childElementCount !== 0) {
      while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
      }
    }
  }

  // Função que valida nossos campos
  function submitForm (event)  {
    event.preventDefault();
    
    // Puxamos todos os inputs para os objetos de mesmo nome
    const nome = form.querySelector('.inputNome');
    const sobrenome = form.querySelector('.inputSobrenome');
    const cpfEnviado = form.querySelector('.inputCpf');
    const senha = form.querySelector('.inputSenha');
    const senhaRepetida = form.querySelector('.inputSenhaRepetida');
    const resultado = document.querySelector('.resultado');
    
    //Verificamos se algum ou todos os campos estão vazios, se estiver retornamos erro e se for corrigido o erro ele remove a mensagem
    if (!nome.value || !sobrenome.value || !cpfEnviado.value || !senha.value || !senhaRepetida.value) {
      if (!nome.value) {
        erroMsgNome.innerText = 'Favor preencher este campo.';
      } else {
        erroMsgNome.innerText = '';
      }
      
      if (!sobrenome.value) {
        erroMsgSobrenome.innerText = 'Favor preencher este campo.';
      } else {
        erroMsgSobrenome.innerText = '';
      }

      if (!cpfEnviado.value) {
        erroMsgCpf.innerText = 'Favor preencher este campo.';
      } else {
        erroMsgCpf.innerText = '';
      }
      
      if (!senha.value) {
        erroMsgSenha.innerText = 'Favor preencher este campo.';
      } else {
        erroMsgSenha.innerText = '';
      }

      if (!senhaRepetida.value) {
        erroMsgSenhaRepetida.innerText = 'Favor preencher este campo.';
      } else {
        erroMsgSenhaRepetida.innerText = '';
      }
      zeraResultado();
      return;
    } else {
      erroMsgNome.innerText = '';
      erroMsgSobrenome.innerText = '';
      erroMsgCpf.innerText = '';
      erroMsgSenha.innerText = '';
      erroMsgSenhaRepetida.innerText = '';
      zeraResultado();
    }

    // Valida o nome e sobrenome do usuário atendendo à regra descrita no erro com um REGEX.test()
    if (!(/^[a-zA-Z0-9]{3,12}$/.test(nome.value))){
      erroMsgNome.innerText = 'Nome deve conter de 3 à 12 caracteres e somente letras e/ou números.';
      return;
    } else if (!(/^[a-zA-Z0-9]{3,24}$/.test(sobrenome.value))) {
      erroMsgSobrenome.innerText = 'Sobrenome deve conter de 3 à 24 caracteres e somente letras e/ou números.';
      return;
    }

    // Utilizamos o método valida() da classe ValidaCPF na instância cpf para verificar o CPF informado
    const cpf = new ValidaCPF(cpfEnviado.value);
    if (!cpf.valida()) {
      erroMsgCpf.innerText = 'CPF Inválido.';
      return;
    }

    // Usamos o REGEX.test() pra validar a senha, deve respeitar as regras descritas abaixo na mensagem de erro
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?\/-])[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/-]{6,12}$/.test(senha.value))) {
      erroMsgSenha.innerText = 'Senha deve ter 1 letra maiúscula, 1 letra minúsucula, 1 número e 1 caracter especial, além de possuir entre 6 e 12 caracters.';
      return;
    }

    // Se a senha for diferente da confirmaçao da senha, retorna erro.
    if (senha.value !== senhaRepetida.value){
      erroMsgSenha.innerText = 'Senhas devem ser idênticas.';
      erroMsgSenhaRepetida.innerText = 'Senhas devem ser idênticas.';
      return;
    }

    zeraResultado();

    // Adicionamos então ao pai 'resultado' os filhos correspondentes ao valor de cada input validado
    const h1Resultado = addTitle();
    h1Resultado.innerText = 'Esse é resultado pós validação de todos os campos:';
    resultado.appendChild(h1Resultado);

    const pNome = addMsg();
    pNome.innerText = nome.value;
    resultado.appendChild(pNome);
    
    const pSobrenome = addMsg();
    pSobrenome.innerText = sobrenome.value;
    resultado.appendChild(pSobrenome);
    
    const pCpf = addMsg();
    pCpf.innerText = cpf.novoCpf;
    resultado.appendChild(pCpf);
    
    const pSenha = addMsg();
    pSenha.innerText = senha.value;
    resultado.appendChild(pSenha);

    const pSenhaRepetida = addMsg();
    pSenhaRepetida.innerText = senhaRepetida.value;
    resultado.appendChild(pSenhaRepetida);

    console.log(nome.value, sobrenome.value, cpfEnviado.value, senha.value, senhaRepetida.value);
  }

  form.addEventListener('submit', submitForm);
}

validaForm();