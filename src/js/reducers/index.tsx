import { combineReducers } from 'redux';
import * as Immutable from "immutable";
import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  INVALIDATE_SUBREDDIT,
  SELECT_SUBREDDIT,
} from '../actions/index';

type actionType = {
  type:string;
  subreddit:string;
  json?:any[];
  isFectching?:boolean;
  didInvalidate?:boolean;
  lastUpdated?:number;
};

const selectSubreddit = function(state:State["selectSubreddit"]="reactjs",action:actionType){

    if(action.type === SELECT_SUBREDDIT){
      return action.subreddit
    }else{
      return state;
    }
};



const PostBySubredditRecordData = Immutable.Record({
   "reactjs":Immutable.Map({
           isFectching:false,
           didInvalidate:true,
           items:Immutable.List(),
           lastUpdated:0,
    }),
   "fontEnd":Immutable.Map({
           isFectching:false,
           didInvalidate:true,
           items:Immutable.List(),
           lastUpdated:0,
    }),
  }
);



class PostBySubredditRecord extends PostBySubredditRecordData {
    "reactjs":Immutable.Map<string,number | boolean | Immutable.List<string>>;
    "fontEnd":Immutable.Map<string,number | boolean | Immutable.List<string>>;
}

const initialState = new PostBySubredditRecord();

declare global {

   interface SEkin extends PostBySubredditRecord{
   
   }

}

 

// 再拆分state
const posts = function(state:PostBySubredditRecord["reactjs"],action:actionType){


  switch (action.type) {
    case RECEIVE_POSTS:
        return state.merge(state,Immutable.fromJS({
              isFectching:false,
              didInvalidate:false,
              items:action.json,
              lastUpdated:action.lastUpdated,

        }))
      break;
    case REQUEST_POSTS:
    
       return state.merge(state,Immutable.Map({
               isFectching:true,
                didInvalidate:false,

        }))
      break;
    case INVALIDATE_SUBREDDIT:
     return state.set("didInvalidate",true)
      break;
    default:
      return state ;
      break;
  }
}



const postBySubreddit = function(state:PostBySubredditRecord=initialState,action:actionType){

  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case INVALIDATE_SUBREDDIT:


      return state.set(action.subreddit,posts(state.get(action.subreddit),action));
    
   
      break;
    
    default:
      return state ;
      break;
  }

  console.log(state,)


};


const rootReducers = combineReducers({
  selectSubreddit,
  postBySubreddit
})

export default rootReducers


