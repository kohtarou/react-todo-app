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
  faArrowDownShortWide,
  faArrowDownWideShort,
  faSort,
} from "@fortawesome/free-solid-svg-icons"; // アイコンを追加

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoProgress, setNewTodoProgress] = useState<number>(0); // 追加
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [editTodoId, setEditTodoId] = useState<string | null>(null); // 追加
  const [showAddTodo, setShowAddTodo] = useState(false); // 追加
  const [sortOption, setSortOption] = useState<string | null>(null); // 変更
  const [sortOrder, setSortOrder] = useState<string>("asc"); // 追加

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

  const updateProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoProgress(Number(e.target.value));
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
      setNewTodoProgress(todoToEdit.progress); // 追加
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
              progress: newTodoProgress, // 追加
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
        progress: newTodoProgress, // 追加
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
    }

    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setNewTodoProgress(0); // 追加
    setShowAddTodo(false); // 追加画面を非表示
  };

  const handleAddTodoClick = () => {
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setNewTodoProgress(0); // 追加
    setEditTodoId(null); // 編集モードをリセット
    setShowAddTodo(true); // 追加画面を表示
  };

  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortOption === "priority") {
      return sortOrder === "asc"
        ? a.priority - b.priority
        : b.priority - a.priority;
    } else if (sortOption === "deadline") {
      if (a.deadline && b.deadline) {
        return sortOrder === "asc"
          ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      } else if (a.deadline) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (b.deadline) {
        return sortOrder === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    }
    return 0;
  });

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-3xl font-extrabold">TodoApp</h1>
      <p className="mb-4 text-lg">未完了のタスク: {uncompletedCount}</p>
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="sortOrder" className="font-bold">
            ソート順:
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={
                sortOrder === "asc"
                  ? faArrowDownShortWide
                  : faArrowDownWideShort
              }
              className="mr-1"
            />
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="rounded-md border p-2"
            >
              <option value="asc">昇順</option>
              <option value="desc">降順</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => handleSortOptionChange("priority")}
            className={`rounded-md px-3 py-1 font-bold text-white ${
              sortOption === "priority" ? "bg-blue-500" : "bg-gray-500"
            } hover:bg-blue-600`}
          >
            <FontAwesomeIcon icon={faSort} className="mr-1" />
            優先度順
          </button>
          <button
            type="button"
            onClick={() => handleSortOptionChange("deadline")}
            className={`rounded-md px-3 py-1 font-bold text-white ${
              sortOption === "deadline" ? "bg-blue-500" : "bg-gray-500"
            } hover:bg-blue-600`}
          >
            <FontAwesomeIcon icon={faSort} className="mr-1" />
            期限順
          </button>
        </div>
      </div>
      <TodoList
        todos={sortedTodos}
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
            <div className="flex items-center gap-x-2 mb-4">
              <label htmlFor="progress" className="font-bold">
                進捗
              </label>
              <input
                type="range"
                id="progress"
                value={newTodoProgress}
                onChange={updateProgress}
                className="rounded-md border border-gray-400 py-0.5"
                min="0"
                max="100"
              />
              <span>{newTodoProgress}%</span>
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
