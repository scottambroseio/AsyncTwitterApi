"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Purest = _interopRequire(require("Purest"));

var APP_KEY = Symbol();
var APP_SECRET = Symbol();
var INTERNAL_API = Symbol();

var TwitterApi = (function () {
	function TwitterApi(app_key, app_secret) {
		_classCallCheck(this, TwitterApi);

		if (app_key === undefined) throw "Error: TwitterApi - Twitter app key must be provided";
		if (app_secret === undefined) throw "Error: TwitterApi - Twitter app secret must be provided";
		if (typeof app_key != "string" || !app_key) throw "Error: TwitterApi - Twitter app key must be a valid string";
		if (typeof app_secret != "string" || !app_secret) throw "Error: TwitterApi - Twitter app secret must be a valid string";

		this[APP_KEY] = app_key;
		this[APP_SECRET] = app_secret;
		this[INTERNAL_API] = new Purest({
			provider: "twitter",
			consumerKey: app_key,
			consumerSecret: app_secret
		});
	}

	_prototypeProperties(TwitterApi, null, {
		PostTweet: {
			value: function PostTweet(data) {
				var _this = this;
				return new Promise(function (res, rej) {
					return _this[INTERNAL_API].post("statuses/update", data, function (error, result) {
						return error ? rej(error) : res(result);
					});
				});
			},
			writable: true,
			configurable: true
		},
		SearchUsers: {
			value: function SearchUsers(data) {
				var _this = this;
				return new Promise(function (res, rej) {
					return _this[INTERNAL_API].get("users/search", data, function (error, result) {
						return error ? rej(error) : res(result);
					});
				});
			},
			writable: true,
			configurable: true
		},
		GetFollowers: {
			value: function GetFollowers(data) {
				var _this = this;
				return new Promise(function (res, rej) {
					return _this[INTERNAL_API].get("followers/ids", data, function (error, result) {
						return error ? rej(error) : res(result);
					});
				});
			},
			writable: true,
			configurable: true
		}
	});

	return TwitterApi;
})();

module.exports = TwitterApi;


// friendships/destroy
// friendships/create
// followers/ids

//todo: urls into seperate json