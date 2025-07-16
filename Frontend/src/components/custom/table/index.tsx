import React, { ReactNode, useRef, useState } from "react";
import CustomTooltip from "@/components/custom/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowUp, Pencil } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { cn } from "@/lib/utils";
import CustomContextMenu, { CustomContextMenuItem } from "../context-menu";
import { Switch } from "@/components/ui/switch";

type ColumnConfig<T> = {
  align?: "left" | "center" | "right" | "justify" | "char";
  data?: keyof T | ((item: T) => React.ReactNode);
  className?: string;
};

export type CustomTableOmitableProps = "headers" | "columns" | "getId";

export type CustomTableProps<T> = {
  data?: T[];
  headers: (string | null)[];
  columns: ColumnConfig<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string, item: T) => void;
  addOperation?:
    | ((item: T) => React.ReactNode)
    | ((item: T) => React.ReactNode)[];
  getId: (item: T) => string;
  emptyMessage?: string;
  caption?: string;
  useNumbering?: boolean;
  useSelection?: boolean;
  onRowClick?: (item: T) => void;
  lineContextMenu?: {
    className?: string;
    items: CustomContextMenuItem<T>[];
  };
  onSelect?: (item: T) => void;
  onSelectMany?: (items: T[]) => void;
  selectedIds?: string[];
  notEditableItems?: string[];
  notDeletableItems?: string[];
  useLastSelection?: boolean;
  allSelected?: boolean;
  onSelectAll?: () => void;
};

