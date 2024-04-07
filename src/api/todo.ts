import { Paginated } from '../entities/paginated';
import { ToDo } from '../entities/todo';

export async function getAll(): Promise<Paginated<ToDo>> {
    try {
        const result = await (
            await window.fetch('https://dummyjson.com/todos', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
            })
        ).json();

        return {
            data: result.todos || [],
            total: result.total || 0,
            skip: result.skip || 0,
            limit: result.limit || 0,
        };
    } catch (error) {
        console.error(error);
        return {
            data: [],
            limit: 0,
            total: 0,
            skip: 0,
        };
    }
}

export async function getAllPaginated(
    limit: number,
    skip: number,
): Promise<Paginated<ToDo>> {
    try {
        const result = await (
            await window.fetch(
                `https://dummyjson.com/todos/s?limit=${limit}&skip=${skip}`,
                {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json;charset=UTF-8',
                    },
                },
            )
        ).json();

        return {
            data: result.todos || [],
            total: result.total || 0,
            skip: result.skip || 0,
            limit: result.limit || 0,
        };
    } catch (error) {
        console.error(error);
        return {
            data: [],
            limit: 0,
            total: 0,
            skip: 0,
        };
    }
}

export async function getById(id: number): Promise<ToDo | undefined> {
    try {
        const result = await (
            await window.fetch(`https://dummyjson.com/todos/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
            })
        ).json();

        return result as ToDo;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export async function insertOne(toDo: Omit<ToDo, 'id'>) {
    try {
        const result = await (
            await window.fetch('https://dummyjson.com/todos/add', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(toDo),
            })
        ).json();

        return result as ToDo;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export async function updateOne(id: number, toDo: Partial<Omit<ToDo, 'id'>>) {
    try {
        const result = await (
            await window.fetch(`https://dummyjson.com/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(toDo),
            })
        ).json();

        return result as ToDo;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export async function deleteOne(id: number) {
    try {
        const result = await (
            await window.fetch(`https://dummyjson.com/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
            })
        ).json();

        return result as ToDo;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
