#!/bin/sh
# Adds the permission texts Apple requires (camera, microphone, photos) to the iOS app
P=ios/App/App/Info.plist
set_key(){ /usr/libexec/PlistBuddy -c "Delete :$1" "$P" 2>/dev/null || true; /usr/libexec/PlistBuddy -c "Add :$1 string $2" "$P"; }
set_key NSCameraUsageDescription "R-Style uses the camera to scan your clothes, take photos and make video calls with friends."
set_key NSMicrophoneUsageDescription "R-Style uses the microphone for voice messages, videos and calls with friends."
set_key NSPhotoLibraryUsageDescription "R-Style lets you choose photos of your clothes and looks from your library."
set_key NSPhotoLibraryAddUsageDescription "R-Style can save your looks to your photo library."
/usr/libexec/PlistBuddy -c "Delete :UIBackgroundModes" "$P" 2>/dev/null || true
/usr/libexec/PlistBuddy -c "Add :UIBackgroundModes array" "$P"
/usr/libexec/PlistBuddy -c "Add :UIBackgroundModes:0 string audio" "$P"
/usr/libexec/PlistBuddy -c "Add :UIBackgroundModes:1 string voip" "$P"
echo "Info.plist updated"
