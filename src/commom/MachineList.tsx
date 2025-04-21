import { useApi } from "../services/useApi"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { useEffect, useMemo, useState } from "react";
import { Card, CardTitle } from "../components/ui/card";
import { Search, Settings } from "lucide-react";
import { Input } from "../components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
import { ScrollArea } from "../components/ui/scroll-area";
import dayjs from "dayjs";
import { useTaskStore } from "../store/TaskStore";
import { TaskAction } from "./TaskAction";

export const MachineList: React.FC = () => {

    const api = useApi();
    const { setAllTasks, list } = useTaskStore();

    console.log("LIST", list);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchMachine, setSearchMachine] = useState("");

    let limit: number = 10;
    const offset = (currentPage - 1) * limit;
    const pagesCount = Math.ceil(totalItems / limit);
    const firstMachineIndex = (currentPage - 1) * limit + 1;
    const lastMachineIndex = Math.min(currentPage * limit, totalItems);

    useEffect(() => {
        fetchMachine()

    }, [currentPage])

    console.log("LIST USEEFFECT", list);
    async function fetchMachine() {

        try {
            const { status, data } = await api.task.getAllTasks({ limit, offset })
            if (status === 200 && data)
                setAllTasks(data)
            setTotalItems(data.length);

        } catch (error: any) {
            console.error("Nao foi possivel buscar usuarios")
            return
        }
    }

    const sortedTasks = useMemo(() => {
        return [...list].sort(
            (a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime()
        );
    }, [list]);

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
                    {sortedTasks.length > 0 ? (
                        sortedTasks.map((user) => {
                            return (
                                <Card key={user.getId()} className="p-3 items-center">
                                    <AccordionItem value={`machine${user.getId()}`} className="border-none">
                                        <div className="flex items-center gap-2">

                                            <CardTitle className="flex items-center gap-2">
                                                <Settings />
                                                {user.getDescription()} -
                                            </CardTitle>
                                            <p>{dayjs(user.getCreatedAt()).format("DD-MM-YYYY")}</p>
                                            <TaskAction actionId={user.getId()} />
                                        </div>
                                        <div className="flex justify-end">
                                            <AccordionTrigger className="flex justify-end" />
                                        </div>
                                        <AccordionContent>
                                            <span>{user.getSummary()}</span>

                                        </AccordionContent>

                                    </AccordionItem>
                                </Card>
                            )
                        })
                    ) : (
                        <span>Sem máquinas para exibir</span>
                    )}
                </Accordion>
            </ScrollArea>


            <div className="flex items-center">
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
            </div>
        </div>

    )
}