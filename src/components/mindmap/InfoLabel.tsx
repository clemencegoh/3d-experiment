import { Mesh, Scene, Texture, Vector3 } from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
import React from "react";

export type TInfoLabelProps = {
  label: string;
  parentPosition: Vector3;
  setLabelsMap?: (key: string, value: Mesh) => void;
};

/**
 * Non-interactable label for nodes that always face camera
 */
export default function InfoLabel({
  label,
  parentPosition,
  setLabelsMap,
}: TInfoLabelProps) {
  return (
    <plane
      name={`${label}-label`}
      position={parentPosition.add(new Vector3(0, 1.5, 0))}
      width={1}
      height={2 * (1 / 3)}
      rotation={new Vector3(0, Math.PI, 0)}
      onCreated={(instance: Mesh) => {
        setLabelsMap?.(`${label}-label`, instance);
      }}
    >
      <advancedDynamicTexture
        name={`${label}-texture`}
        height={100}
        width={300}
        createForParentMesh
        generateMipMaps={true}
        samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
      >
        <rectangle
          name="rect-1"
          background="white"
          color="#666666"
          thickness={2}
          cornerRadius={12}
        >
          <textBlock
            name="modal-title"
            text={label}
            color="black"
            fontSize={28}
            fontStyle="bold"
            paddingLeft="20px"
            textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
            textVerticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
          />
        </rectangle>
      </advancedDynamicTexture>
    </plane>
  );
}
