import { OutlineGlyphMapType } from '@ant-design/icons-react-native';
import { NavRoutes } from '@/app';

export type IconNames = OutlineGlyphMapType;

export type IconLibs = 'Feather' | 'Octicons';
export type NavItemType = { navItemKey: NavRoutes; iconName: string; iconLib?: IconLibs };
