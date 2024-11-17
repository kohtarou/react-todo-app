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
    <div className="flex justify-between items-start p-2 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-2 cursor-pointer"
          style={{
            width: "1.25rem", // サイズを調整
            height: "1.25rem", // サイズを調整
            borderRadius: "50%", // 丸くする
            border: "2px solid #ccc", // 枠線の色を調整
            appearance: "none", // デフォルトのスタイルを無効化
            WebkitAppearance: "none", // デフォルトのスタイルを無効化
            MozAppearance: "none", // デフォルトのスタイルを無効化
            cursor: "pointer", // カーソルをポインターに変更
          }}
        />
        <label className="mr-4">{todo.name}</label>
      </div>

      <div className="flex flex-col items-center mx-4">
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
