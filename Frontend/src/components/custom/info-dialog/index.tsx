"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CustomInfoDialog({
  onConfirm,
  open,
  message,
  aditionalContent,
  title,
}: {
  onConfirm: () => void;
  open: boolean;
  message?: string;
  aditionalContent?: React.ReactNode;
  title: string;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Tem a certeza?"}
          </AlertDialogTitle>
          {message && (
            <AlertDialogDescription>{message}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {aditionalContent && aditionalContent}
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm}>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
