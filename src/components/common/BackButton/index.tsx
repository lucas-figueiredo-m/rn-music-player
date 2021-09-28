import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { SVG } from 'components'
import chevronLeft from 'assets/icons/chevron-left.svg'
import { styles } from './styles'
import { Colors, Metrics } from 'styles'

const hitSlop = {
  left: Metrics.defaulHitSlop,
  right: Metrics.defaulHitSlop,
  top: Metrics.defaulHitSlop,
  bottom: Metrics.defaulHitSlop,
}

export const BackButton: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => goBack()}
      style={styles.root}
      hitSlop={hitSlop}
    >
      <SVG xml={chevronLeft} color={Colors.White} width={30} height={30} />
    </TouchableOpacity>
  )
}