import React from 'react';
import { View } from '@ant-design/react-native';
import { StylesType } from '@common/types';
import { handleStylesToAdd } from '@common/helpers';

type ContentBlockProps = {
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  children: React.ReactNode;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  style?: StylesType;
};

/**
 * Компонент-обертка логически обособленной части контента экрана
 * По умолчанию
 *     контент располагается в колонке
 *     с отступом внутри контейнера в 8px
 * Доступные аргументы: justifyContent, alignItems, styles (добавляются к стилям по умолчанию)
 */
const ContentBlock: React.FC<ContentBlockProps> = ({ alignItems, children, justifyContent, style }) => {
  return (
    <View
      style={{
        alignItems: alignItems,
        flexDirection: 'column',
        justifyContent: justifyContent,
        marginHorizontal: 0,
        padding: 8,
        ...handleStylesToAdd(style),
      }}
    >
      {children}
    </View>
  );
};

export default ContentBlock;
