import { ChangeEvent, useEffect, useState } from 'react';
import { getMany, updateOne } from '../api/todo';
import { Paginated, paginationFrom } from '../entities/paginated';
import { ToDo } from '../entities/todo';

export default function ListToDos() {
    const [pagination, setPagination] = useState<Omit<Paginated<ToDo>, 'data'>>(
        { total: 0, skip: 0, limit: 30 },
    );
    const [toDos, setToDos] = useState<ToDo[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const paginatedToDos = getMany(pagination.limit, pagination.skip);

            setToDos(paginatedToDos.data);
            setPagination(paginationFrom(paginatedToDos));
        } catch (error) {
            setError(error);
        }
    }, []);

    function handleCheckedChange(
        event: ChangeEvent<HTMLInputElement>,
        item: ToDo,
    ) {
        const newToDo = updateOne(item.id, {
            ...item,
            completed: event.target.checked,
        });

        if (newToDo) {
            setToDos(
                toDos.map((toDo) => (toDo.id === newToDo.id ? newToDo : toDo)),
            );
        }
    }

    if (error) {
        return <div>Something went wrong</div>;
    }

    return (
        <>
            <div>{`Total ${pagination.total}`}</div>
            <ul>
                {toDos.map((toDo) => (
                    <li key={toDo.id}>
                        <label htmlFor={`${toDo.id}-input`}>{toDo.text}</label>
                        <input
                            className={`${toDo.id}-input`}
                            type="checkbox"
                            onChange={(e) => handleCheckedChange(e, toDo)}
                            checked={toDo.completed}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
