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
    <div className="flex justify-between items-center p-2 border-b">
      {" "}
      {/* items-start を items-center に変更 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-2 cursor-pointer w-5 h-5 rounded-full border-2 border-gray-400 appearance-none checked:bg-blue-500" // Tailwind CSS クラスを使用
        />
        <label className="mr-4">{todo.name}</label>
      </div>
      <div className="flex items-center mx-4 space-x-4">
        {" "}
        {/* flex-col を削除し、space-x-4 を追加 */}
        <div className="text-sm">優先度: {todo.priority}</div>
        {todo.deadline && (
          <div className="text-sm">
            期限: {dayjs(todo.deadline).format("YYYY年M月D日 H時m分")}
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
