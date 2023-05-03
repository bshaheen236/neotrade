const initialState = 0;

// eslint-disable-next-line default-param-last
const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		default:
			return state;
	}
};

export default counterReducer;
