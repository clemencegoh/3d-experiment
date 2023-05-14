import React, { useRef, useState, useEffect } from "react";
import { Vector3, Color3, Mesh, Texture, Scene } from "@babylonjs/core";
import { useClick, useHover } from "react-babylonjs";
import HUDModal from "../gui/HUDModal";
import { Control } from "@babylonjs/gui";
import InfoLabel from "./InfoLabel";
import { zoom } from "src/utils/cameraUtils";

export type TInfoNodeProps = {
  title: string;
  position: Vector3;
  color: Color3;
  hoverColor: Color3;
  body: string;

  setPlane?: (plane: Mesh) => void;
  setLabelsMap?: (key: string, value: Mesh) => void;
  zoomToNode?: (node: Mesh) => void;
};

export default function InfoNode({
  title,
  body,

  position,
  color,
  hoverColor,

  setPlane,
  setLabelsMap,
  zoomToNode,
}: TInfoNodeProps) {
  const containerRef = useRef<Mesh | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useClick(() => {
    if (containerRef.current) {
      zoomToNode?.(containerRef.current);
    }
    const showModalTimeout = setTimeout(() => {
      setShowModal(true);
    }, 3000);
    return () => clearTimeout(showModalTimeout);
  }, containerRef);

  const [hovered, setHovered] = useState(false);
  useHover(
    () => setHovered(true),
    () => setHovered(false),
    containerRef
  );

  return (
    <>
      <InfoLabel
        label={title}
        parentPosition={position}
        setLabelsMap={setLabelsMap}
      />
      <sphere diameter={2} name={title} ref={containerRef} position={position}>
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
