import { useWindowSize } from "src/hooks/eventListeners";
import React, { useEffect, useRef, useState } from "react";
import { Engine, Scene } from "react-babylonjs";
import {
  Vector3,
  Color3,
  Camera,
  Mesh,
  UniversalCamera,
} from "@babylonjs/core";
import { use2DGUI } from "src/hooks/GuiPlane";
import { useKeyboardMovementControls } from "src/hooks/keyboardControls";
import { useMap } from "usehooks-ts";
import InfoNode, {
  CInfoNode,
  TInfoNodeProps,
} from "src/components/mindmap/InfoNode";
import { zoom } from "src/utils/cameraUtils";
import { useCategoryMap } from "src/hooks/dataHooks";
import CategoryNode from "src/components/mindmap/CategoryNode";
import _ from "lodash";

const node1 = new CInfoNode({
  title: "Box 1",
  content: "Hello I am box 1",
  position: new Vector3(-2, 0, 0),
  tags: ["JS", "firebase", "notion"],
});
const node2 = new CInfoNode({
  title: "Box 2",
  content: "Hello I am box 2",
  position: new Vector3(2, 0, 0),
  tags: ["pipelines", "notion"],
});
const node3 = new CInfoNode({
  title: "Box 3",
  content: "Hello I am box 3",
  position: new Vector3(6, 0, 0),
  tags: ["JS", "firebase", "github"],
});
const node4 = new CInfoNode({
  title: "Box 4",
  content: "Hello I am box 4",
  position: new Vector3(2, 0, -4),
  tags: ["notion"],
});

const knowledgeBase: TInfoNodeProps[] = [
  {
    info: node1,
    color: Color3.FromHexString("#EEB5EB"),
    hoverColor: Color3.FromHexString("#C26DBC"),
  },
  {
    info: node2,
    color: Color3.FromHexString("#C8F4F9"),
    hoverColor: Color3.FromHexString("#3CACAE"),
  },
  {
    info: node3,
    color: Color3.FromHexString("#a1ca9c"),
    hoverColor: Color3.FromHexString("#55944e"),
  },
  {
    info: node4,
    color: Color3.FromHexString("#c2ca52"),
    hoverColor: Color3.FromHexString("#93944e"),
  },
];

export default function HomePage() {
  const [canvasWidth, canvasHeight] = useWindowSize();
  const { updateGUIPlanePosition, setGUIPlane } = use2DGUI();
  const [labelsMap, { set: setLabelsMap }] = useMap<string, Mesh>(new Map());
  const movementControls = useKeyboardMovementControls();
  const cameraRef = useRef<UniversalCamera | null>(null);

  const [data, setData] = useState(knowledgeBase);
  const categoryMap = useCategoryMap();

  useEffect(() => {
    const newData = knowledgeBase.map((props) => {
      props.info.tags?.forEach((tagName) => {
        const categoryProps = categoryMap.get(tagName);
        if (categoryProps) {
          props.info.connectedNodes.set(_.toLower(tagName), categoryProps);
        }
      });
      return props;
    });
    setData(newData);
  }, [categoryMap]);

  const faceAllLabelsToCamera = (camera: Camera) => {
    Array.from(labelsMap.values()).forEach((plane) => {
      plane.lookAt(camera.position, 0, Math.PI, Math.PI);
    });
  };

  const zoomToNode = (node: Mesh) => {
    if (cameraRef.current) {
      zoom(cameraRef.current, node);
      console.log(cameraRef.current.position);
    }
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
            ref={cameraRef}
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
          {data.map((props) => (
            <InfoNode
              key={props.info.title}
              {...props}
              setPlane={setGUIPlane}
              setLabelsMap={setLabelsMap}
              zoomToNode={zoomToNode}
            />
          ))}
          {Array.from(categoryMap.values()).map((category) => (
            <CategoryNode
              key={category.name}
              title={category.name}
              position={category.position}
              color={Color3.FromHexString("#f03636")}
              zoomToNode={zoomToNode}
            />
          ))}
        </Scene>
      </Engine>
    </div>
  );
}
