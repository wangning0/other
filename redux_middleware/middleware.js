function compose(...funs) {
	return (...args) => {
		if (args.length == 0) {
			return args[0];
		}

		const last = funs[funs.length - 1];
		const rest = funs.slice(0, -1);

		return rest.reduceRight((composed, f) => f(composed), last(...args));
	}
}

//compose(f,g,h)(...args);

//f(g(h(...args)));


function applyMiddleware(...middlewares) {
	/*
		返回值是一个函数，因此在使用的时候是如下形式
		var store = applyMiddleware(...middlewares)(createStore)(reducer);
	*/
	return (createStore) => (reducer, initialState, enhancer) => {
		var store = createStore(reducer, initialState, enhancer);
		var dispath = store.dispath;
		var chain = [];
		/*
			将store中的一部分借口暴露给中间件
			在编写中间件的时候，通常形式为：
			function middleware(store){
				return next=>action=>{...}
			}
			参数的store其实就是middlewareAPI
		*/
		var middlewareAPI = {
			getState: store.getState,
			dispath: (action) => dispath(action)
		}

		/*
			chain是一个数组，数组中的每一项都是一个具有如下形式的函数
			function(next){
				return function(action){...}
			}
		*/
		chain = middlewares.map(middleware => middleware(middlewareAPI));
		/*
			假设chain为[mw1,mw2,mw3]
			那么此时dispatch为mw1(mw2(mw3(store.dispatch)))
			即store.dispatch为mw3的next参数
			mw3(store.dispatch)作为mw2的next参数，以此类推
			最终的返回值是一个函数，其形式为：
			function (action) {...}
			该函数作为新的dispatch(或者说，包装后的dispatch)
		*/
		dispatch = compose(...chain)(store.dispatch);
		retrun {
			...store,
			dispatch
		}
	}
}

function logger(store) {
	return function(next) {
		return function(action) {
			console.log('logger:dispatching:', action);
			var result = next(actsion);
			console.log('logger:get state:', store.getState());
			return result;
		}
	}
}

function greeting(store) {
	return function(next) {
		return function(action) {
			console.log('greeting hi');
			var result = next(action);
			console.log('greeting bye');
			return result;
		}
	}
}

function dispatch(action) {
	console.log('logger:dispatching:', action);

	var result = (function(action) {
		console.log('greeting:hi');
		var result = store.dispatch(action);
		console.log('greeting bye');
		return result;
	})(action)
	console.log('logger:get state:', store.getState());
	return result;
}

/*
	通过前面的源码分析，我们可以知道，每个中间件所接收到的store参数，其实是真正store的一个子集，只有
	dispatch和getState方法，那么如果在某个中间件中调用了dispatch(action)，就会陷入无限循环了
	事实上，中间件拿到dispatch，主要是用于异步操作
*/

function increaseCounterAsync() {
	return function(dispatch, getState) {
		setTimeout(() => dispatch({
			type: 'INCREASE'
		}), 3000);
	}
}
//middleware thunk

function thunk(store) {
	return function(next) {
		return function(action) {
			return tyeof action === 'function' ?
				action(store.dispatch, store.getState) :
				next(action);
		}
	}
}

var store = applyMiddleware(thunk, logger)(createStore)(reducer);
store.dispatch(increaseCounterAsync());


/*
	thunk中间件会对action进行拦截，如果action是一个函数，则将dispatch和getState
	座位参数执行该函数，否则按照普通流程来处理。thunk中间件捕获到了异步action后，进行一些处理
	然后dispath真正的action
*/

function dispatch(action) {
	if (typeof action === 'function') {
		//dispatch ,getState 都是middlewareAPI
		return action(dispatch, getState);
	}
	var result = (function(action) {
		console.log('logger: dispatching:', action)
			// 这里的store指的是applyMiddleware的内部变量store
		var result = store.dispatch(action)
		console.log('logger: get state:', store.getState())
		return result
	})(action)

	return result;
}