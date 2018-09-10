import encBase64 from "crypto-js/enc-base64";
import cryptoJS from "crypto-js";

export default function decodeSessionToken(token) {
    if (token) {
        let base64Payload = token.split(".")[1],
            user = localStorage.getItem("user"),
            OneSignal = window.OneSignal || [];

        if (!user) {
            localStorage.setItem("user", encBase64.parse(base64Payload).toString(cryptoJS.enc.Utf8));
            OneSignal && OneSignal.push && OneSignal.push(["sendTags", {
                TENANT: 3,
                APP: 37,
                PROFILE: JSON.parse(localStorage.getItem('user')).userId
            }]);
        } else if (JSON.parse(user).roles.indexOf("REGISTERED") === -1) {
            localStorage.setItem("user", encBase64.parse(base64Payload).toString(cryptoJS.enc.Utf8));
            OneSignal && OneSignal.push && OneSignal.push(['sendTag', 'PROFILE', JSON.parse(localStorage.getItem("user")).userId]);
            OneSignal.on('notificationDisplay', (event) => {
                console.log('notificationDisplay');
            });
            OneSignal && OneSignal.push && OneSignal.push(["addListenerForNotificationOpened", (notification) => {
                window.notification.alert('Attention', notification, 'Ok', () => {})
            }]);
        }

        return JSON.parse(encBase64.parse(base64Payload).toString(cryptoJS.enc.Utf8))
    }
}
