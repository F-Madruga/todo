import { useEffect, useState } from 'react';
import { getAll } from '../api/todo';
import { Paginated } from '../entities/paginated';
import { ToDo } from '../entities/todo';

export default function ListToDos() {
    const [toDos, setToDos] = useState<Paginated<ToDo>>({
        data: [],
        total: 0,
        skip: 0,
        limit: 0,
    });

    useEffect(() => {
        getAll().then((toDos) => setToDos(toDos));
    }, [toDos]);

    // function handleChangeStatus() {}

    return (
        <div>
            <ul>
                {toDos.data.map((toDo) => (
                    <li key={toDo.id}>
                        <label htmlFor={`${toDo.id}-input`}>{toDo.todo}</label>
                        <input
                            className={`${toDo.id}-input`}
                            type="checkbox"
                            defaultChecked={toDo.completed}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
