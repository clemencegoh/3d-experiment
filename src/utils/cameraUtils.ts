import { Camera, CubicEase, EasingFunction, Mesh, MeshBuilder, Vector3, Animation } from "@babylonjs/core";



/**
 * Zooms camera into target
 * @param cam camera
 * @param tar target plane/object mesh
 */
export const zoom = (cam: Camera, tar: Mesh) => {

  const targetEndPos = tar.getAbsolutePosition();
  const speed = 45;
  const ease = new CubicEase();

  tar.computeWorldMatrix();
  const matrix = tar.getWorldMatrix();
  const local_position = new Vector3(0,0,0);
  local_position.addInPlace(new Vector3(0, 0, -5));
  const global_position = Vector3.TransformCoordinates(local_position, matrix);
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

  Animation.CreateAndStartAnimation('at4', cam, 'position', speed, 120, cam.position, global_position, 0, ease);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - cam.target works
  Animation.CreateAndStartAnimation('at5', cam, 'target', speed, 120, cam.target, targetEndPos, 0, ease);

};