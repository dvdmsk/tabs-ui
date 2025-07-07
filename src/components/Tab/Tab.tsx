import React, { useEffect, useRef } from "react";
import styles from "./Tab.module.scss";
import type { RenderTab } from "@/types/tab";
import { useSortable } from "@dnd-kit/sortable";
import { NavLink } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import CloseIco from "../Icons/BankingIco copy/CloseIco";

type Props = {
  tab: RenderTab;
  isTitle?: boolean;
  reportWidth: (id: string, width: number) => void;
  onDelete: (id: string) => void;
};

export default function Tab({
  isTitle = true,
  tab,
  reportWidth,
  onDelete,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timeout = setTimeout(() => {
      reportWidth(tab.id, el.offsetWidth);
    }, 0);

    return () => clearTimeout(timeout);
  }, [reportWidth, tab.id]);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete(tab.id);
  };

  return (
    <div
      ref={(el) => {
        ref.current = el;
        setNodeRef(el);
      }}
      style={style}
      {...attributes}
      {...listeners}
    >
      <NavLink
        to={tab.link}
        className={({ isActive }) =>
          classNames(styles.Tab__link, isActive && styles.Tab__link_active)
        }
      >
        <tab.ico />
        {isTitle && (
          <div>
            <p className={styles.Tab__title}>{tab.title}</p>
          </div>
        )}
        <button onClick={handleDelete} className={styles.Tab__delete}>
          <CloseIco />
        </button>
      </NavLink>
    </div>
  );
}
