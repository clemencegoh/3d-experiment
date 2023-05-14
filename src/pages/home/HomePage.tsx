import { useWindowSize } from "src/hooks/eventListeners";
import React, { useRef } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3, Color3, Camera, Mesh } from "@babylonjs/core";
import InfoBox, { TInfoBoxProps } from "src/components/mindmap/InfoBox";
import { use2DGUI } from "src/hooks/GuiPlane";
import { useKeyboardMovementControls } from "src/hooks/keyboardControls";
import { useMap } from "usehooks-ts";
import InfoNode from "src/components/mindmap/InfoNode";

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

export default function HomePage() {
  const [canvasWidth, canvasHeight] = useWindowSize();
  const { updateGUIPlanePosition, setGUIPlane } = use2DGUI();
  const [labelsMap, { set: setLabelsMap }] = useMap<string, Mesh>(new Map());
  const movementControls = useKeyboardMovementControls();

  const faceAllLabelsToCamera = (camera: Camera) => {
    Array.from(labelsMap.values()).forEach((plane) => {
      plane.lookAt(camera.position, 0, Math.PI, Math.PI);
    });
  };

  return (
    <div>
      <Engine
        antialias
        adaptToDeviceRatio
        width={canvasWidth}
        height={canvasHeight - 10}
        canvasId="babylonJS"
      >
        <Scene>
          <universalCamera
            name={"camera1"}
            // Arbitrary position so we can see all our boxes
            position={new Vector3(-2, 20, 20)}
            target={Vector3.Zero()}
            {...movementControls}
            onViewMatrixChangedObservable={(camera: Camera) => {
              updateGUIPlanePosition(camera);
              faceAllLabelsToCamera(camera);
            }}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0.5, 1.0, 0)}
          />
          {knowledgeBase.map((props) => (
            <InfoNode
              key={props.title}
              {...props}
              setPlane={setGUIPlane}
              setLabelsMap={setLabelsMap}
            />
          ))}
        </Scene>
      </Engine>
    </div>
  );
}
