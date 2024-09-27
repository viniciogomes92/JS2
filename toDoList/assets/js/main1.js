function callToDoList (){
  const inputTarefa = document.querySelector('.input-nova-tarefa');
  const toDoList = document.querySelector('.toDoList');
  const divTarefa = document.querySelector('.divTarefa');

  document.addEventListener('click', function(event){
    const elemen = event.target;

    if (elemen.classList.contains('btn-add-tarefa')){
      const temErro = divTarefa.querySelectorAll('p');
      const inputVazio = document.createElement('p');
      
      if (temErro.length === 0) {
        inputVazio.appendChild(document.createTextNode('Favor informar uma tarefa.'));
        divTarefa.appendChild(inputVazio);
      } else {
        divTarefa.removeChild()    
      }
      
      if (inputTarefa.value) {
        const listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(inputTarefa.value));
        toDoList.appendChild(listItem);
      } else {
        
        
        
        
      }
      

      //document.querySelector('.toDoList').innerHTML += `<li>${inputTarefa.value}</li>`;
    }
  })
}
callToDoList();