//import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 追加
import {
  faBalanceScale,
  faClock,
  faFilePen,
  faCircleXmark, // 追加
} from "@fortawesome/free-solid-svg-icons"; // 追加
//import { twMerge } from "tailwind-merge"; // 追加

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  edit: (id: string) => void;
  priority: number;
  deadline: Date | null;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;

  return (
    <div
      className="relative flex justify-between items-center p-4 border border-[#303030] rounded-[10px]"
      style={{ boxShadow: "3px 3px 10px 0px #6e6e6e" }} // インラインスタイルを追加
    >
      <button
        onClick={() => props.remove(todo.id)}
        className="absolute -top-2 -right-2 flex items-center justify-center transform scale-150 bg-white rounded-full" // ボタンのスタイルを変更
      >
        <FontAwesomeIcon icon={faCircleXmark} /> {/* アイコンを追加 */}
      </button>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-2 cursor-pointer w-5 h-5 rounded-full border-2 border-black appearance-none checked:bg-blue-500" // Tailwind CSS クラスを使用
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
            <FontAwesomeIcon icon={faClock} className="mr-1" /> 期限:{" "}
            {dayjs(todo.deadline).format("YYYY/M/D HH:mm")}
          </div>
        )}
      </div>
      <div
        className="border border-[#404040] rounded-[10px] p-1" // ボタンのスタイルを変更
      >
        <button
          onClick={() => props.edit(todo.id)} // 編集ボタンのクリックイベント
          className="flex items-center justify-center w-16 h-4" // ボタンのサイズを調整
        >
          <FontAwesomeIcon icon={faFilePen} />
          <span className="ml-1 scale-75">編集</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
