import { useAppStore } from "@/modules/services/stores/app";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PathRestorer = () => {
  const targetPath = useAppStore((state) => state.targetPath);
  const setTargetPath = useAppStore((state) => state.setTargetPath);

  const navigate = useNavigate();

  useEffect(() => {
    if (targetPath) {
      navigate(targetPath);
      setTargetPath(null);
    }
  }, [targetPath]);

  return null;
  // <AlertDialog open={!!previousLocation}>
  //   <AlertDialogContent>
  //     <AlertDialogHeader>
  //       <AlertDialogTitle>
  //         A localização da sua ultima sessão foi salva, pretende restaurar?
  //       </AlertDialogTitle>
  //       <AlertDialogDescription>
  //         Ao fazer isso irá restaurar a localização da sua ultima sessão.
  //       </AlertDialogDescription>
  //     </AlertDialogHeader>
  //     <AlertDialogFooter>
  //       <AlertDialogCancel onClick={cancelRestore}>
  //         Cancelar
  //       </AlertDialogCancel>
  //       <AlertDialogAction onClick={restoreLocation}>
  //         Confirmar
  //       </AlertDialogAction>
  //     </AlertDialogFooter>
  //   </AlertDialogContent>
  // </AlertDialog>
};

export default PathRestorer;
