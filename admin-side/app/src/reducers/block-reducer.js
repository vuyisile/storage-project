const blocks = (state = {
  locations: [],
  blockName: '',
  location: '',
  blocks: []
}, action) => {
  var newState = { ...state };
  switch (action.type) {
    case 'ADD_BLOCK':
      newState = { ...state, blockName: action.payload }
    case 'ADD_BLOCK':
      newState = { ...state, blocks: [...state.blocks, action.payload] }
    default:
      newState = newState;
  }
  return newState
}

export default blocks;
