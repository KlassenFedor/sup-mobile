import React from 'react';
import { Flex, Text, WhiteSpace } from '@ant-design/react-native';
import { ContentBlock, Button } from '@sup-components';
import commonStyles from '../../../styles';
import { styles } from './styles';
import { StylesType } from '@/app/shared/types';

type ScreenHeaderProps = {
  actionButtonTitle?: string | React.ReactNode;
  backButtonTitle?: string | React.ReactNode;
  headerTitle: string | React.ReactNode;
  headerBlockStyle?: { [key: string]: any };
  onActionButtonPress?: () => void;
  onBackPress?: () => void;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  actionButtonTitle,
  backButtonTitle,
  headerTitle,
  headerBlockStyle = {},
  onActionButtonPress,
  onBackPress,
}) => {
  const hasAnyButtons = !!backButtonTitle || !!actionButtonTitle;

  return (
    <ContentBlock style={{ ...styles.screenHeaderBlock, ...headerBlockStyle }}>
      {!hasAnyButtons && <WhiteSpace size="xl" />}
      {hasAnyButtons && (
        <Flex justify="between" wrap="nowrap">
          <Flex.Item style={commonStyles.alignItemsStart}>
            {backButtonTitle && (
              <Button onPress={onBackPress} styleType="blank">
                <Text style={styles.blankBtnText}>{backButtonTitle}</Text>
              </Button>
            )}
          </Flex.Item>
          <Flex.Item style={commonStyles.alignItemsEnd}>
            {actionButtonTitle && (
              <Button onPress={onActionButtonPress} styleType="blank">
                <Text style={styles.blankBtnText}>{actionButtonTitle}</Text>
              </Button>
            )}
          </Flex.Item>
        </Flex>
      )}
      <Text style={styles.headerTitle}>{headerTitle}</Text>
    </ContentBlock>
  );
};

export default ScreenHeader;
