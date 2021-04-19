import React from 'react';
import { View, StyleSheet, ScrollView, Platform  } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';

const Drawer = props => {
    return (
        <ScrollView>
            <SafeAreaView
                style={styles.container}
                forceInset={{top: 'always', horizontal: 'never'}}
            >
                <DrawerItems
                    {...props}
                    itemStyle={{flexDirection: 'row-reverse'}}
                />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS == 'android' ? 25 : 0,
        alignItems: 'flex-end'
    }
});

export default Drawer;