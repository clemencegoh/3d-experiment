import { useEffect } from 'react';

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

/**
 * Will clean itself up on dismount
 * @param callback function to be handled on esc key press
 */
export function useEscapeEventListener(callback?: () => void){
  useEffect(() => {
    const executeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback?.();
      }
    };
    document.addEventListener("keyup", executeOnEsc, false);
    return () => {
      document.removeEventListener("keyup", executeOnEsc, false);
    };
  }, [callback]);
}