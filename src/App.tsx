import { useState, useEffect } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"; // faPlus アイコンを追加

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [editTodoId, setEditTodoId] = useState<string | null>(null); // 追加
  const [showAddTodo, setShowAddTodo] = useState(false); // 追加

  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const edit = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setNewTodoName(todoToEdit.name);
      setNewTodoPriority(todoToEdit.priority);
      setNewTodoDeadline(todoToEdit.deadline);
      setEditTodoId(id); // 編集モードに入るためのIDを設定
      setShowAddTodo(true); // 追加画面を表示
    }
  };

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }

    if (editTodoId) {
      // 編集モードの場合
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodoId
          ? {
              ...todo,
              name: newTodoName,
              priority: newTodoPriority,
              deadline: newTodoDeadline,
            }
          : todo
      );
      setTodos(updatedTodos);
      setEditTodoId(null); // 編集モードを終了
    } else {
      // 新規追加モードの場合
      const newTodo: Todo = {
        id: uuid(),
        name: newTodoName,
        isDone: false,
        priority: newTodoPriority,
        deadline: newTodoDeadline,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
    }

    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setShowAddTodo(false); // 追加画面を非表示
  };

  const handleAddTodoClick = () => {
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setEditTodoId(null); // 編集モードをリセット
    setShowAddTodo(true); // 追加画面を表示
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <p className="mb-4 text-lg">未完了のタスク: {uncompletedCount}</p>
      <TodoList
        todos={todos}
        updateIsDone={updateIsDone}
        remove={remove}
        edit={edit}
      />
      <div className="mt-5 flex items-center">
        <button
          type="button"
          onClick={handleAddTodoClick} // 追加画面を表示
          className="flex items-center justify-center rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />{" "}
          {/* アイコンを追加 */}
          Todoの追加
        </button>
        <button
          type="button"
          onClick={removeCompletedTodos}
          className="ml-4 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
        >
          完了済みのタスクを削除
        </button>
      </div>
      {showAddTodo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              {editTodoId ? "タスクの編集" : "新しいタスクの追加"}
            </h2>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <label className="font-bold" htmlFor="newTodoName">
                  名前
                </label>
                <input
                  id="newTodoName"
                  type="text"
                  value={newTodoName}
                  onChange={updateNewTodoName}
                  className={twMerge(
                    "grow rounded-md border p-2",
                    newTodoNameError && "border-red-500 outline-red-500"
                  )}
                  placeholder="2文字以上、32文字以内で入力してください"
                />
              </div>
              {newTodoNameError && (
                <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500 mb-4">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="mr-0.5"
                  />
                  <div>{newTodoNameError}</div>
                </div>
              )}
            </div>
            <div className="flex gap-5 mb-4">
              <div className="font-bold">優先度</div>
              {["高", "中", "低"].map((value, index) => (
                <label key={value} className="flex items-center space-x-1">
                  <input
                    id={`priority-${value}`}
                    name="priorityGroup"
                    type="radio"
                    value={index + 1}
                    checked={newTodoPriority === index + 1}
                    onChange={updateNewTodoPriority}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-x-2 mb-4">
              <label htmlFor="deadline" className="font-bold">
                期限
              </label>
              <input
                type="datetime-local"
                id="deadline"
                value={
                  newTodoDeadline
                    ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                    : ""
                }
                onChange={updateDeadline}
                className="rounded-md border border-gray-400 px-2 py-0.5"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddTodo(false)} // 追加画面を非表示
                className="rounded-md bg-gray-500 px-3 py-1 font-bold text-white hover:bg-gray-600"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={addNewTodo}
                className="rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
              >
                {editTodoId ? "更新" : "追加"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
