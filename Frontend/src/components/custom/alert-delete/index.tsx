"use client";
import { toastPromiseConfig } from "@/components/config/toast";
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
import { useState } from "react";

export default function AlertDeleteDialog({
  onConfirm,
  beforeConfirm,
  open,
  onCancelClick,
  message,
  subject,
  loadingMessage,
  successMessage,
}: {
  onConfirm: () => Promise<void>;
  beforeConfirm?: () => void;
  onCancelClick: () => void;
  open: boolean;
  message: string;
  subject: string;
  successMessage?: string;
  loadingMessage?: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onConfirmClick = () => {
    beforeConfirm?.();

    if (!onConfirm) return;

    setIsDeleting(true);
    toastPromiseConfig({
      fn: onConfirm().finally(() => {
        setIsDeleting(false);
        onCancelClick();
      }),
      loading: loadingMessage ?? `Eliminando ${subject.toLowerCase()}...`,
      success:
        successMessage ??
        `${subject[0].toUpperCase() + subject.slice(1)} eliminado com sucesso`,
    });
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} onClick={onCancelClick}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={onConfirmClick}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
