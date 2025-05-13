import { useApi } from "../services/useApi"
import {
   Accordion, AccordionContent, AccordionItem,
   AccordionTrigger
} from "../components/ui/accordion";
import { useEffect, useMemo, useState } from "react";
import { Card, CardTitle } from "../components/ui/card";
import { Search, Settings } from "lucide-react";
import { Input } from "../components/ui/input";
import {
   Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink,
   PaginationNext, PaginationPrevious
} from "../components/ui/pagination";
import { ScrollArea } from "../components/ui/scroll-area";
import dayjs from "dayjs";
import { useTaskStore } from "../store/TaskStore";
import { TaskAction } from "./TaskAction";
import { DatePickerTask } from "./DatePickerTask";
import { toast } from "sonner";

export const MachineList: React.FC = () => {

   const [dateTask, setDateTask] = useState<Date[] | undefined>(undefined);
   const { task } = useApi();
   const { setAllTasks, list } = useTaskStore();

   const [currentPage, setCurrentPage] = useState(1);
   const [searchTask, setSearchTask] = useState("");

   const loading = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));


   let limit: number = 10;
   const offset = (currentPage - 1) * limit;


   async function fetchMachine() {

      try {
         const { status, data } = await task.getAllTasks()
         if (status === 200)
            setAllTasks(data)


      } catch (error: any) {
         console.error("Nao foi possivel buscar usuarios")
         return
      }
   }

   useEffect(() => {
      fetchMachine()
   }, [])

   const filterTasks = useMemo(() => {
      const formattedDates = dateTask?.map((d) => dayjs(d).format("DD-MM-YYYY")) ?? [];
      const searchTerm = searchTask.trim().toLocaleLowerCase();
      const sortedTasks = [...list].sort((a, b) =>
         new Date(b.getCreatedAt()).getTime() - new Date(a.getCreatedAt()).getTime());

      if (searchTerm.length > 3)
         return sortedTasks
            .filter((task) =>
               task.getSummary().toLocaleLowerCase().includes(searchTerm) ||
               task.getDescription().toLocaleLowerCase().includes(searchTerm));

      if (dateTask)
         return sortedTasks.filter((task) =>
            formattedDates.includes(dayjs(task.getCreatedAt()).format("DD-MM-YYYY")));

      return sortedTasks;
   }, [list, searchTask, dateTask]);

   const filteredTasks = filterTasks;
   const pagesCount = Math.ceil(filteredTasks.length / limit);
   const currentTasksPage = filteredTasks.slice(offset, offset + limit);

   const firstMachineIndex = (currentPage - 1) * limit + 1;
   const lastMachineIndex = Math.min(currentPage * limit, filteredTasks.length);

   toast.promise(loading, { loading: 'Loading...', });


   return (

      <div className="space-y-7">

         <div className="flex gap-2 items-center">
            < Search />
            <Input
               type="text"
               value={searchTask}
               placeholder="Pesquise a máquina por código ou descrição..."
               onChange={(e) => { setSearchTask(e.target.value); setCurrentPage(1) }}
               className="w-80"
            />
            <DatePickerTask
               dateTask={dateTask}
               setDateTask={setDateTask} />
         </div >

         <ScrollArea className="w-full h-[690px] rounded-md pr-4">
            <Accordion type="single" collapsible className="w-full m-5 pr-16">
               {currentTasksPage.length > 0 ? (
                  currentTasksPage.map((user) => {
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
            <span className="text-gray-500 flex justify-start pl-14">Máquinas {firstMachineIndex} - {lastMachineIndex} de {filterTasks.length}</span>

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

                  {pagesCount > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

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