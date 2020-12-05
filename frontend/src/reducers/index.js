const initialState = {
    goalFlag: false,
    isBallMoved: false,
    isGameOver : false
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GOAL_FLAG':
              return { ...state, goalFlag: true }
        case 'SET_IS_BALL_MOVED':
            return { ...state, isBallMoved: true }  
        case 'SET_IS_GAME_OVER':
            return { ...state, isGameOver: true }          
    }
    return state;
  };
  
  export default rootReducer;