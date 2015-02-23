"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Purest = _interopRequire(require("Purest"));

var APP_KEY = Symbol();
var APP_SECRET = Symbol();
var INTERNAL_API = Symbol();

//todo: urls into seperate json so easier to change if urls change
//todo: data validation

var TwitterApi = (function () {
	function TwitterApi() {
		_classCallCheck(this, TwitterApi);

		var _process$env = process.env;
		var TWITTER_KEY = _process$env.TWITTER_KEY;
		var TWITTER_SECRET = _process$env.TWITTER_SECRET;


		if (typeof TWITTER_KEY != "string" || !TWITTER_KEY) throw "Error: TwitterApi - Invalid enviroment variable - TWITTER_KEY";
		if (typeof TWITTER_SECRET != "string" || !TWITTER_SECRET) throw "Error: TwitterApi - Invalid enviroment variable - TWITTER_SECRET";


		this[APP_KEY] = TWITTER_KEY;
		this[APP_SECRET] = TWITTER_SECRET;
		this[INTERNAL_API] = new Purest({
			provider: "twitter",
			consumerKey: TWITTER_KEY,
			consumerSecret: TWITTER_SECRET
		});
	}

	_prototypeProperties(TwitterApi, null, {
		PostTweet: {
			value: function PostTweet(data) {
				return POST.call(this, "statuses/update", data);
			},
			writable: true,
			configurable: true
		},
		SearchUsers: {
			value: function SearchUsers(data) {
				return GET.call(this, "users/search", data);
			},
			writable: true,
			configurable: true
		},
		GetFollowers: {
			value: function GetFollowers(data) {
				return GET.call(this, "followers/list", data);
			},
			writable: true,
			configurable: true
		},
		FollowUser: {
			value: function FollowUser(data) {
				return POST.call(this, "friendships/create", data);
			},
			writable: true,
			configurable: true
		},
		UnfollowUser: {
			value: function UnfollowUser(data) {
				return POST.call(this, "friendships/destroy", data);
			},
			writable: true,
			configurable: true
		}
	});

	return TwitterApi;
})();

module.exports = TwitterApi;


function GET(url, data) {
	var _this = this;
	return new Promise(function (res, rej) {
		return _this[INTERNAL_API].get(url, data, function (error, result) {
			return error ? rej(error) : res(result);
		});
	});
}

function POST(url, data) {
	var _this = this;
	return new Promise(function (res, rej) {
		return _this[INTERNAL_API].post(url, data, function (error, result) {
			return error ? rej(error) : res(result);
		});
	});
}