import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-community/masked-view'

const LinearGradientIcon = props => {
  return (
      <MaskedView
        maskElement={
          <View style={styles.maskedElement}>
            <Ionicons
              name={props.iconName}
              size={props.iconSize}
              color="white"
            />
          </View>
        }>
        <LinearGradient
          colors={props.iconColor}
          style={{height: props.iconSize, width: props.iconSize}}
        />
      </MaskedView>
  )
}

const styles = StyleSheet.create({
  maskedElement: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default LinearGradientIcon;