import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentType } from "react";

interface IFormDialogProps<TData, TDefaultValues, TOtherData> {
  onSubmit: (data: TData) => Promise<void>;
  onCloseClick: () => void;
  open: boolean;
  description?: string;
  subject: string;
  data?: TDefaultValues;
  otherData?: TOtherData;
  form: ComponentType<{
    onSubmit: (data: TData) => Promise<void>;
    defaultValues?: TDefaultValues;
    otherData?: TOtherData;
  }>;
  className?: string;
}

export default function FormDialog<TData, TDefaultValues, TOtherData>({
  onSubmit,
  onCloseClick,
  open,
  description,
  form,
  subject,
  data,
  otherData,
  className,
}: IFormDialogProps<TData, TDefaultValues, TOtherData>) {
  const Form = form;

  const handleSubmit = async (data: TData) => {
    await onSubmit(data).then(() => {
      onCloseClick?.();
    });
  };
  return (
    <Dialog open={open}>
      <DialogContent className={className} onCloseClick={onCloseClick}>
        <DialogHeader>
          <DialogTitle>{subject}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form
          onSubmit={handleSubmit}
          defaultValues={data}
          otherData={otherData}
        />
      </DialogContent>
    </Dialog>
  );
}
