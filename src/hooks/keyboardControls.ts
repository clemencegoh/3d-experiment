export function useKeyboardMovementControls(){
  return {
    keysUp: [87, 38], // W, Arrow up
    keysLeft: [65, 37], // A
    keysDown: [83, 40], // S
    keysRight: [68, 39], // D
    keysUpward: [32], // spacebar
    keysDownward: [17, 16], // ctrl, shift
  }
}