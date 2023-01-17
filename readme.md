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