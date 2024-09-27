//Pegamos os objetos HTML input, button e a div que guardará nossa lista
const inputTask = document.querySelector('.inputTask');
const btnAddTask = document.querySelector('.btnAddTask');
const toDoList = document.querySelector('.toDoList');

//Função que cria um elemento HTML <li> e joga no objeto li o retornando ao término da função
function addLi () {
  const li = document.createElement('li');
  return li;
}

/* Aqui nós botamos o input pra 'escutar' o pressionar das teclas, usamos a 
propriedade keyCode do objeto event para descobrir a tecla apertada, caso o KeyCode
seja === 13 ele verifica depois se o campo está vazio e avisa o usuário através de um alert */
inputTask.addEventListener('keypress', function(event){
  if (event.keyCode === 13){
    if (!inputTask.value) return (alert('Informe alguma Tarefa.'));
    addTask(inputTask.value);
  }
})

//Função que limpa o input sempre que for chamada
function clearInput() {
  inputTask.value = '';
  inputTask.focus();
}

/* Função que cria um objeto li através da chamada da função addLi, depois passa o texto do input pra dentro dele, chama o clearInput() */
function addTask(inputText){
  const li = addLi();
  li.innerText = inputText;
  toDoList.appendChild(li);
  clearInput();
  addBtnRemoveTask(li);
  saveToDoList();
}

/* Função que recebe o objeto li criado em addTask e adiciona um "filho" que é o 
o objeto button que vai apagar nossa task futuramente */
function addBtnRemoveTask (li){
  li.innerText += '   ';
  const btnRemoveTask = document.createElement('button');
  btnRemoveTask.innerText = 'Apagar';
  btnRemoveTask.setAttribute('class', 'removeTask')
  li.appendChild(btnRemoveTask);
}

/* Aqui nós botamos o input pra 'escutar' o click do botão Nova tarefa, usamos a 
propriedade keyCode do objeto event para descobrir a tecla apertada, caso o KeyCode
seja === 13 ele verifica depois se o campo está vazio e avisa o usuário através de um alert */
btnAddTask.addEventListener('click', function(event) {
  if (!inputTask.value) return (alert('Informe alguma Tarefa.'));
  addTask(inputTask.value);
});

/* Aqui nós escutamos o click do button de classe removeTask e removemos o objeto
pai que neste caso é a li referente à task do botão e atualizamos a lista salva 
através da função saveToDoList() */
document.addEventListener('click', function (event){
  const elemen = event.target;

  if (elemen.classList.contains('removeTask')) {
    elemen.parentElement.remove();
    saveToDoList();
  }
})

/* Essa função tem como objetivo salvar nossa lista localmente no navegador,
capturando todos os li e jogando dentro de um array. Esse array é convertido em 
JSON string e joga na variável toDoListJSON e depois o salva através da 
propriedade localStorage.setItem */
function saveToDoList() {
  const toDoList = document.querySelectorAll('li');
  const arrayToDoList = [];

  for (let task of toDoList) {
    let taskText = task.innerText;
    taskText = taskText.replace('Apagar', '').trim();
    arrayToDoList.push(taskText);
  }

  const toDoListJSON = JSON.stringify(arrayToDoList);
  localStorage.setItem('toDoList', toDoListJSON);
}


/* Essa função restaura nossa lista salva no localStorage, criamos o objeto toDoList
para receber a lista salva localmente, depois jogamos nosso JSON covertido para objeto
no arrayToDoList, e com um loop for usamos a função addTask pra reconstruir nossa lista */
function restoreToDoList () {
  const toDoList = localStorage.getItem('toDoList');
  const arrayToDoList = JSON.parse(toDoList);

  for (let task of arrayToDoList) {
    addTask(task);
  }
}
restoreToDoList();