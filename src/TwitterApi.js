import Purest from "Purest";

var APP_KEY = Symbol();
var APP_SECRET = Symbol();
var INTERNAL_API = Symbol();

export default class TwitterApi {
	constructor(app_key, app_secret) {
		this[APP_KEY] = app_key;
		this[APP_SECRET] = app_secret;
		this[INTERNAL_API] = new Purest({
			provider: 'twitter',
			consumerKey: app_key,
			consumerSecret: app_secret
		});
	}

	PostTweet(data) {
		return new Promise((res, rej) => this[INTERNAL_API].post('statuses/update', data, (error, result) => error ? rej(err) : res(result)));
	}
}