import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatHeader = props => {
    return (
        <View style={styles.header}>
            <Ionicons 
                style={styles.icon} 
                name="arrow-forward" 
                size={30} 
                onPress={() => {props.onBackIconPress()}} 
            />
            <Text
                style={styles.text}
            >{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginVertical: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    icon: {
        marginRight: 15
    },
    text: {
        marginLeft: 15
    }
});

export default ChatHeader;