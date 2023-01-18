# Env Setup

Install Node (8)
nvm install 8.12.0
$ node --version
v8.6.0

install cordova
$ sudo npm install -g cordova@7.0.1
$ cordova --version
7.0.1

install ionic
$ sudo npm install -g ionic@3.19.0
$ ionic --version
3.19.0

ionic cordova plugin add cordova-plugin-mfp

cordova platform add ios

ionic cordova prepare


# Signing steps

1. ionic cordova build --release android

2. zipalign -v -p 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk pradip-unsigned-aligned.apk

3. apksigner sign --ks pradip-key.jks --out pradip-prod.apk pradip-unsigned-aligned.apk

# Env Details

1. Dev - http://10.3.0.134

2. Prod - https://mpradip.ntpc.co.in

# Keystore
pradip-key.jks
Password: compaq123
Alias: ntpcpradip


ntpcapps.keystore
ntpc@1234

App Hash: gHVQzBSetu6