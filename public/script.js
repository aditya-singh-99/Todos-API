async function login() {
  try {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const { data } = await axios.post('/users', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    localStorage.setItem('token', data.token);
    document.getElementById('auth').style.display = 'none';
    document.getElementById('todo-app').style.display = 'block';
    renderTodos();
  } catch (error) {
    alert(error?.response?.data?.msg || "An error occurred");
  }
}

async function addTodo() {
  try {
    const todoInput = document.getElementById('todo-input');
    const text = todoInput.value.trim();
    if (text === '') {
      return;
    }

    const token = localStorage.getItem('token')
    const params = new URLSearchParams();
    params.append('content', text);

    const { data } = await axios.post('/todos', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    });
    todoInput.value = '';
    renderTodos();
  } catch (error) {
    alert(error?.response?.data?.msg || "An error occurred");
  }
}

async function renderTodos() {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get('/todos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    const todos = [...data.data];
    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.id = todo._id

      const span = document.createElement('span');
      span.textContent = todo.content;
      span.style.textDecoration = todo.completed ? 'line-through' : 'none';

      const completeBtn = document.createElement('button');
      completeBtn.textContent = todo.completed ? 'Undone' : 'Done';
      completeBtn.onclick = async () => {
        try {
          const token = localStorage.getItem('token')
          const params = new URLSearchParams();
          params.append('completed', !todo.completed);

          const { data } = await axios.put(`/todos/${todo._id}`, params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            }
          });

          renderTodos();
        } catch (error) {
          alert(error?.response?.data?.msg || "An error occurred");
        }
      };

      const editBtn = document.createElement('button');
      editBtn.className = 'edit';
      editBtn.textContent = 'Edit';
      editBtn.onclick = async () => {
        try {
          const token = localStorage.getItem('token')
          var { data } = await axios.get(`/todos/${todo._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const text = data.content
          const newText = prompt('Edit todo:', text);
          if (newText == null) {
            return;
          }
          if (newText == '') {
            return alert('Enter some text')
          }

          const params = new URLSearchParams();
          params.append('content', newText);

          var { data } = await axios.put(`/todos/${todo._id}`, params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            }
          });

          renderTodos();
        } catch (error) {
          alert(error?.response?.data?.msg || "An error occurred");

        }
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = async () => {
        try {
          const token = localStorage.getItem('token')
          var { data } = await axios.delete(`/todos/${todo._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          renderTodos();
        } catch (error) {
          alert(error?.response?.data?.msg || "An error occurred");

        }
      };

      li.appendChild(span);
      li.appendChild(completeBtn);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  } catch (error) {
    alert(error?.response?.data?.msg || "An error occurred");
  }
}