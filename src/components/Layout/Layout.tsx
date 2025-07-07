
import styles from "./Layout.module.scss";
import TabsPanel from "../TabsPanel/TabsPanel";

import { tabs } from "@/api/tabs";
import { Outlet } from "react-router-dom";
import { renderTabs } from "@/app/formatters";
import type { RenderTab } from "@/types/tab";
import { useState } from "react";



const Layout = () => {
  const [preparedTabs, setPreparedTabs] = useState<RenderTab[]>(renderTabs(tabs));

  return (
    <div className={styles.Layout}>
      <aside className={styles.Layout__sidebar}></aside>

      <main className={styles.Layout__main}>
        <TabsPanel tabs={preparedTabs} setTabs={setPreparedTabs}/>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
