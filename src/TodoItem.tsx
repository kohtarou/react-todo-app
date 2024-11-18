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
    <div className="flex justify-between items-center p-4 border-2 border-[#afafaf] bg-[#afafaf] rounded-[20px]">
      {" "}
      {/* Tailwind CSS クラスを追加 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-2 cursor-pointer w-5 h-5 rounded-full border-2 border-gray-400 appearance-none checked:bg-blue-500" // Tailwind CSS クラスを使用
        />
        <label className="mr-4">{todo.name}</label>
      </div>
      <div className="flex flex-col items-start mx-4">
        {" "}
        {/* flex-col を削除し、space-x-4 を追加 */}
        <div className="text-sm">優先度: {todo.priority}</div>
        {todo.deadline && (
          <div className="text-sm">
            期限: {dayjs(todo.deadline).format("YYYY/M/D H:m")}
          </div>
        )}
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
  );
};

export default TodoItem;
