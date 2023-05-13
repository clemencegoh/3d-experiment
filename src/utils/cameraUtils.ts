import { Camera, CubicEase, EasingFunction, Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";



/**
 * Zooms camera into target
 * @param cam camera
 * @param tar target plane/object mesh
 */
const zoom = function (cam: Camera, tar: Mesh) {

  const targetEndPos = tar.getAbsolutePosition();
  const camEndPos = tar.getAbsolutePosition();
  const speed = 45;
  const ease = new CubicEase();

  tar.computeWorldMatrix();
  const matrix = tar.getWorldMatrix();
  const local_position = new Vector3(0,0,0);
  local_position.addInPlace(new Vector3(0, 0, -5));
  const global_position = Vector3.TransformCoordinates(local_position, matrix);
  console.log(global_position);
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  // BABYLON.Animation.CreateAndStartAnimation('at4', cam, 'position', speed, 120, cam.position, global_position, 0, ease);
  // BABYLON.Animation.CreateAndStartAnimation('at5', cam, 'target', speed, 120, cam.target, targetEndPos, 0, ease);

};