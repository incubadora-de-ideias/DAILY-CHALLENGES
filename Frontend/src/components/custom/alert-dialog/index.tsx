"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CustomAlertDialog({
  onConfirm,
  open,
  onCancelClick,
  message,
  aditionalContent,
  cancelDisabled,
  confirmDisabled,
  title,
}: {
  onConfirm: () => void;
  onCancelClick: () => void;
  open: boolean;
  message: string;
  aditionalContent?: React.ReactNode;
  confirmDisabled?: boolean;
  cancelDisabled?: boolean;
  title?: string;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Tem a certeza?"}
          </AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        {aditionalContent && aditionalContent}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={cancelDisabled} onClick={onCancelClick}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction disabled={confirmDisabled} onClick={onConfirm}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
