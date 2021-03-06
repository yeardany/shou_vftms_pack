cordova.define("jpush-phonegap-plugin.JPushPlugin", function(require, exports, module) {
var JPushPlugin = function() {};

// private plugin function

JPushPlugin.prototype.receiveMessage = {};
JPushPlugin.prototype.openNotification = {};
JPushPlugin.prototype.receiveNotification = {};

JPushPlugin.prototype.isPlatformIOS = function() {
  return (
    device.platform === "iPhone" ||
    device.platform === "iPad" ||
    device.platform === "iPod touch" ||
    device.platform === "iOS"
  );
};

JPushPlugin.prototype.errorCallback = function(msg) {
  console.log("JPush Callback Error: " + msg);
};

JPushPlugin.prototype.callNative = function(
  name,
  args,
  successCallback,
  errorCallback
) {
  if (errorCallback) {
    cordova.exec(successCallback, errorCallback, "JPushPlugin", name, args);
  } else {
    cordova.exec(
      successCallback,
      this.errorCallback,
      "JPushPlugin",
      name,
      args
    );
  }
};

// Common methods
JPushPlugin.prototype.init = function() {
  if (this.isPlatformIOS()) {
    this.callNative("initial", [], null);
  } else {
    this.callNative("init", [], null);
  }
};

JPushPlugin.prototype.setDebugMode = function(mode) {
  if (device.platform === "Android") {
    this.callNative("setDebugMode", [mode], null);
  } else {
    if (mode === true) {
      this.setDebugModeFromIos();
    } else {
      this.setLogOFF();
    }
  }
};

JPushPlugin.prototype.getRegistrationID = function(successCallback) {
  this.callNative("getRegistrationID", [], successCallback);
};

JPushPlugin.prototype.stopPush = function() {
  this.callNative("stopPush", [], null);
};

JPushPlugin.prototype.resumePush = function() {
  this.callNative("resumePush", [], null);
};

JPushPlugin.prototype.isPushStopped = function(successCallback) {
  this.callNative("isPushStopped", [], successCallback);
};

JPushPlugin.prototype.clearLocalNotifications = function() {
  if (device.platform === "Android") {
    this.callNative("clearLocalNotifications", [], null);
  } else {
    this.clearAllLocalNotifications();
  }
};

/**
 * ???????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * @param params = { 'sequence': number, 'tags': ['tag1', 'tag2'] }
 */
JPushPlugin.prototype.setTags = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative("setTags", [params], successCallback, errorCallback);
};

/**
 * ???????????????
 *
 * @param params = { 'sequence': number, 'tags': ['tag1', 'tag2'] }
 */
JPushPlugin.prototype.addTags = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative("addTags", [params], successCallback, errorCallback);
};

/**
 * ?????????????????????
 *
 * @param params = { 'sequence': number, 'tags': ['tag1', 'tag2'] }
 */
JPushPlugin.prototype.deleteTags = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative("deleteTags", [params], successCallback, errorCallback);
};

/**
 * ?????????????????????
 *
 * @param params = { 'sequence': number }
 */
JPushPlugin.prototype.cleanTags = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative("cleanTags", [params], successCallback, errorCallback);
};

/**
 * ?????????????????????
 *
 * @param params = { 'sequence': number }
 */
JPushPlugin.prototype.getAllTags = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative("getAllTags", [params], successCallback, errorCallback);
};

/**
 * ???????????????????????????????????????????????????
 *
 * @param params = { 'sequence': number, 'tag': string }
 */
JPushPlugin.prototype.checkTagBindState = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative(
    "checkTagBindState",
    [params],
    successCallback,
    errorCallback
  );
};

/**
 * ???????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * @param params = { 'sequence': number, 'alias': string }
 */
JPushPlugin.prototype.setAlias = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative("setAlias", [params], successCallback, errorCallback);
};

/**
 * ???????????????
 *
 * @param params = { 'sequence': number }
 */
JPushPlugin.prototype.deleteAlias = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative("deleteAlias", [params], successCallback, errorCallback);
};

/**
 * ??????????????????????????????
 *
 * @param params = { 'sequence': number }
 */
JPushPlugin.prototype.getAlias = function(
  params,
  successCallback,
  errorCallback
) {
  this.callNative("getAlias", [params], successCallback, errorCallback);
};

