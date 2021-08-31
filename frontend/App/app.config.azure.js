export default {
    name: 'TinDog',
    icon: './assets/icon.png',
    owner: "tindog",
    android: {
        package: "com.shahafm.tindog",
        versionCode: 1,
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.shahafm.tindog",
        buildNumber: "1.0.0"
    },
    extra:{
        APIAddress: "https://tindog.azurewebsites.net/api",
        WebSocketAddress: "ws://tindog.azurewebsites.net",
   }
};
