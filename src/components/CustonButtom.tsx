import style from "../style/TodoList.module.css";


export function CustonButtom({
  onClick,
  disable,
}: {
  onClick: () => void;
  disable: boolean;
}) {
  return (
    <button className={style.button} onClick={onClick} disabled={disable}>
      Criar
    </button>
  );
};
