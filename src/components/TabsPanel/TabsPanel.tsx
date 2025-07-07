import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { RenderTab } from "@/types/tab";
import styles from "./TabsPanel.module.scss";
import ArrowDownIco from "../Icons/ArrowDownIco/ArrowDownIco";
import { useEffect, useRef, useState } from "react";
import Tab from "../Tab/Tab";
import CloseIco from "../Icons/BankingIco copy/CloseIco";
import classNames from "classnames";

type Props = {
  tabs: RenderTab[];
  setTabs: (tabs: RenderTab[]) => void;
};

export default function TabsPanel({ tabs, setTabs }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const [visibleTabs, setVisibleTabs] = useState<RenderTab[]>([]);
  const [overflowTabs, setOverflowTabs] = useState<RenderTab[]>([]);

  const [allMeasured, setAllMeasured] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDropDown, setIsDropDown] = useState(false);

  const reportWidth = (id: string, width: number) => {
    setTabWidths((prev) => {
      if (prev[id] === width) return prev;
      const updated = { ...prev, [id]: width };
      if (Object.keys(updated).length === tabs.length) {
        setAllMeasured(true);
      }
      return updated;
    });
  };

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setAllMeasured(false);
        setTabWidths({});
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!allMeasured || containerWidth === 0) return;

    let used = 0;
    const shown: RenderTab[] = [];
    const hidden: RenderTab[] = [];

    for (const tab of tabs) {
      const width = tabWidths[tab.id] ?? 100;
      if (used + width <= containerWidth - 40) {
        shown.push(tab);
        used += width;
      } else {
        hidden.push(tab);
      }
    }

    setVisibleTabs(shown);
    setOverflowTabs(hidden);
  }, [allMeasured, containerWidth, tabs, tabWidths]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const shouldRenderTabs = containerWidth > 0 && allMeasured;
  const tabsToRender = shouldRenderTabs ? visibleTabs : tabs;

  const handleDeleteTab = (id: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);

    setTabWidths((prev) => {
      const newWidths: Record<string, number> = {};
      const newTabs = tabs.filter((tab) => tab.id !== id);
      for (const tab of newTabs) {
        if (prev[tab.id] !== undefined) {
          newWidths[tab.id] = prev[tab.id];
        }
      }
      return newWidths;
    });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    handleDeleteTab(id);
  };

  const handleDropdown = () => {
    setIsDropDown((prev) => !prev);
  };

  return (
    <div ref={containerRef} className={styles.TabsPanel}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) return;
          const oldIndex = tabs.findIndex((t) => t.id === active.id);
          const newIndex = tabs.findIndex((t) => t.id === over.id);
          const newTabs = [...tabs];
          const [moved] = newTabs.splice(oldIndex, 1);
          newTabs.splice(newIndex, 0, moved);
          setTabs(newTabs);
        }}
      >
        <SortableContext
          items={tabsToRender.map((t) => t.id)}
          strategy={horizontalListSortingStrategy}
        >
          {tabsToRender.map((tab, ind) => (
            <Tab
              isTitle={ind !== 0}
              key={tab.id}
              tab={tab}
              reportWidth={reportWidth}
              onDelete={handleDeleteTab}
            />
          ))}
        </SortableContext>
      </DndContext>

      {shouldRenderTabs && overflowTabs.length > 0 && (
        <div className={styles.dropdown}>
          <button
            className={classNames(styles.dropdown__btn, {
              [styles.dropdown__btn_active]: isDropDown,
            })}
            onClick={handleDropdown}
          >
            <ArrowDownIco className={styles.arrow} />
          </button>
          <div
            className={classNames(styles.dropdown__list, {
              [styles.dropdown__list_active]: isDropDown,
            })}
          >
            {overflowTabs.map((tab) => (
              <div key={tab.id} className={styles.dropdown__item}>
                <div className={styles.dropdown__title}>
                  <tab.ico />
                  <p>{tab.title}</p>
                </div>

                <button
                  onClick={(e) => handleDelete(e, tab.id)}
                  className={styles.delete}
                >
                  <CloseIco />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
