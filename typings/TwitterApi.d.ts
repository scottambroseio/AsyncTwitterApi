interface TwitterApi_Instance {
	PostTweet(data: Object): Promise
	SearchUsers(data: Object): Promise
	GetFollowers(data: Object): Promise
	FollowUser(data: Object): Promise
	UnfollowUser(data: Object): Promise
}

interface TwitterApi_Static {
	new(): TwitterApi_Instance;
}

declare var TwitterApi: TwitterApi_Static;