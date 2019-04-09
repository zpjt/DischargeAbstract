const REQUEST_POSTS = "REQUEST_POSTS";
const RECEIVE_POSTS = "RECEIVE_POSTS";

const requestPosts = function(){
	return {
			 type:REQUEST_POSTS,
	}
};

const receivePosts = function(json:{[key:string]:any}){
		return {
			 type:RECEIVE_POSTS,
			 json,
		}
};

// 异步的action
const fetchPosts = function(url:string){

			return  function(dispatch:Function){

					dispatch(requestPosts());
				 	fetch(url)
				 	.then(res=>{
								return res.json()
				 	})
				 	.then(json=>{
				 			dispatch(receivePosts(json))
				 	})
			}
};


export {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	fetchPosts,
}