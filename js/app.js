/**
 * 星辰跑腿
 **/

(function(owner) {

//获取应用设置
owner.getSettings = function() {
	var settingsText = localStorage.getItem('$settings') || "{}";
	return JSON.parse(settingsText);
}

/**
 * 设置应用本地配置
 **/
owner.setSettings = function(settings) {
	settings = settings || {};
	localStorage.setItem('$settings', JSON.stringify(settings));
}

//获取应用当前状态
owner.getState = function() {
	var stateText = localStorage.getItem('$state') || "{}";
	return JSON.parse(stateText);
};

/**
 * 设置当前状态
 **/
owner.setState = function(state) {
	state = state || {};
	localStorage.setItem('$state', JSON.stringify(state));
};

//创建状态
owner.createState = function(name, callback) {
	var state = owner.getState();
	state.account = name;
	state.token = "token123456789";
	owner.setState(state);
	return callback(); 
};

/**
 * 获取本地是否安装客户端
 **/
owner.isInstalled = function(id) {
	if(id === 'qihoo' && mui.os.plus) {
		return true;
	}
	if(mui.os.android) {
		var main = plus.android.runtimeMainActivity();
		var packageManager = main.getPackageManager();
		var PackageManager = plus.android.importClass(packageManager)
		var packageName = {
			"qq": "com.tencent.mobileqq",
			"weixin": "com.tencent.mm",
			"sinaweibo": "com.sina.weibo"
		}
		try {
			return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
		} catch(e) {}
	} else {
		switch(id) {
			case "qq":
				var TencentOAuth = plus.ios.import("TencentOAuth");
				return TencentOAuth.iphoneQQInstalled();
			case "weixin":
				var WXApi = plus.ios.import("WXApi");
				return WXApi.isWXAppInstalled()
			case "sinaweibo":
				var SinaAPI = plus.ios.import("WeiboSDK");
				return SinaAPI.isWeiboAppInstalled()
			default:
				break;
		}
	}
}

}(window.app = {}));