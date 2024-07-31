import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import mockData from './mockData'; // Adjust the path as needed

// Mock fetch globally
beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("<App /> test", () => {
    it("should render <App /> component", async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        render(<App />);
        await screen.findByText(/My Todo List/i);
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();
    });

    it("should add a todo item", async () => {
        const newTodo = {
            userId: 3,
            id: Math.floor(Math.random() * 100) + 1,
            title: 'Do math homework',
            completed: false,
        };

        global.fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => newTodo,
            });

        render(<App />);
        await screen.findByText(/My Todo List/i);

        userEvent.type(screen.getByRole("textbox"), 'Do math homework');
        userEvent.click(screen.getByText(/Add new todo/i));

        // Wait for the saving indicator to be removed
        await screen.findByText(/saving/i);
        await waitForElementToBeRemoved(() => screen.queryByText(/saving/i));

        expect(screen.getByText(/Do math homework/i)).toBeInTheDocument();
    });

    it("should remove a todo from the list", async () => {
        global.fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })
            .mockResolvedValueOnce({
                ok: true,
            });

        render(<App />);
        await screen.findByText(/My Todo List/i);

        userEvent.click(screen.getByTestId('close-btn-1'));

        // Wait for the saving indicator to be removed
        await screen.findByText(/saving/i);
        await waitForElementToBeRemoved(() => screen.queryByText(/saving/i));

        expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();
    });

    it("todo item should be crossed out after completing", async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        render(<App />);
        await screen.findByText(/My Todo List/i);

        userEvent.click(screen.getByTestId('checkbox-1'));

        // Wait for the state change
        await screen.findByText(/Take out the trash/i); // Ensure the item is present before checking the class

        expect(screen.getByText(/Take out the trash/i)).toHaveClass('completed');
    });
});
