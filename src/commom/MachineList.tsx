import {
   Accordion, AccordionContent, AccordionItem,
   AccordionTrigger
} from "../components/ui/accordion";
import { Card, CardTitle } from "../components/ui/card";
import { Search, Settings } from "lucide-react";
import { Input } from "../components/ui/input";
import {
   Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink,
   PaginationNext, PaginationPrevious
} from "../components/ui/pagination";
import { ScrollArea } from "../components/ui/scroll-area";
import dayjs from "dayjs";
import { TaskAction } from "./TaskAction";
import { DatePickerTask } from "./DatePickerTask";
// import { toast } from "sonner";
import { useMachines } from "../hook/useMachine";

export const MachineList: React.FC = () => {

   const { dateTask, setDateTask, searchTask, setSearchTask, currentPage, setCurrentPage, filteredTasks,
      currentTasksPage, pagesCount, firstMachineIndex, lastMachineIndex } = useMachines();

   // const loading = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
   // toast.promise(loading, { loading: 'Loading...', });


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
            <span className="text-gray-500 flex justify-start pl-14">Máquinas {firstMachineIndex} - {lastMachineIndex} de {filteredTasks.length}</span>

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