import clsx, { ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date?: string | Date | null) => {
  return date && dayjs(date).isValid()
    ? dayjs(date).format("DD/MM/YYYY")
    : undefined;
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "text-red-600 bg-red-50 border-red-200";
    case "Media":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "Baixa":
      return "text-green-600 bg-green-50 border-green-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};
