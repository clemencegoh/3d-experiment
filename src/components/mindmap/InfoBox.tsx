import React, { useRef, useState, useEffect } from "react";
import { Vector3, Color3, Mesh } from "@babylonjs/core";
import { useBeforeRender, useClick, useHover } from "react-babylonjs";
import HUDModal from "./HUDModal";

export type TInfoBoxProps = {
  title: string;
  position: Vector3;
  color: Color3;
  hoverColor: Color3;
  body: string;

  setPlane?: (plane: Mesh) => void;
};

export default function InfoBox({
  title,
  body,

  position,
  color,
  hoverColor,
  setPlane,
}: TInfoBoxProps) {
  const boxRef = useRef<Mesh | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useClick(() => {
    setShowModal(true);
  }, boxRef);

  const [hovered, setHovered] = useState(false);
  useHover(
    () => setHovered(true),
    () => setHovered(false),
    boxRef
  );

  // This will rotate the box on every Babylon frame.
  const rpm = 5;
  useBeforeRender((scene) => {
    if (boxRef.current) {
      // Delta time smoothes the animation.
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  });

  return (
    <>
      <box size={2} name={title} ref={boxRef} position={position}>
        <standardMaterial
          name={`${name}-mat`}
          diffuseColor={hovered ? hoverColor : color}
          specularColor={Color3.Black()}
        />
      </box>
      {showModal && (
        <HUDModal
          title={title}
          body={body}
          onClose={() => setShowModal(false)}
          show={showModal}
          setPlane={setPlane}
        />
      )}
    </>
  );
}
