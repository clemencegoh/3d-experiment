import { Color3, Mesh, Vector3 } from "@babylonjs/core";
import React, { useRef } from "react";
import { useClick } from "react-babylonjs";

export type TCategoryNodeProps = {
  title: string;
  position: Vector3;
  color: Color3;

  zoomToNode?: (node: Mesh) => void;
};

export default function CategoryNode({
  title,
  position,
  color,
  zoomToNode,
}: TCategoryNodeProps) {
  const containerRef = useRef<Mesh | null>(null);

  useClick(() => {
    if (containerRef.current) {
      zoomToNode?.(containerRef.current);
    }
  }, containerRef);

  return (
    <sphere diameter={2} name={title} ref={containerRef} position={position}>
      <standardMaterial
        name={`${title}-mat`}
        diffuseColor={color}
        specularColor={Color3.Black()}
      />
    </sphere>
  );
}
