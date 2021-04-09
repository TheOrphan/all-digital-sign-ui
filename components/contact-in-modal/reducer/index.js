export default function reducer(state, action) {
  switch (action.type) {
    case "MODAL_VISIBLE":
      return { ...state, visible: action.visible };
    case "SELECTED_ROW":
      return { ...state, rowValue: action.rowValue };
    default:
      throw new Error();
  }
}
