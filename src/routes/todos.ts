import { Router } from 'express';
import { Todo } from '../models/todo'

//type Aliases
type RequestBody = {text: string};
type RequestParams = { todoId: string}

let todos: Todo[] = [];
const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    };

    todos.push(newTodo);

    res.status(201).json({message: 'Todo added successfully', todo: newTodo})
});

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
    if(todoIndex >= 0){
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        };
        res.status(200).json({message: 'updated todo', todo: todos[todoIndex]})
    }
    res.status(404).json({message: 'Todo doesn\'t exist'})
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    
    res.status(200).json({message: 'Todo deleted'})
});

export default router;