import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { deleteOne, getMany, insertOne, updateOne } from '../api/todo';
import { Paginated, paginationFrom } from '../entities/paginated';
import { ToDo } from '../entities/todo';

export default function ListToDos() {
    const [pagination, setPagination] = useState<Omit<Paginated<ToDo>, 'data'>>(
        { total: 0, skip: 0, limit: 30 },
    );
    const [toDos, setToDos] = useState<ToDo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newToDo, setNewToDo] = useState<string>('');

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

    function handleSubmitNewToDo(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        const insertedToDo = insertOne({ text: newToDo, completed: false });

        setToDos([...toDos, insertedToDo]);
    }

    function handleNewToDoInputChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setNewToDo(event.target.value);
    }

    function handleDeleteClicktoDo(
        event: MouseEvent<HTMLButtonElement>,
        toDo: ToDo,
    ) {
        event.preventDefault();
        const deletedToDo = deleteOne(toDo.id);

        if (deletedToDo) {
            setToDos(toDos.filter((toDo) => toDo.id !== deletedToDo.id));
        }
    }

    if (error) {
        return <div>Something went wrong</div>;
    }

    return (
        <>
            <h3>{`Total ${pagination.total}`}</h3>
            <form onSubmit={handleSubmitNewToDo}>
                <div>
                    {/* <label htmlFor="newToDoInput">Add ToDo</label> */}
                    <input
                        className="newToDoInput"
                        type="text"
                        onChange={handleNewToDoInputChange}
                    />
                </div>
                <button type="submit">Add ToDo</button>
            </form>
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
                        <button onClick={(e) => handleDeleteClicktoDo(e, toDo)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
