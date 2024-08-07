import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TodoItem from './TodoItem';
import mockData from "../../mockData";

let removeTodo = jest.fn();
let updateTodo = jest.fn();
let editTodo = jest.fn();
describe('<TodoItem /> tests', () => {
    it("should render todo item with close button.", () => {
        render(<TodoItem todo={mockData[0]} removeTodo={removeTodo} updateTodo={updateTodo} editTodo={editTodo} />);
        expect(screen.getByText(/eat breakfast/i)).toBeInTheDocument();
        expect(screen.getByTestId('close-btn-1')).toBeInTheDocument();
    });

    it("should render todo item with checkbox.", () => {
        render(<TodoItem todo={mockData[0]} removeTodo={removeTodo} updateTodo={updateTodo} editTodo={editTodo} />);
        expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();
        expect(screen.getByText(/eat breakfast/i)).toBeInTheDocument();
    });
})
