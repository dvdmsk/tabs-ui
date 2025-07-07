export interface Tab {
  id: string;
  title: string;
  iconName?: string;
  link: string;
}

export interface IconComponentType {
  ico: React.FC;
}

export type RenderTab = Tab & IconComponentType;