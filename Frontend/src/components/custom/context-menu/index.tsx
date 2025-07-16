import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import React from "react";
export type CustomContextMenuItem<T> = {
  label: string;
  shortcut?: React.ReactNode;
  onClick?: (item: T) => void;
  separator?: boolean;
  inset?: boolean;
  disabled?: boolean;
  className?: string;
  subContent?: {
    className?: string;
    items: CustomContextMenuItem<T>[];
  };
};
export default function CustomContextMenu<T>({
  children,
  data,
  dataItem,
}: {
  children: React.ReactNode;
  data: { className?: string; items: CustomContextMenuItem<T>[] };
  dataItem: T;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className={data.className}>
        {data.items.map((item, index) => {
          const { subContent } = item;
          return subContent ? (
            <React.Fragment key={index}>
              <ContextMenuSub>
                <ContextMenuSubTrigger inset={item.inset}>
                  {item.label}
                </ContextMenuSubTrigger>

                <ContextMenuSubContent className={subContent.className}>
                  {subContent.items.map((subItem, subIndex) => (
                    <ContextMenuItem
                      key={subIndex}
                      className={subItem.className}
                      disabled={subItem.disabled || !subItem.onClick}
                      inset={subItem.inset}
                      onClick={() => subItem.onClick?.(dataItem)}
                    >
                      {subItem.label}
                      {subItem.shortcut && (
                        <ContextMenuShortcut>
                          {subItem.shortcut}
                        </ContextMenuShortcut>
                      )}
                    </ContextMenuItem>
                  ))}
                </ContextMenuSubContent>
              </ContextMenuSub>
              {item.separator && <ContextMenuSeparator />}
            </React.Fragment>
          ) : (
            <ContextMenuItem
              key={index}
              className={item.className}
              inset={item.inset}
              disabled={item.disabled || !item.onClick}
              onClick={() => item.onClick?.(dataItem)}
            >
              {item.label}
              {item.shortcut && (
                <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
              )}
            </ContextMenuItem>
          );
        })}
      </ContextMenuContent>
    </ContextMenu>
  );
}
