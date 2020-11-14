import React from 'react';
import { View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

interface LoadingIconProps {
  status:
    | 'basic'
    | 'primary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'control';

  size: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
}

const LoadingIcon = ({ status, size }: LoadingIconProps) => (
  <View style={{ flex: 1 }}>
    <Spinner size={size} status={status} />
  </View>
);

export default LoadingIcon;
