import { Paginated } from '../entities/paginated';
import { ToDo } from '../entities/todo';

let data: ToDo[] = [
    { id: 1, text: 'test 1', completed: true },
    { id: 2, text: 'test 2', completed: false },
    { id: 3, text: 'test 3', completed: false },
];
const MAX_LIMIT = 30;

export function getMany(limit = MAX_LIMIT, skip = 0): Paginated<ToDo> {
    limit = limit > MAX_LIMIT ? MAX_LIMIT : limit;

    return {
        data: data.slice(skip * limit, skip * limit + limit),
        total: data.length,
        skip,
        limit,
    };
}

export function updateOne(id: number, newToDo: Partial<Omit<ToDo, 'id'>>) {
    let result: ToDo | undefined;

    data = data.map((toDo) => {
        if (toDo.id === id) {
            result = { ...toDo, ...newToDo };
            return result;
        }
        return toDo;
    });

    return result;
}

export function getById(id: number) {
    return data.filter((toDo) => toDo.id === id)[0];
}

export function insertOne(toDo: Omit<ToDo, 'id'>) {
    const newItem = {
        ...toDo,
        id: data.length ? data[data.length - 1].id + 1 : 1,
    };

    data.push(newItem);

    return newItem;
}

export function deleteOne(id: number) {
    let result: ToDo | undefined;

    data = data.filter((toDo) => {
        if (toDo.id === id) {
            result = toDo;
        } else {
            return toDo;
        }
    });

    return result;
}
