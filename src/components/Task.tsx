import { TrashIcon } from "@phosphor-icons/react";
import style from "../style/TodoList.module.css";

function Task ({
  name,
  isfinesh,
  onDelect,
  onChange
}: {
  name: string;
  isfinesh?: boolean;
  onDelect?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
})  {
  return (
    <div className={style.task}>
      <label className={style.checkboxLabel}>
        <input
          type="checkbox"
          title={
            isfinesh ? "Marcar como não concluída" : "Marcar como concluída"
          }
          aria-label={
            isfinesh ? "Marcar como não concluída" : "Marcar como concluída"
          }
          checked={isfinesh}
          onChange={onChange}
        />
        <span className={style.checkboxIndicator} />
      </label>
      <span className={isfinesh ? style.fineshTask : ""}>{name}</span>
      <button
        className={style.deleteButton}
        onClick={onDelect}
        title="Deletar tarefa"
        aria-label="Deletar tarefa"
      >
        <TrashIcon size={24} weight="bold" />
      </button>
    </div>
  );
};

export { Task };