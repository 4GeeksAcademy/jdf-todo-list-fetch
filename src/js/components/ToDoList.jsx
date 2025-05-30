import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState('');

  const crearUsuario = () => {
    fetch('https://playground.4geeks.com/todo/users/juancho', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([])
    })
    .then(res => {
      if (res.status === 400) {
        console.log("El usuario ya existe");
        return obtenerTareas();
      }
      if (!res.ok) {
        throw new Error("No se pudo crear el usuario");
      }
      return res.json().then(() => obtenerTareas());
    })
    .catch(err => console.error("Error creando usuario:", err));
  };

  const obtenerTareas = () => {
    fetch('https://playground.4geeks.com/todo/users/juancho')
      .then(res => {
        if (!res.ok) {
          throw new Error("No se pudieron obtener las tareas");
        }
        return res.json();
      })
      .then(data => {
        const lista = data.todos.map(item => item.label);
        setTareas(lista);
      })
      .catch(err => console.error("Error obteniendo tareas:", err));
  };

  const actualizarTareas = (tarea) => {
    fetch('https://playground.4geeks.com/todo/todos/juancho', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: tarea, done: false })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error al agregar tarea");
      }
      return obtenerTareas();
    })
    .catch(err => console.error("Error en POST:", err));
  };

  const eliminarTarea = (indexAEliminar) => {
    const tareaAEliminar = tareas[indexAEliminar];

    fetch(`https://playground.4geeks.com/todo/todos/juancho/${indexAEliminar}`, {
      method: 'DELETE'
    })
    .then(() => obtenerTareas())
    .catch(err => console.error("Error eliminando tarea:", err));
  };

  const eliminarTareas = () => {
    fetch('https://playground.4geeks.com/todo/users/juancho', {
      method: 'DELETE'
    })
    .then(() => {
      setTareas([]);
      crearUsuario();
    })
    .catch(err => console.error("Error eliminando tareas:", err));
  };

  const agregarTarea = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      actualizarTareas(input.trim());
      setInput('');
    }
  };

  useEffect(() => {
    crearUsuario();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>To do list</h1>
      <input
        type="text"
        placeholder="Escribe una tarea y presiona Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={agregarTarea}
        style={styles.input}
      />

      <div style={styles.lista}>
        {tareas.length === 0 ? (
          <p style={styles.vacio}>No hay tareas, añadir tareas</p>
        ) : (
          tareas.map((tarea, index) => (
            <div key={index} style={styles.tarea} className="tarea">
              <span>{tarea}</span>
              <button
                style={styles.botonEliminar}
                onClick={() => eliminarTarea(index)}
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>

      {tareas.length > 0 && (
        <button onClick={eliminarTareas} style={{ marginTop: '20px' }}>
          Eliminar todas las tareas
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '400px',
    margin: '0 auto',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  titulo: {
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  lista: {
    marginTop: '20px',
  },
  tarea: {
    position: 'relative',
    background: '#f2f2f2',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    transition: 'all 0.3s ease',
  },
  vacio: {
    textAlign: 'center',
    color: '#888',
  },
  botonEliminar: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    color: '#888',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default ToDoList;
