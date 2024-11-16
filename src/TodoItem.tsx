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
    <div className="flex items-center justify-between">
      <div className="flex justify-start">
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

          <div className="flex-col">
            <div>優先度:{todo.priority}</div>

            <div>
              {todo.deadline && (
                <div className="ml-4 flex items-center text-sm text-slate-500">
                  期限: {dayjs(todo.deadline).format("YYYY年M月D日 H時m分")}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => props.remove(todo.id)}
            className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
