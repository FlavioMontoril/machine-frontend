import { useForm } from "react-hook-form"
import { machineSchema, MachineSchema } from "../validations/MachineSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMachineStore } from "../store/MachineStore";
import { mockApi } from "../services/useApi";
import { useNavigate } from "react-router-dom";

export const CreateMachine: React.FC = () => {
    const { add } = useMachineStore();
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm<MachineSchema>({
        resolver: zodResolver(machineSchema),
        defaultValues: {
            code: "",
            description: "",
            version: "",
        },
    })

    async function onSubmit(data: MachineSchema) {
        try {
            const response = await mockApi.machine.create(data); // Chama a API mock
            console.log("Resposta da API:", response); // Verifica a resposta da API
            if (response.success) {
                console.log("Disparou", data)
                add(response.data); // Adiciona à store
                alert("Máquina cadastrada com sucesso!");
                navigate("/")
            } else {
                alert("Erro ao cadastrar máquina.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar máquina:", error);
            alert("Erro ao cadastrar máquina.");
        }
    }
    return (
        <div>
            <h1>Cadastrar nova máquina</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Código</label>
                <input type="text" placeholder="Código da máquina" {...register("code")} />
                {errors.code && <p>{errors.code.message}</p>}

                <label>Descrição</label>
                <input type="text" placeholder="Descrição" {...register("description")} />
                {errors.description && <p>{errors.description.message}</p>}

                <label>Versão</label>
                <input type="text" placeholder="Versão" {...register("version")} />
                {errors.version && <p>{errors.version.message}</p>}

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

