import React from 'react';
import { render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import mockData from './mockData';

describe("<App /> test", () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve([
                { id: 1, title: "Take out the trash", completed: false },
                { id: 2, title: "Do the dishes", completed: false },
            ]),
        }) as jest.MockedFunction<typeof fetch>;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });



    it("should render <App /> component", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        render(<App />);
        await screen.findByText(/My todo list/i);
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        expect(screen.getByText(/My todo list/i)).toBeInTheDocument();
    });

    it("should add a todo item", async () => {
        const newTodo = {
            userId: 3,
            id: Math.floor(Math.random() * 10000) + 1,
            title: 'Do math homework',
            completed: false,
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => newTodo,
            });

        render(<App />);
        await screen.findByText(/My todo list/i);

        userEvent.type(screen.getByRole("textbox"), 'Do math homework');
        userEvent.click(screen.getByText(/Add new todo/i));

        await screen.findByText(/saving/i);
        await waitForElementToBeRemoved(() => screen.queryByText(/saving/i));

        expect(screen.getByText(/Do math homework/i)).toBeInTheDocument();
    });
    it("removes todo item from list", async () => {
        render(<App />);
        await screen.findByText(/Take out the trash/i);
        userEvent.click(screen.getByTestId('close-btn-1'));
        await waitFor(() => {
            expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();

        });
    });
    it("crosses out a todo item when completed", async () => {
        render(<App />);
        const todoItemText = /Take out the trash/i;

        await screen.findByText(todoItemText);

        const checkbox = screen.getByTestId('checkbox-1');
        userEvent.click(checkbox);

        await waitFor(() => expect(checkbox).toBeChecked());

        const todoItem = screen.getByText(todoItemText);
        expect(todoItem).toHaveClass('completed');


    });
    test('edits a todo item', async () => {
        render(<App />);

        const initialText = await screen.findByText('Take out the trash');
        expect(initialText).toBeInTheDocument();

        const editButton = screen.getByTestId('edit-btn-1');
        expect(editButton).toBeInTheDocument();
        userEvent.click(editButton);

        const inputField = await screen.findByRole('textbox');
        expect(inputField).toBeInTheDocument();

        userEvent.clear(inputField);
        userEvent.type(inputField, 'Take out the recycling');

        const submitButton = screen.getByText('Add new todo');

        expect(submitButton).toBeInTheDocument();
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.queryByText('Take out the trash')).not.toBeInTheDocument();
        });


    });



});






