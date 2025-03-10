import { RootStackParamListKeys } from '@/app/context/NavigationContext';
import { OutlineGlyphMapType } from '@ant-design/icons-react-native';

export type IconNames = OutlineGlyphMapType;

export type IconLibs = 'Feather' | 'Octicons';
export type NavItemType = { navItemKey: RootStackParamListKeys; iconName: string; iconLib?: IconLibs };