// ??????????????????????????????????????????????????????
// iOS: ????????????????????? 0????????????????????????0: ???????????????
// UIRemoteNotificationTypeNone = 0,
// UIRemoteNotificationTypeBadge = 1 << 0,
// UIRemoteNotificationTypeSound = 1 << 1,
// UIRemoteNotificationTypeAlert = 1 << 2,
// UIRemoteNotificationTypeNewsstandContentAvailability = 1 << 3,
// Android: ????????? 1 ?????????????????????0: ???????????????
JPushPlugin.prototype.getUserNotificationSettings = function(successCallback) {
  if (this.isPlatformIOS()) {
    this.callNative("getUserNotificationSettings", [], successCallback);
  } else if (device.platform === "Android") {
    this.callNative("areNotificationEnabled", [], successCallback);
  }
};

// iOS methods

JPushPlugin.prototype.startJPushSDK = function() {
  this.callNative("startJPushSDK", [], null);
};

JPushPlugin.prototype.setBadge = function(value) {
  if (this.isPlatformIOS()) {
    this.callNative("setBadge", [value], null);
  }
};

JPushPlugin.prototype.resetBadge = function() {
  if (this.isPlatformIOS()) {
    this.callNative("resetBadge", [], null);
  }
};

JPushPlugin.prototype.setDebugModeFromIos = function() {
  if (this.isPlatformIOS()) {
    this.callNative("setDebugModeFromIos", [], null);
  }
};

JPushPlugin.prototype.setLogOFF = function() {
  if (this.isPlatformIOS()) {
    this.callNative("setLogOFF", [], null);
  }
};

JPushPlugin.prototype.setCrashLogON = function() {
  if (this.isPlatformIOS()) {
    this.callNative("crashLogON", [], null);
  }
};

JPushPlugin.prototype.addLocalNotificationForIOS = function(
  delayTime,
  content,
  badge,
  notificationID,
  extras
) {
  if (this.isPlatformIOS()) {
    this.callNative(
      "setLocalNotification",
      [delayTime, content, badge, notificationID, extras],
      null
    );
  }
};

JPushPlugin.prototype.deleteLocalNotificationWithIdentifierKeyInIOS = function(
  identifierKey
) {
  if (this.isPlatformIOS()) {
    this.callNative(
      "deleteLocalNotificationWithIdentifierKey",
      [identifierKey],
      null
    );
  }
};

JPushPlugin.prototype.clearAllLocalNotifications = function() {
  if (this.isPlatformIOS()) {
    this.callNative("clearAllLocalNotifications", [], null);
  }
};

JPushPlugin.prototype.setLocation = function(latitude, longitude) {
  if (this.isPlatformIOS()) {
    this.callNative("setLocation", [latitude, longitude], null);
  }
};

JPushPlugin.prototype.startLogPageView = function(pageName) {
  if (this.isPlatformIOS()) {
    this.callNative("startLogPageView", [pageName], null);
  }
};

JPushPlugin.prototype.stopLogPageView = function(pageName) {
  if (this.isPlatformIOS()) {
    this.callNative("stopLogPageView", [pageName], null);
  }
};

JPushPlugin.prototype.beginLogPageView = function(pageName, duration) {
  if (this.isPlatformIOS()) {
    this.callNative("beginLogPageView", [pageName, duration], null);
  }
};

JPushPlugin.prototype.setApplicationIconBadgeNumber = function(badge) {
  if (this.isPlatformIOS()) {
    this.callNative("setApplicationIconBadgeNumber", [badge], null);
  }
};

JPushPlugin.prototype.getApplicationIconBadgeNumber = function(callback) {
  if (this.isPlatformIOS()) {
    this.callNative("getApplicationIconBadgeNumber", [], callback);
  }
};

JPushPlugin.prototype.addDismissActions = function(actions, categoryId) {
  this.callNative("addDismissActions", [actions, categoryId]);
};

JPushPlugin.prototype.addNotificationActions = function(actions, categoryId) {
  this.callNative("addNotificationActions", [actions, categoryId]);
};

// Android methods
JPushPlugin.prototype.getConnectionState = function(successCallback) {
  if (device.platform === "Android") {
    this.callNative("getConnectionState", [], successCallback);
  }
};

