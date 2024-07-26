// src/types/tabIcon.ts
import { ImageSourcePropType } from 'react-native';

export type TabIconProps = {
  icon: ImageSourcePropType;
  focused: boolean;
  color: string;
  name: string;
};
