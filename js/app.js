/**
 * 星辰跑腿
 **/

(function(owner) {

	//检查手机号码格式
	owner.check_phone = function(phone) {
		if(phone.length == 0) {
			return '请输入手机号码！';
		}
		if(phone.length != 11) {
			return "请输入有效的号码格式";
		}
		var myreg = /^1\d{10}$/;
		if(!myreg.test(phone)) {
			return '请输入有效的手机号码！';
		}
		return null;
	}

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
	owner.createState = function(info, callback) {
		var state = owner.getState();
		state.name = info[0];
		state.sex = info[1];
		state.address = info[2];
		state.headImgUrl = info[3];
		state.description = info[4];
		state.phone = info[5];
		state.account = info[6];
		state.token = info[7];
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