JPushPlugin.prototype.setBasicPushNotificationBuilder = function() {
  if (device.platform === "Android") {
    this.callNative("setBasicPushNotificationBuilder", [], null);
  }
};

JPushPlugin.prototype.setCustomPushNotificationBuilder = function() {
  if (device.platform === "Android") {
    this.callNative("setCustomPushNotificationBuilder", [], null);
  }
};

JPushPlugin.prototype.receiveRegistrationIdInAndroidCallback = function(data) {
  if (device.platform === "Android") {
    data = JSON.stringify(data);
    var event = JSON.parse(data);
    cordova.fireDocumentEvent("jpush.receiveRegistrationId", event);
  }
};

JPushPlugin.prototype.receiveMessageInAndroidCallback = function(data) {
  data = JSON.stringify(data);
  this.receiveMessage = JSON.parse(data);
  cordova.fireDocumentEvent("jpush.receiveMessage", this.receiveMessage);
};

JPushPlugin.prototype.openNotificationInAndroidCallback = function(data) {
  data = JSON.stringify(data);
  this.openNotification = JSON.parse(data);
  cordova.fireDocumentEvent("jpush.openNotification", this.openNotification);
};

JPushPlugin.prototype.receiveNotificationInAndroidCallback = function(data) {
  data = JSON.stringify(data);
  this.receiveNotification = JSON.parse(data);
  cordova.fireDocumentEvent(
    "jpush.receiveNotification",
    this.receiveNotification
  );
};

JPushPlugin.prototype.clearAllNotification = function() {
  if (device.platform === "Android") {
    this.callNative("clearAllNotification", [], null);
  }
};

JPushPlugin.prototype.clearNotificationById = function(id) {
  if (device.platform === "Android") {
    this.callNative("clearNotificationById", [id], null);
  }
};

JPushPlugin.prototype.setLatestNotificationNum = function(num) {
  if (device.platform === "Android") {
    this.callNative("setLatestNotificationNum", [num], null);
  }
};

JPushPlugin.prototype.addLocalNotification = function(
  builderId,
  content,
  title,
  notificationID,
  broadcastTime,
  extras
) {
  if (device.platform === "Android") {
    this.callNative(
      "addLocalNotification",
      [builderId, content, title, notificationID, broadcastTime, extras],
      null
    );
  }
};

JPushPlugin.prototype.removeLocalNotification = function(notificationID) {
  if (device.platform === "Android") {
    this.callNative("removeLocalNotification", [notificationID], null);
  }
};

JPushPlugin.prototype.reportNotificationOpened = function(msgID) {
  if (device.platform === "Android") {
    this.callNative("reportNotificationOpened", [msgID], null);
  }
};

/**
 * ????????? Android 6.0 ????????????????????????????????????
 * ???????????????http://docs.jpush.io/client/android_api/#android-60
 */
JPushPlugin.prototype.requestPermission = function() {
  if (device.platform === "Android") {
    this.callNative("requestPermission", [], null);
  }
};

JPushPlugin.prototype.setSilenceTime = function(
  startHour,
  startMinute,
  endHour,
  endMinute
) {
  if (device.platform === "Android") {
    this.callNative(
      "setSilenceTime",
      [startHour, startMinute, endHour, endMinute],
      null
    );
  }
};

JPushPlugin.prototype.setPushTime = function(weekdays, startHour, endHour) {
  if (device.platform === "Android") {
    this.callNative("setPushTime", [weekdays, startHour, endHour], null);
  }
};

JPushPlugin.prototype.setGeofenceInterval = function(interval) {
  if (device.platform === "Android") {
    this.callNative("setGeofenceInterval", [interval], null);
  }
};

JPushPlugin.prototype.setMaxGeofenceNumber = function(maxNumber) {
  if (device.platform === "Android") {
    this.callNative("setMaxGeofenceNumber", [maxNumber], null);
  }
};

//????????????
JPushPlugin.prototype.setBadgeNumber = function(badgeNumb) {
  if (device.platform === "Android") {
    this.callNative("setBadgeNumber", [badgeNumb], null);
  }
};

if (!window.plugins) {
  window.plugins = {};
}

if (!window.plugins.jPushPlugin) {
  window.plugins.jPushPlugin = new JPushPlugin();
}

module.exports = new JPushPlugin();

});
