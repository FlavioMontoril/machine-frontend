import { useEffect, useRef, useState } from "react"
import { useMachineStore } from "../store/MachineStore"
import { mockApi } from "../services/useApi"
import dayjs from "dayjs"
import { Card, CardTitle } from "./ui/card"
import { ListCheck, Search, Settings } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { ScrollArea } from "./ui/scroll-area"
import { toast } from "sonner"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"
import { Input } from "./ui/input"

export const MachineList: React.FC = () => {
    const { list, setAll } = useMachineStore() // Acessa o estado das máquinas no Zustand
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    let limit: number = 10;
    const offset = (currentPage - 1) * limit;
    const inputRef = useRef<HTMLInputElement>(null);
    console.log("lst", list);

    useEffect(() => {
        async function fetchMachines() {
            try {
                if (searchTerm.length < 3) {
                    const response = await mockApi.machine.getAll(limit, offset);

                    if (response.success) {
                        setAll(response.data.length, response.data);
                        setTotal(response.total);
                    } else {
                        toast.error("Erro ao carregar as máquinas");
                        return;
                    }
                } else {
                    const responseSearch = await mockApi.machine.getAll();

                    if (responseSearch.success) {
                        const filtered = responseSearch.data.filter((machine) =>
                            machine.code.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        setAll(filtered.length, filtered);
                    }
                }
            } catch (error) {
                toast.error("Erro ao carregar as máquinas");
            }
        }

        fetchMachines();
    }, [searchTerm, currentPage]);

    const totalPages = Math.ceil(total / limit);

    const firstMachineIndex = (currentPage - 1) * limit + 1;
    const lastMachineIndex = Math.min(currentPage * limit, total);

    return (

        <div>
            <div className="flex gap-2">

                <Search className="h-5 w-5 text-gray-500" />
                <Input
                    value={searchTerm}
                    ref={inputRef}
                    placeholder="Pesquise por código ou descrição"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-72 p-2 border rounded-md"
                />
            </div>


            <ScrollArea className="w-full pr-4 h-[790px] rounded-md">
                <Accordion type="single" collapsible className="m-5"> {/* Mudei de "single" para "multiple" */}
                    {/* Verifica se há máquinas na lista */}
                    {list.length > 0 ? (
                        list.map((machine) => (
                            <Card className="p-3" key={machine.id}>
                                <AccordionItem value={`machine${machine.id}`} className="border-none">
                                    {/* Exibe o título com o código da máquina */}
                                    <CardTitle className="flex">
                                        <Settings />
                                        {machine.code}
                                    </CardTitle>

                                    {/* Exibe a data de criação formatada e a descrição */}
                                    <span className="text-slate-400 text-sm">{dayjs(machine.createdAt).format("DD-MM-YYYY")}</span>
                                    <p className="text-gray-600 font-normal text-sm">{machine.description}</p>

                                    {/* A parte clicável que expande/colapsa o conteúdo */}
                                    <AccordionTrigger />
                                    <AccordionContent>
                                        {/* Verifica se a máquina tem versões */}
                                        <Accordion type="multiple">
                                            {machine.versions && machine.versions.length > 0 ? (
                                                machine.versions.map((version) => (
                                                    <Card className="p-3" key={version.id}>
                                                        <AccordionItem value={`machineVersion${version.id}`} className="border-none">
                                                            {/* Exibe o título da versão */}
                                                            <CardTitle className="flex">
                                                                <ListCheck />
                                                                {version.version}
                                                            </CardTitle>

                                                            {/* Exibe a data de criação da versão */}
                                                            <span className="text-slate-400 text-sm">{dayjs(version.createdAt).format("DD-MM-YYYY")}</span>

                                                            {/* Botão para expandir o conteúdo da versão */}
                                                            <AccordionTrigger />
                                                            <AccordionContent>
                                                                {/* Exemplo de conteúdo expandido */}
                                                                Yes. It adheres to the WAI-ARIA design pattern.
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Card>
                                                ))
                                            ) : (
                                                <p>Sem versões</p> // Exibe uma mensagem caso não haja versões
                                            )}
                                        </Accordion>
                                    </AccordionContent>
                                </AccordionItem>
                            </Card>
                        ))
                    ) : (
                        <p>Sem máquinas</p> // Exibe uma mensagem caso não haja máquinas
                    )}
                </Accordion>
            </ScrollArea>

            <div className="flex justify-between">

                <span className="text-gray-500">Máquinas {firstMachineIndex} - {lastMachineIndex} de {total}</span>


                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                size=""
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
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

                        {totalPages > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                        <PaginationItem>
                            <PaginationNext
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                size=""
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>
        </div>
    )
}

