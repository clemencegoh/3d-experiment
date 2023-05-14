import { Camera, Mesh } from '@babylonjs/core';
import { useRef } from 'react';

/**
 * WARNING: This is to be used at the top level since it's an
 * independent hook instead of a context.
 * TODO: Consider making this a context instead or put GUIPlane into 
 * some global state (redux/jotai)
 */
export function use2DGUI() {
    // we require this ref so that we can update this GUI plane on camera move
    const GUIPlane = useRef<Mesh | null>(null);

    const faceCamera = (camera: Camera, plane: Mesh) => {
      const forwardRayDirection = camera.getForwardRay().direction;
      plane.position = camera.position.add(
        /**
         * forwardRay.length determines how far away the modal is from the camera
         * */
        forwardRayDirection.scale(1.5 / camera.fov)
      );
      plane.lookAt(camera.position, 0, Math.PI, Math.PI);
    };
  
    const updateGUIPlanePosition = (camera: Camera) => {
      if (GUIPlane.current) {
        faceCamera(camera, GUIPlane.current);
      }
    };
    const setGUIPlane = (newPlane: Mesh) => {
      GUIPlane.current = newPlane;
      if (newPlane._scene && newPlane._scene.activeCamera) {
        const { activeCamera } = newPlane._scene;
        window.setTimeout(() => {
          faceCamera(activeCamera, newPlane);
        }, 10);
      }
    };

    return {
      GUIPlane,
      updateGUIPlanePosition,
      setGUIPlane
    } as const;
}