import { todo } from "./components/TodoItem/TodoItem";

const mockData: todo[] = [
    {
        userId: 1,
        id: 1,
        title: "Eat breakfast",
        completed: false
    },
    {
        userId: 2,
        id: 2,
        title: "Do laundry",
        completed: false
    },
    {
        userId: 1,
        id: 3,
        title: "Take out the trash",
        completed: false
    },
    {
        userId: 1,
        id: 4,
        title: "Write a blog post",
        completed: true
    },
    {
        userId: 1,
        id: 5,
        title: "Go out for a walk",
        completed: false
    }
];

export default mockData;
