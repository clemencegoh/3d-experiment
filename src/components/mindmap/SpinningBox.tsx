"use client";

import React, { useRef, useState } from "react";
import {
  Engine,
  Scene,
  useBeforeRender,
  useClick,
  useHover,
} from "react-babylonjs";
import { Vector3, Color3, Mesh } from "@babylonjs/core";

const DefaultScale = new Vector3(1, 1, 1);
const BiggerScale = new Vector3(1.25, 1.25, 1.25);

export type TSpinningBoxProps = {
  name: string;
  position: Vector3;
  color: Color3;
  hoveredColor: Color3;
};

export function SpinningBox({
  name,
  position,
  color,
  hoveredColor,
}: TSpinningBoxProps) {
  // access Babylon scene objects with same React hook as regular DOM elements
  const boxRef = useRef<Mesh | null>(null);

  const [clicked, setClicked] = useState(false);
  useClick(() => setClicked((clicked) => !clicked), boxRef);

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
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  });

  return (
    <box
      name={name}
      ref={boxRef}
      size={2}
      position={position}
      scaling={clicked ? BiggerScale : DefaultScale}
    >
      <standardMaterial
        name={`${name}-mat`}
        diffuseColor={hovered ? hoveredColor : color}
        specularColor={Color3.Black()}
      />
    </box>
  );
}
