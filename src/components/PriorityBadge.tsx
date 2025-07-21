

export default function PriorityBadge({ Prioridade }: { Prioridade: string }) {

  const cores = {
    baixa: "bg-green-200 text-green-800",
    media: "bg-yellow-200 text-yellow-800",
    alta: "bg-red-200 text-red-800",
  };

  return (
    <span className={`px-2 py-0.5 text-xs rounded  "bg-gray-200 text-gray-700"`}>
      {Prioridade.toUpperCase()}
    </span>
  );
}