export default function CustomTable<T>({
  data,
  headers,
  columns,
  onEdit,
  onDelete,
  getId,
  emptyMessage = "Sem dados cadastrados",
  caption,
  useNumbering = true,
  onRowClick,
  addOperation,
  lineContextMenu,
  useSelection = true,
  onSelect,
  selectedIds,
  notDeletableItems,
  notEditableItems,
  useLastSelection,
  allSelected,
  onSelectAll,
  onSelectMany,
}: CustomTableProps<T>) {
  const [selectedItemId, setSelectedItemId] = useState<string>();
  const lastSelectedIndexRef = useRef<number | null>(null);

  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const handleSort = (colIndex: number) => {
    if (sortColumn === colIndex) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(colIndex);
      setSortOrder("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!data || sortColumn === null || !columns[sortColumn]) return data;

    const { data: columnData } = columns[sortColumn];

    return [...data].sort((a, b) => {
      if (columnData === undefined) return 0;
      const aValue =
        typeof columnData === "function" ? columnData(a) : a?.[columnData];
      const bValue =
        typeof columnData === "function" ? columnData(b) : b?.[columnData];

      const getTextContent = (
        node:
          | string
          | number
          | boolean
          | ReactNode
          | Iterable<ReactNode>
          | T[keyof T]
          | null
          | undefined
      ): string => {
        if (typeof node === "string" || typeof node === "number") {
          return String(node);
        } else if (React.isValidElement(node)) {
          return node.props.children ? getTextContent(node.props.children) : "";
        } else if (Array.isArray(node)) {
          return node.map(getTextContent).join("");
        }
        return "";
      };

      const aText = getTextContent(aValue);
      const bText = getTextContent(bValue);

      if (aText == null && bText == null) return 0;
      if (aText == null) return sortOrder === "asc" ? 1 : -1;
      if (bText == null) return sortOrder === "asc" ? -1 : 1;

      const aNum = Number(aText);
      const bNum = Number(bText);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }

      return sortOrder === "asc"
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    });
  }, [data, sortColumn, sortOrder, columns]);

  const isAllSelected = React.useMemo(() => {
    const internalAllSelected =
      data &&
      selectedIds &&
      selectedIds.length === data.length &&
      selectedIds.every((id) => data.some((item) => getId(item) === id));
    return (
      ((allSelected !== undefined && allSelected) || internalAllSelected) ??
      false
    );
  }, [data, selectedIds, getId, allSelected]);

  // const toggleSelection = (idsToToggle: string[]) => {
  //   if (!onSelect || !getId || !data || !selectedIds) return;

  //   const selectedSet = new Set(selectedIds);
  //   const allSelected = idsToToggle.every((id) => selectedSet.has(id));
  //   const newSelectedIds = allSelected
  //     ? selectedIds.filter((id) => !idsToToggle.includes(id))
  //     : Array.from(new Set([...selectedIds, ...idsToToggle]));

  //   const selectedItems = data.filter((item) =>
  //     newSelectedIds.includes(getId(item))
  //   );
  //   onSelect(selectedItems);
  // };

  const handleSelect = (
    dataItem: T,
    index: number,
    event: React.MouseEvent
  ) => {
    if (!getId || !data || !sortedData || !selectedIds) return;

    // const currentId = getId(dataItem);

    if (event.shiftKey && lastSelectedIndexRef.current !== null) {
      const start = Math.min(lastSelectedIndexRef.current, index);
      const end = Math.max(lastSelectedIndexRef.current, index);

      const idsToToggle = sortedData
        .slice(start, end + 1)
        .filter(Boolean) as T[];

      onSelectMany?.(idsToToggle);
    } else {
      onSelect?.(dataItem);
      lastSelectedIndexRef.current = index;
    }
  };

  const handleSelectAll = () => {
    if (!data || !getId || !onSelect || !selectedIds) return;

    if (onSelectAll) {
      onSelectAll();
      return;
    }
    onSelectMany?.(data);
  };

  const isSelectable = (useSelection && onSelect) || onSelectMany;

  const finalHeaders = headers.filter(Boolean) as string[];

  return (
    <Table className="h-full rounded-t-md overflow-hidden">
      {caption && (
        <TableCaption className="font-bold">
          {caption} ({data?.length || 0})
        </TableCaption>
      )}
      <TableHeader className="bg-ipilOrange sticky top-0 text-lg text-white select-none font-bold">
        <TableRow className="hover:bg-ipilOrange">
          {isSelectable && (
            <TableHead
              className="text-center sticky left-0 flex w-min items-center"
              align="center"
            >
              <Switch
                className="cursor-pointer w-10 h-5 data-[state=checked]:bg-white "
                thumbClassName="cursor-pointer size-4 data-[state=checked]:bg-ipilOrange"
                onCheckedChange={handleSelectAll}
                checked={isAllSelected}
              />
            </TableHead>
          )}
          {useNumbering && <TableHead className="text-center">Nº</TableHead>}
          {finalHeaders.map((header, index) => (
            <TableHead key={index} onClick={() => handleSort(index)}>
              <span className="hover:underline cursor-pointer flex items-center justify-center gap-2">
                {header}
                {sortColumn === index && (
                  <ArrowUp
                    size={15}
                    className={cn("transition-all", {
                      "transform rotate-180": sortOrder === "asc",
                    })}
                  />
                )}
              </span>
            </TableHead>
          ))}
          {(onEdit || onDelete || addOperation) && (
            <TableHead className="text-center w-min">Operações</TableHead>
          )}{" "}
          {isSelectable && useLastSelection && (
            <TableHead
              className="text-center sticky left-0 flex w-min items-center"
              align="center"
            >
              <Switch
                className="cursor-pointer w-10 h-5 data-[state=checked]:bg-white "
                thumbClassName="cursor-pointer size-4 data-[state=checked]:bg-ipilOrange"
                onCheckedChange={handleSelectAll}
                checked={isAllSelected}
              />
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody className="h-full text-base">
        {sortedData ? (
          sortedData.length > 0 ? (
            sortedData.map((dataItem, index) => {
              const isSelected = selectedItemId === getId?.(dataItem);

              const rowContent = (
                <TableRow
                  onClick={() => {
                    setSelectedItemId(getId?.(dataItem));
                    onRowClick?.(dataItem);
                  }}
                  key={getId?.(dataItem)}
                  className={cn(
                    "appear transition-all box-content hover:bg-gray-100",
                    {
                      "bg-[#d96f3277] hover:bg-[#d96f3294]": index % 2 !== 0,
                    },
                    {
                      "cursor-pointer": onRowClick,
                    },
                    {
                      "bg-gray-400/40 hover:bg-gray-400/60 outline-dashed outline-2 outline-ipilOrangeLight/80":
                        isSelected,
                    },
                    { "cursor-pointer": lineContextMenu }
                  )}
                >
                  {isSelectable && (
                    <TableCell
                      className="text-center sticky left-0 h-full flex w-min items-center"
                      align="center"
                    >
                      <Switch
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(dataItem, index, e);
                        }}
                        className="w-10 h-5"
                        thumbClassName="size-4"
                        checked={
                          selectedIds && selectedIds.includes(getId(dataItem))
                        }
                      />
                    </TableCell>
                  )}

                  {useNumbering && (
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                  )}
                  {columns.map(
                    ({ data, align = "center", className }, colIndex) => (
                      <TableCell
                        className={className}
                        align={align}
                        key={colIndex}
                      >
                        {typeof data === "function"
                          ? data(dataItem)
                          : data
                          ? (dataItem[data] as React.ReactNode)
                          : undefined}
                      </TableCell>
                    )
                  )}
                  {(onEdit || onDelete || addOperation) && (
                    <TableCell className="flex items-center justify-center gap-2 text-sm h-full">
                      {/* Operações customizadas */}
                      {typeof addOperation === "function"
                        ? addOperation(dataItem)
                        : addOperation?.map((operation, idx) => (
                            <span key={idx}>{operation(dataItem)}</span>
                          ))}

                      {/* Botão Editar */}
                      {onEdit &&
                        (notEditableItems?.includes(getId(dataItem)) ? null : (
                          <CustomTooltip content="Editar">
                            <Button
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(dataItem);
                              }}
                            >
                              <Pencil size={15} />
                            </Button>
                          </CustomTooltip>
                        ))}

                      {/* Botão Eliminar */}
                      {onDelete &&
                        (notDeletableItems?.includes(getId(dataItem)) ? null : (
                          <CustomTooltip content="Eliminar">
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(getId(dataItem), dataItem);
                              }}
                            >
                              <MdDelete size={15} />
                            </Button>
                          </CustomTooltip>
                        ))}

                      {/* Fallback: nenhum permitido */}
                      {!addOperation &&
                        onEdit &&
                        onDelete &&
                        notEditableItems?.includes(getId(dataItem)) &&
                        notDeletableItems?.includes(getId(dataItem)) && (
                          <span className="text-muted-foreground italic">
                            BLOQUEADO
                          </span>
                        )}
                    </TableCell>
                  )}
                  {isSelectable && useLastSelection && (
                    <TableCell
                      className="text-center sticky left-0 h-full flex w-min items-center"
                      align="center"
                    >
                      <Switch
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(dataItem, index, e);
                        }}
                        className="w-10 h-5"
                        thumbClassName="size-4"
                        checked={
                          selectedIds && selectedIds.includes(getId(dataItem))
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
              return lineContextMenu && lineContextMenu.items.length > 0 ? (
                <CustomContextMenu data={lineContextMenu} dataItem={dataItem}>
                  {rowContent}
                </CustomContextMenu>
              ) : (
                rowContent
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={
                isSelectable ? headers.length + 3 : headers.length + 2
               } className="text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )
        ) : (
          <TableRow>
            <TableCell className="p-0" colSpan={headers.length + 3}>
              <Skeleton className="w-full h-12 rounded-none" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
