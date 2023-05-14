import { useWindowSize } from "src/hooks/eventListeners";
import React from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3, Color3 } from "@babylonjs/core";
import InfoBox, { TInfoBoxProps } from "src/components/mindmap/InfoBox";
import { use2DGUI } from "src/hooks/GuiPlane";
import { useKeyboardMovementControls } from "src/hooks/keyboardControls";

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
  const movementControls = useKeyboardMovementControls();

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
          {/* <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={8}
            onViewMatrixChangedObservable={updateGUIPlanePosition}
          /> */}
          <universalCamera
            name={"camera1"}
            // Arbitrary position so we can see all our boxes
            position={new Vector3(2, 10, 30)}
            {...movementControls}
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
