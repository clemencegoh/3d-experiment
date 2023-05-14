import React, { useRef, useState, useEffect } from "react";
import { Vector3, Color3, Mesh, Texture, Scene } from "@babylonjs/core";
import { useClick, useHover } from "react-babylonjs";
import HUDModal from "../gui/HUDModal";
import { Control } from "@babylonjs/gui";
import InfoLabel from "./InfoLabel";

export type TInfoNodeProps = {
  title: string;
  position: Vector3;
  color: Color3;
  hoverColor: Color3;
  body: string;

  setPlane?: (plane: Mesh) => void;
  setLabelsMap?: (key: string, value: Mesh) => void;
};

export default function InfoNode({
  title,
  body,

  position,
  color,
  hoverColor,

  setPlane,
  setLabelsMap,
}: TInfoNodeProps) {
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

  return (
    <>
      <InfoLabel
        label={title}
        parentPosition={position}
        setLabelsMap={setLabelsMap}
      />
      <sphere diameter={2} name={title} ref={boxRef} position={position}>
        <standardMaterial
          name={`${title}-mat`}
          diffuseColor={hovered ? hoverColor : color}
          specularColor={Color3.Black()}
        />
      </sphere>
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
