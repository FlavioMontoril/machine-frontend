import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useApi } from "../services/useApi";
import { taskSchema, TaskSchema } from "../validations/MachineSchema";
import { TypeProps } from "../model/MachineModel";
import { toast } from "sonner";
import { useTaskStore } from "../store/TaskStore";

export const CreateTask: React.FC = () => {
    const navigate = useNavigate();
    const api = useApi();
    const { addTask } = useTaskStore();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            summary: "",
            description: "",
            reporter: "",
            type: TypeProps.TASK,
            assignee: "",
        },
    });

    const onSubmit = async (data: TaskSchema) => {
        try {
            const { status, data: createdData } = await api.task.createTask(data);
            if (status === 201 && createdData) {
                addTask(createdData);
                toast.success("Tarefa criada")
                reset();
                navigate("/");
            } else {
                toast.error("Erro ao cadastrar máquina");

            }
        } catch (error: any) {
            console.error("Erro ao criar tarefa:", error.message);
            alert("Não foi possível criar a tarefa.");
        };
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl mb-4">Criar Nova Tarefa</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* SUMMARY */}
                <div>
                    <label className="block mb-1">Resumo</label>
                    <input
                        {...register("summary")}
                        placeholder="Resumo da tarefa"
                        className="w-full border px-2 py-1"
                    />
                    {errors.summary && (
                        <p className="text-red-600">{errors.summary.message}</p>
                    )}
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block mb-1">Descrição</label>
                    <textarea
                        {...register("description")}
                        placeholder="Descrição detalhada"
                        className="w-full border px-2 py-1 h-24"
                    />
                    {errors.description && (
                        <p className="text-red-600">{errors.description.message}</p>
                    )}
                </div>

                {/* REPORTER */}
                <div>
                    <label className="block mb-1">Repórter</label>
                    <input
                        {...register("reporter")}
                        placeholder="Quem reportou"
                        className="w-full border px-2 py-1"
                    />
                    {errors.reporter && (
                        <p className="text-red-600">{errors.reporter.message}</p>
                    )}
                </div>

                {/* TYPE */}
                <div>
                    <label className="block mb-1">Tipo</label>
                    <select {...register("type")} className="w-full border px-2 py-1">
                        {Object.values(TypeProps).map((tp) => (
                            <option key={tp} value={tp}>
                                {tp.replace("_", " ")}
                            </option>
                        ))}
                    </select>
                    {errors.type && (
                        <p className="text-red-600">{errors.type.message}</p>
                    )}
                </div>

                {/* ASSIGNEE */}
                <div>
                    <label className="block mb-1">Responsável</label>
                    <input
                        {...register("assignee")}
                        placeholder="Quem vai executar (opcional)"
                        className="w-full border px-2 py-1"
                    />
                    {errors.assignee && (
                        <p className="text-red-600">{errors.assignee.message}</p>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >Cadastrar
                </button>
            </form>
        </div>
    );
};
