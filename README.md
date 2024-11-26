# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。

## 開発履歴

- 2024年10月24日：プロジェクト開始
- 2024年10月31日：タスクの追加・削除機能、タスク詳細の入力欄などを追加
- 2024年11月17日 ～ 2024年11月25日：タスク表示に関するUIの改善、優先度の前に天秤のアイコンを追加、優先度の表現を十字型の星に変更、Todoの要素に進捗を追加、デザインの変更

## 機能

- Todoの追加
- - 名前、優先度、期限、進捗の入力
- 完了したTodoの削除
- 未完了タスクの表示
- Todoのソート
- - 昇順、降順の選択
- - 昇順と降順でソートアイコンを変更
- - 優先度順、期限順の選択

- Todo要素
- - Todo要素の削除ボタン(バツ印)
- - Todo要素の編集ボタン
- - 進捗、優先度、期限の表示
- - チェックボックス(丸型)

## 工夫ポイント

- 追加画面：追加画面を中心に表示させるようにした
- Todoの削除ボタン：Todo要素の右上に丸に囲まれたバツ印をつけた。クリックすると削除できるようになっている
- 進捗の表示、入力：ゲージ型にすることで直感的に分かるようにした。入力もスライドするだけで済むようにした
- 優先度を示す数値(要素)として✦を使用した

## ライセンス

MIT License

Copyright (c) 2024 koh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
