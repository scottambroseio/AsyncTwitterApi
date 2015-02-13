import Purest from "Purest";

var APP_KEY = Symbol();
var APP_SECRET = Symbol();
var INTERNAL_API = Symbol();

export default class TwitterApi {
	constructor(app_key, app_secret) {
		if (app_key === undefined) throw "Error: TwitterApi - Twitter app key must be provided";
		if (app_secret === undefined) throw "Error: TwitterApi - Twitter app secret must be provided";
		if (typeof(app_key) != "string" || !app_key) throw "Error: TwitterApi - Twitter app key must be a valid string";
		if (typeof(app_secret) != "string" || !app_secret) throw "Error: TwitterApi - Twitter app secret must be a valid string";
	
		this[APP_KEY] = app_key;
		this[APP_SECRET] = app_secret;
		this[INTERNAL_API] = new Purest({
			provider: 'twitter',
			consumerKey: app_key,
			consumerSecret: app_secret
		});
	}

	PostTweet(data) {
		return new Promise((res, rej) => {
			return this[INTERNAL_API].post(
				'statuses/update',
				data,
				(error, result) => error ? rej(error) : res(result)
			);
		});
	}

	SearchUsers(data) {
		return new Promise((res, rej) => {
			return this[INTERNAL_API].get(
				'users/search',
				data,
				(error, result) => error ? rej(error) : res(result)
			);
		});
	}

	GetFollowers(data) {
		return new Promise((res, rej) => {
			return this[INTERNAL_API].get(
				'followers/ids',
				data,
				(error, result) => error ? rej(error) : res(result)
			);
		});
	}
}

 // friendships/destroy
 // friendships/create
 // followers/ids

 //todo: urls into seperate json