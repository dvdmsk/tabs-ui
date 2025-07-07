import AccountingIco from "@/components/Icons/AccountingIco/AccountingIco";
import AdministrationIco from "@/components/Icons/AdministrationIco/AdministrationIco";
import AuswahllistenIco from "@/components/Icons/AuswahllistenIco/AuswahllistenIco";
import BankingIco from "@/components/Icons/BankingIco/BankingIco";
import DashboardIco from "@/components/Icons/DashboardIco/DashboardIco";
import EinkaufIco from "@/components/Icons/EinkaufIco/EinkaufIco";
import EmailIco from "@/components/Icons/EmailIco/EmailIco";
import HelpIco from "@/components/Icons/HelpIco/HelpIco";
import LagerverwaltungIco from "@/components/Icons/LagerverwaltungIco/LagerverwaltungIco";
import RechnIco from "@/components/Icons/RechnIco/RechnIco";
import StatistikIco from "@/components/Icons/StatistikIco/StatistikIco";
import TelefonieIco from "@/components/Icons/TelefonieIco/TelefonieIco";
import VerkaufIco from "@/components/Icons/VerkaufIco/VerkaufIco";
import WarenbestandIco from "@/components/Icons/WarenbestandIco/WarenbestandIco";
import type { Tab, RenderTab } from "@/types/tab";

export const IconComponentMap: { [key: string]: React.FC } = {
  Lagerverwaltung: LagerverwaltungIco,
  Dashboard: DashboardIco,
  Banking: BankingIco,
  Telefonie: TelefonieIco,
  Accounting: AccountingIco,
  Verkauf: VerkaufIco,
  Statistik: StatistikIco,
  Email: EmailIco,
  Administration: AdministrationIco,
  Help: HelpIco,
  Warenbestand: WarenbestandIco,
  Auswahllisten: AuswahllistenIco,
  Einkauf: EinkaufIco,
  Rechn: RechnIco,
};

export const renderTabs = (tabs: Tab[]): RenderTab[] => {
  return tabs.map((tab) => {
    const IconComponent = tab.iconName
      ? IconComponentMap[tab.iconName]
      : undefined;

    return {
      ...tab,
      ico: IconComponent || (() => <div></div>),
    };
  });
};