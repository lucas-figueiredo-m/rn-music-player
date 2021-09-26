import React from 'react'
import { Text, TextStyle } from 'react-native'
import { styles } from './styles'

interface Props {
  textStyle?: TextStyle
}

export const Title: React.FC<Props> = ({ children, textStyle }) => <Text style={[styles.title, textStyle]}>{children}</Text>

