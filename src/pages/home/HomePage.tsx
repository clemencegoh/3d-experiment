"use client";

import { useWindowSize } from "src/hooks/eventListeners";
import React from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3, Color3 } from "@babylonjs/core";
import { SpinningBox } from "src/components/mindmap/SpinningBox";

export default function HomePage() {
  const [canvasWidth, canvasHeight] = useWindowSize();

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
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={8}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0.5, 1.0, 0)}
          />
          <SpinningBox
            name="left"
            position={new Vector3(-2, 0, 0)}
            color={Color3.FromHexString("#EEB5EB")}
            hoveredColor={Color3.FromHexString("#C26DBC")}
          />
          <SpinningBox
            name="right"
            position={new Vector3(2, 0, 0)}
            color={Color3.FromHexString("#C8F4F9")}
            hoveredColor={Color3.FromHexString("#3CACAE")}
          />
        </Scene>
      </Engine>
    </div>
  );
}
