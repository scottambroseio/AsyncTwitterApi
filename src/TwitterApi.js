import Purest from "Purest";

let APP_KEY = Symbol();
let APP_SECRET = Symbol();
let INTERNAL_API = Symbol();

//todo: urls into seperate json so easier to change if urls change
//todo: data validation

export default class TwitterApi {
	constructor() {
		let { TWITTER_KEY, TWITTER_SECRET } = process.env;

		if (typeof(TWITTER_KEY) != "string" || !TWITTER_KEY) throw "Error: TwitterApi - Invalid enviroment variable - TWITTER_KEY";
		if (typeof(TWITTER_SECRET) != "string" || !TWITTER_SECRET) throw "Error: TwitterApi - Invalid enviroment variable - TWITTER_SECRET";


		this[APP_KEY] = TWITTER_KEY;
		this[APP_SECRET] = TWITTER_SECRET;
		this[INTERNAL_API] = new Purest({
			provider: 'twitter',
			consumerKey: TWITTER_KEY,
			consumerSecret: TWITTER_SECRET
		});
	}

	PostTweet(data) {
		return POST.call(this, 'statuses/update', data);
	}

	SearchUsers(data) {
		return GET.call(this, 'users/search', data);
	}

	GetFollowers(data) {
		return GET.call(this, 'followers/ids', data);
	}

	FollowUser(data) {
		return POST.call(this, 'friendships/create', data);
	}

	UnfollowUser(data) {
		return POST.call(this, 'friendships/destroy', data);
	}
}

function GET(url, data) {
	return new Promise((res, rej) => this[INTERNAL_API].get(url, data, (error, result) => error ? rej(error) : res(result)));
}

function POST(url, data) {
	return new Promise((res, rej) =>  this[INTERNAL_API].post(url, data, (error, result) => error ? rej(error) : res(result)));
}