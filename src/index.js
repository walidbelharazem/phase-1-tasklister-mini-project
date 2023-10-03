document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const task = document.getElementById('tasks');
  const text = document.getElementById("new-task-description");
  const btn = document.createElement('button');
  const select = document.createElement('select'); 
  const input = document.createElement('input');
  input.type = 'date';

  const priorities = ['Low', 'Medium', 'High'];

  priorities.forEach(priority => {
    const option = document.createElement('option');
    option.textContent = priority;
    select.appendChild(option); 
  });

  btn.textContent = 'X';

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const newItem = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = text.value;
    newItem.appendChild(taskText);

    const deleteBtn = btn.cloneNode(true);
    deleteBtn.addEventListener('click', function() {
      task.removeChild(newItem);
    });

    const selected = select.value; 
    if (selected === 'High') {
      taskText.style.color = 'red';
    } else if (selected === 'Medium') {
      taskText.style.color = 'Orange';
    } else {
      taskText.style.color = 'green';
    }

    const dateValue = input.value;
    const dateSpan = document.createElement('span');
    dateSpan.textContent = ' ' + dateValue; 

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      taskText.contentEditable = true; 
      taskText.focus(); 
    });
    
    newItem.appendChild(taskText);
    taskText.appendChild(dateSpan);
    newItem.appendChild(deleteBtn);
    newItem.appendChild(editButton);
    
    task.appendChild(newItem);
    text.value = "";
  });

  text.parentNode.insertBefore(select, text.nextSibling);
  text.parentNode.insertBefore(input, text.nextSibling);

  
  const sortButton = document.createElement('button');
  sortButton.textContent = 'Sort';
  sortButton.addEventListener('click', function(e) {
    e.preventDefault(); 
  
    const items = Array.from(task.getElementsByTagName('li'));
    items.sort(function(a, b) {
      const priorityA = getPriorityValue(a);
      const priorityB = getPriorityValue(b);
      return priorityB - priorityA;
    });
    items.forEach(item => task.appendChild(item));
  });
  

  function getPriorityValue(item) {
    const taskPriority = item.querySelector('span').style.color;
    if (taskPriority === 'red') return 3;
    if (taskPriority === 'orange') return 2;
    if (taskPriority === 'green') return 1;
    return -1;
  }

  form.appendChild(sortButton);
});
