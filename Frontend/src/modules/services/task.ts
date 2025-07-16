import { api } from "./api";

class TaskService {
    async create(dataToCreate: TaskToCreate) {
        const { data } = await api.post<Task>('/task/create', dataToCreate);
        return data;
    }

    async getById(id: string) {
        const { data } = await api.get<Task>(`/task/${id}`)
        return data;
    }

    async getAll({ filter }: { filter?: string }) {
        const { data } = await api.get<Task[]>(`/task${filter ? `?filter=${filter}` : ""}`)
        return data;
    }

    async update(id: string,dataToUpdate: TaskToUpdate) {
        const { data } = await api.put<Task>(`/task/${id}`, dataToUpdate)
        return data;
    }

    async delete(id: string) {
        const { data } = await api.delete<Task>(`/task/${id}`);
        return data;
    }
}

export const taskService = new TaskService()