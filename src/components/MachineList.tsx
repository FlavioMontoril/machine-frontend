import { useApi } from "../services/useApi"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "./ui/card";
import { Search, Settings } from "lucide-react";
import { Input } from "./ui/input";
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import { useTaskStore } from "../store/MachineStore";

export const MachineList: React.FC = () => {

    const api = useApi();
    const { setAll, list, deleteTask } = useTaskStore();

    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalItems, setTotalItems] = useState(0);
    const [searchMachine, setSearchMachine] = useState("");

    // let limit: number = 2;
    // const offset = (currentPage - 1) * limit;
    // const pagesCount = Math.ceil(totalItems / limit);
    // const firstMachineIndex = (currentPage - 1) * limit + 1;
    // const lastMachineIndex = Math.min(currentPage * limit, totalItems);

    useEffect(() => {
        fetchMachine()
    }, [searchMachine])

    async function fetchMachine() {

        try {
            const { status, data } = await api.task.getAllTasks()
            if (status === 200 && data)
                setAll(data)
            // setTotalItems(data.length);

        } catch (error: any) {
            console.error("Nao foi possivel buscar usuarios")
            return
        }
    }

    async function handleDeleteTask(id: string) {
        try {
            const { status } = await api.task.deleteTask(id);
            if (status === 200 || status === 204) {
                deleteTask(id)
                toast.success(`Máquina: ${id})} - deletada com sucesso`)

            }
        } catch (error: any) {
            toast.error(`Não foi possivel deletar task:${id}`)
        }
    }
    return (

        <div className="space-y-7">

            <div className="flex gap-2 items-center">
                < Search />
                <Input
                    type="text"
                    value={searchMachine}
                    placeholder="Pesquise a máquina por código ou descrição..."
                    onChange={(e) => setSearchMachine(e.target.value)}
                    className="w-80"
                />
            </div >

            <ScrollArea className="w-full h-[690px] rounded-md pr-4">
                <Accordion type="single" collapsible className="w-full m-5 pr-16">
                    {list.length > 0 ? (
                        list.map((user) => {
                            return (
                                <Card key={user.getId()} className="p-3 items-center">
                                    <AccordionItem value={`machine${user.getId()}`} className="border-none">
                                        <div className="flex items-center gap-2">

                                            <CardTitle className="flex items-center gap-2">
                                                <Settings />
                                                {user.getDescription()} -
                                            </CardTitle>
                                            <p>{dayjs(user.getCreatedAt()).format("DD-MM-YY")}</p>
                                        </div>
                                        <div className="flex justify-end">
                                            <AccordionTrigger className="flex justify-end" />
                                        </div>
                                        <AccordionContent>
                                            <span>{user.getSummary()}</span>

                                        </AccordionContent>

                                    </AccordionItem>
                                    <Button
                                        onClick={() => handleDeleteTask(user.getId())}
                                    >
                                        Deletar
                                    </Button>
                                </Card>
                            )

                        })
                    ) : (
                        <span>Sem máquinas para exibir</span>
                    )}
                </Accordion>
            </ScrollArea>


            {/* <div className="flex items-center">
                <span className="text-gray-500 flex justify-start pl-14">Máquinas {firstMachineIndex} - {lastMachineIndex} de {totalItems}</span>

                <Pagination className="flex justify-end pr-14">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={currentPage == 1 ? "pointer-events-none opacity-50" : ""}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                size=""
                            />

                        </PaginationItem>

                        {Array.from({ length: pagesCount }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    size=""
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {totalItems > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                        <PaginationItem>
                            <PaginationNext
                                className={currentPage === pagesCount ? "pointer-events-none opacity-50" : ""}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagesCount))}
                                size=""
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div> */}

            {/* <Button onClick={() => mockApi.machine.reset()}>
                Resetar Máquinas
            </Button> */}
        </div>

    )
}