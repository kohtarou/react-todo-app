//import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 追加
import {
  faBalanceScale,
  faClock,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons"; // 追加
//import { twMerge } from "tailwind-merge"; // 追加

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
    <div
      className="flex justify-between items-center p-4 border-2 border-black rounded-[20px]"
      style={{ boxShadow: "3px 3px 10px 0px #6e6e6e" }}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-2 cursor-pointer w-5 h-5 rounded-full border-2 border-black  appearance-none checked:bg-blue-500" // Tailwind CSS クラスを使用
        />
        <label className="mr-4 font-bold text-lg">{todo.name}</label>
      </div>
      <div className="flex flex-col items-start mx-4">
        <div className="text-base">
          <FontAwesomeIcon icon={faBalanceScale} />
          優先度: {todo.priority}
        </div>
        {todo.deadline && (
          <div className="text-base">
            <FontAwesomeIcon icon={faClock} className="mr-1" />{" "}
            {/* アイコンを追加 */}
            期限: {dayjs(todo.deadline).format("YYYY/M/D HH:mm")}
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => props.remove(todo.id)}
          //className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"  ボタンのスタイルを変更
        >
          <FontAwesomeIcon icon={faCircleXmark} /> {/* アイコンを追加 */}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
