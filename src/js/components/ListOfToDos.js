'use strict';

// Libs
import React from 'react';
import { PropTypes } from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

// Style
import '../../scss/ListOfToDos.scss';

// Container
import { default as container } from '../redux/container';

// Components
import ToDo from './ToDo';

// All drag-and-drop mechanics will be processed in this component which makes it a bit ugly. I'd rather use library like 'react-dnd'
const ListOfToDos = props => {
  const { status, title, todos, user, modifyTodo } = props;

  // Filter todos based on status
  const filteredTodos = todos.filter(x => x.status === status);

  // Function to change todo's status on drag-and-drop
  const handleDrop = (event) => {
    event.currentTarget.classList.remove('drag_over');
    const updatedToDo = JSON.parse(event.dataTransfer.getData('todo'));
    updatedToDo.status = title === 'In Progress' ? 'notCompleted' : 'completed';
    modifyTodo(updatedToDo, user.sessionID);
  };
  // Adding some event listeners to display dragging
  return (
    <div className={title === 'In Progress' ? 'inProgress todos_list' : 'todos_list completed'}
      onDragOver={event => {event.preventDefault(); event.currentTarget.classList.add('drag_over');}}
      onDragLeave={event => event.currentTarget.classList.remove('drag_over')}
      onDrop={handleDrop}>

      <div className='headline'>
        {title}
      </div>

      { /* Adding appearing and leaving animation */ }
      <CSSTransitionGroup transitionName="appear" transitionEnterTimeout={300} transitionLeaveTimeout={0}>
        {filteredTodos.map((todo, i) => <ToDo key={i} {...{ todo, user }} />) }
      </CSSTransitionGroup>

      { /* Render emty todo as a from */ }
      { title === 'In Progress'
        ? <ToDo todo={{title: '', description: ''}} mission="addNew" />
        : null
      }
    </div>
  )
}

ListOfToDos.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  todos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  modifyTodo: PropTypes.func.isRequired,
}

export default container(ListOfToDos);
