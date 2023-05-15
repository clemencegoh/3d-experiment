import React, { useRef, useState } from "react";
import { Vector3, Color3, Mesh } from "@babylonjs/core";
import { useClick, useHover } from "react-babylonjs";
import HUDModal from "../gui/HUDModal";
import InfoLabel from "./InfoLabel";
import { useCategoryMap } from "src/hooks/dataHooks";
import _ from "lodash";

type TConnectedNode = {
  position: Vector3;
};

export class CInfoNode {
  title: string;
  content: string;
  position: Vector3;
  tags?: string[];
  connectedNodes: Map<string, TConnectedNode>;

  constructor({
    title,
    content,
    position,
    tags,
    connectedNodes = new Map(),
  }: {
    title: string;
    content: string;
    position: Vector3;
    tags?: string[];
    connectedNodes?: Map<string, TConnectedNode>;
  }) {
    this.title = title;
    this.content = content;
    this.position = position;
    this.tags = tags;
    this.connectedNodes = connectedNodes;
  }
}

export type TInfoNodeProps = {
  info: CInfoNode;
  color: Color3;
  hoverColor: Color3;

  setPlane?: (plane: Mesh) => void;
  setLabelsMap?: (key: string, value: Mesh) => void;
  zoomToNode?: (node: Mesh) => void;
};

export default function InfoNode({
  info,

  color,
  hoverColor,

  setPlane,
  setLabelsMap,
  zoomToNode,
}: TInfoNodeProps) {
  const containerRef = useRef<Mesh | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { title, position, content } = info;

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
      {Array.from(info.connectedNodes.values()).map((node) => {
        const connectedPoint = node.position;
        const path = [connectedPoint, info.position];
        return <lines name={`${title}-connection`} points={path} />;
      })}
      {showModal && (
        <HUDModal
          title={title}
          body={content}
          onClose={() => setShowModal(false)}
          show={showModal}
          setPlane={setPlane}
        />
      )}
    </>
  );
}
