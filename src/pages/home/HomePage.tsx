import { useWindowSize } from "src/hooks/eventListeners";
import React, { useRef } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3, Color3, Camera, Mesh } from "@babylonjs/core";
import InfoBox, { TInfoBoxProps } from "src/components/mindmap/InfoBox";

export default function HomePage() {
  const [canvasWidth, canvasHeight] = useWindowSize();

  // we require this ref so that we can update this GUI plane on camera move
  const GUIPlane = useRef<Mesh | null>(null);

  const knowledgeBase: TInfoBoxProps[] = [
    {
      title: "Box 1",
      body: "Hello I am box 1",

      position: new Vector3(-2, 0, 0),
      color: Color3.FromHexString("#EEB5EB"),
      hoverColor: Color3.FromHexString("#C26DBC"),
    },
    {
      title: "Box 2",
      body: "Hello I am box 2",

      position: new Vector3(2, 0, 0),
      color: Color3.FromHexString("#C8F4F9"),
      hoverColor: Color3.FromHexString("#3CACAE"),
    },
    {
      title: "Box 3",
      body: "Hello I am box 3",

      position: new Vector3(6, 0, 0),
      color: Color3.FromHexString("#a1ca9c"),
      hoverColor: Color3.FromHexString("#55944e"),
    },
  ];

  const updateGUIPlanePosition = (camera: Camera) => {
    if (GUIPlane.current) {
      const forwardRay = camera.getForwardRay();
      GUIPlane.current.position = camera.position
        .clone()
        .add(
          forwardRay.direction.scale(1.5 / camera.fov /* * forwardRay.length */)
        );
      GUIPlane.current.lookAt(camera.position, 0, Math.PI, Math.PI);
    }
  };
  const setGUIPlane = (newPlane: Mesh) => {
    GUIPlane.current = newPlane;
    if (newPlane._scene && newPlane._scene.activeCamera) {
      const { activeCamera } = newPlane._scene;

      window.setTimeout(() => {
        // we only need this hack because of storybook?
        const forwardRayDirection = activeCamera.getForwardRay().direction;
        newPlane.position = activeCamera.position.add(
          forwardRayDirection.scale(
            1.5 / activeCamera.fov /* * forwardRay.length */
          )
        );
        newPlane.lookAt(activeCamera.position, 0, Math.PI, Math.PI);
      }, 10);
    }
  };

  return (
    <div>
      {/* <With2DUI /> */}
      <Engine
        antialias
        adaptToDeviceRatio
        width={canvasWidth}
        height={canvasHeight - 10}
        canvasId="babylonJS"
      >
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={8}
            onViewMatrixChangedObservable={updateGUIPlanePosition}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0.5, 1.0, 0)}
          />
          {knowledgeBase.map((props) => (
            <InfoBox key={props.title} {...props} setPlane={setGUIPlane} />
          ))}
        </Scene>
      </Engine>
    </div>
  );
}
