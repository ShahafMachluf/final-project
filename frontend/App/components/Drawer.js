import React from 'react';
import { View, StyleSheet, ScrollView  } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';

const Drawer = props => {
    return (
        <ScrollView>
            {console.log(props)}
            <SafeAreaView
                forceInset={{top: 'always', horizontal: 'never'}}
            >
                <DrawerItems {...props}/>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

});

export default Drawer;