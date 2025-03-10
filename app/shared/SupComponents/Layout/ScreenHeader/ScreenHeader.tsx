import React from 'react';
import { Flex, Text, WhiteSpace } from '@ant-design/react-native';
import { ContentBlock, Button } from '@sup-components';
import { commonStyles } from '@common/styles';
import { styles } from './styles';

type ScreenHeaderProps = {
  actionButtonTitle?: string | React.ReactNode;
  backButtonTitle?: string | React.ReactNode;
  headerTitle: string | React.ReactNode;
  onActionButtonPress?: () => void;
  onBackPress?: () => void;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  actionButtonTitle,
  backButtonTitle,
  headerTitle,
  onActionButtonPress,
  onBackPress,
}) => {
  const hasAnyButtons = !!backButtonTitle || !!actionButtonTitle;

  return (
    <ContentBlock style={styles.screenHeaderBlock}>
      {!hasAnyButtons && <WhiteSpace size="xl" />}
      {hasAnyButtons && (
        <Flex justify="between" wrap="nowrap">
          <Flex.Item style={commonStyles.alignItemsStart}>
            {backButtonTitle && (
              <Button onPress={onBackPress} styleType="blank">
                <span style={styles.blankBtnText}>{backButtonTitle}</span>
              </Button>
            )}
          </Flex.Item>
          <Flex.Item style={commonStyles.alignItemsEnd}>
            {actionButtonTitle && (
              <Button onPress={onActionButtonPress} styleType="blank">
                <span style={styles.blankBtnText}>{actionButtonTitle}</span>
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
