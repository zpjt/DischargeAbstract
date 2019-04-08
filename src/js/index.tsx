import * as React from "react" ;
import {connect} from "react-redux"
import VisiblityTodoList from "./containers/VisiblityTodoList";
import AddTodo from "./containers/AddTodo";
import {fetchPostsIfNeeded} from "./actions/index";
import ErrorBoundary from "@js/common/ErrorBoundary";


type props = {
	dispatch:Function;
	subreddit:string;
}

class App extends React.Component<props>{

	componentDidMount(){


		this.props.dispatch(fetchPostsIfNeeded(this.props.subreddit))

	}

	render(){

			return (
				<>
					<div>
								<AddTodo/>
								<ErrorBoundary>
									<VisiblityTodoList />
								</ErrorBoundary>
					</div>
				</>
					)


	}
}

const mapStateToProps = function(state:State){
		return {
			subreddit:state.selectSubreddit
		}
}

export	default connect(mapStateToProps)(App);