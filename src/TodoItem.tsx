//import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  priority: number;
  deadline: Date | null;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div className="flex items-center ">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer rounded-full"
        />
      </div>

      <div className="flex items-center">
        <label>{todo.name}</label>
      </div>

      <div className="flex-col flex-center">
        <div class-Nam="ml-suto">優先度:{todo.priority}</div>

        <div>
          {todo.deadline && (
            <div className="ml-auto">
              期限: {dayjs(todo.deadline).format("YYYY年M月D日 H時m分")}
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={() => props.remove(todo.id)}
          className="flex flex-row space-x-2 item-center rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
