export default function repositoryReducer(state, action) {
  switch (action.type) {
    case "PROGRESS_INIT":
      return {
        key: null,
        statusDone: false,
        msg: null,
        step: 0
      }
    case "PROGRESS_START":
      return { 
        key: action.key,
        statusDone: false,
        step: action.step,
        msg: action.msg
      };
    case "PROGRESS_UP":
      return { 
        ...state,
        step: action.step,
        msg: action.msg
      };
    case "PROGRESS_COMPLETE":
      return {
        ...state,
        key: action.key,
        step: action.step,
        statusDone: true,
        msg: 'Process completed',
      }
    default:
      throw new Error();
  }
}
