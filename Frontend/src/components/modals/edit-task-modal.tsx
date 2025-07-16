import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastPromiseConfig } from "../config/toast";
import { taskSchema } from "@/modules/validations/task";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CustomSelector from "../custom/selector";

export default function TaskEditForm({
  defaultValues,
  onSubmit,
}: {
  onSubmit: (data: TaskToUpdate) => Promise<void>;
  defaultValues?: TaskToUpdate;
}) {
  const form = useForm<TaskToUpdate>({
    resolver: zodResolver(taskSchema.partial()),
    defaultValues,
  });

  const handleOnSubmit = async (data: TaskToUpdate) => {
    toastPromiseConfig({
      fn: onSubmit(data),
      loading: "A criar tarefa...",
      success: "Tarefa criada com sucesso.",
    });
  };
  return (
    <Form {...form}>
      <form
        className="[&>*]:w-full w-full mx-auto space-y-2"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Tarefa</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Comprar um caderno" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field}></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prioridade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridade</FormLabel>
              <FormControl>
                <CustomSelector
                  items={[
                    {
                      value: "Alta",
                      children: "Alta",
                    },

                    {
                      value: "Média",
                      children: "Media",
                    },

                    {
                      value: "Baixa",
                      children: "Baixa",
                    },
                  ]}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="data_vencimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Vencimento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          type="submit"
        >
          Editar
        </button>
      </form>
    </Form>
  );
}
