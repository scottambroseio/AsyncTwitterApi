import Purest from "Purest";

var APP_KEY = Symbol();
var APP_SECRET = Symbol();
var INTERNAL_API = Symbol();

//todo: urls into seperate json

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
		return POST('statuses/update', data);
	}

	SearchUsers(data) {
		return GET('users/search', data);
	}

	GetFollowers(data) {
		return GET('followers/ids', data);
	}

	FollowUser(data) {
		return POST('friendships/create', data);
	}

	UnfollowUser(data) {
		return POST('friendships/destroy', data);
	}
}

function GET(url, data) {
	return new Promise((res, rej) => {
		return this[INTERNAL_API].get(
			url,
			data,
			(error, result) => error ? rej(error) : res(result)
		);
	});
}

function POST(url, data) {
	return new Promise((res, rej) => {
		return this[INTERNAL_API].post(
			url,
			data,
			(error, result) => error ? rej(error) : res(result)
		);
	});
}