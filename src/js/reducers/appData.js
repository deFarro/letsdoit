// Action types
import { ADD_TODO, EDIT_TODO, DELETE_TODO, LOG_IN, LOG_OUT, LOAD_TODOS, ERROR, RESET_ERROR } from '../actions/actions';

const appData = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      const todos = [...state.todos, action.todo];
      return {user: state.user, todos};

    case EDIT_TODO:
      // Finding index of edited todo
      let index;
      state.todos.forEach((todo, i) => {if (todo._id === action.todo._id) {index = i}});
      const newTodos = [...state.todos];
      // If status (notCompleted/Completed) changed we not replacing todo but delete it and add to the end of the array
      if (state.todos[index].status !== action.todo.status) {
        newTodos.splice(index, 1);
        newTodos.push(action.todo);
      }
      else {
        newTodos[index] = action.todo;
      }
      return {user: state.user, todos: newTodos};

    case DELETE_TODO:
      return {user: state.user, todos: state.todos.filter(todo => todo._id !== action.id)}

    case LOG_IN:
      return {todos: state.todos, user: action.user}

    case LOG_OUT:
      return {todos: state.todos}

    case LOAD_TODOS:
      const newState = Object.assign({}, state);
      newState.todos = action.todos;
      return newState;

    case ERROR:
      return {todos: state.todos, user: state.user, error: true}

    case RESET_ERROR:
      return {todos: state.todos, user: state.user}

    default:
      return state;
  }
}

export default appData;