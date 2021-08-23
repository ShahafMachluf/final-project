export default {
    name: 'TinDog',
    icon: './assets/icon.png',
    android: {
        package: "com.shahafm.tindog",
        versionCode: 1,
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.shahafm.tindog",
        buildNumber: "1.0.0"
    },
    // use this to work with the backend & SQL servers on Azure
    //extra:{
        //APIAddress: "https://tindog.azurewebsites.net/api",
        //WebSocketAddress: "ws://tindog.azurewebsites.net",
   // }
    // use this to work with local backend & SQL servers
     extra:{
         APIAddress: "http://192.168.0.105:45455/api",
         WebSocketAddress: "ws://192.168.0.105:45455"
     }
};