import React from "react";
import "@testing-library/jest-dom";
import { Matcher, render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import mockData from "../../mockData";
import { todo } from "../TodoItem/TodoItem";

describe("todo list test", () => {
  it("should show title of todos", () => {
    const todos: todo[] = mockData;
    render(<TodoList todo={todos} removeTodo={function (id: number): void {
      throw new Error("Function not implemented.");
    }} updateTodo={function (id: number): string {
      throw new Error("Function not implemented.");
    }} editTodo={function (id: number, title: string): string {
      throw new Error("Function not implemented.");
    }} />);
    mockData.forEach((d: { title: Matcher; }) =>
      expect(screen.getByText(d.title)).toBeInTheDocument()
    );
  });
});