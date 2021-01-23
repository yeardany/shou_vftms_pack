## 安装依赖

+ 安装 `node@12.14.0`
+ 终端输入 `npm install -g webpack@3.12.0 cordova@8.1.2 code-push-cli@3.0.0 appcenter-cli@2.6.7`
+ 安装 `Java 1.8`，配置环境变量
+ `Android Studio` sdk版本为 Android 9，配置环境变量 `ANDROID_SDK_ROOT`
+ 安装 `gradle`

## 运行

+ `npm install`
+ 将打包后的 `www` 文件夹拷贝到 `shou_vftms_pack` 目录下
+ `cordova build android`
+ 手动启动模拟器
+ `cordova run android`
+ 或者使用 `Android Studio` 打开 `platform` 下 `android`