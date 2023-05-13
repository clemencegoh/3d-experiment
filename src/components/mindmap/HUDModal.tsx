import { GUID, Mesh, Texture, Vector3 } from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
import React from "react";

export type THUDModalProps = {
  show?: boolean;
  height?: number;
  width?: number;
  onClose?: () => void;
  title: string;
  body: string;
  setPlane?: (newPlane: Mesh) => void;
};

/**
 * Modal that appears when needed.
 * Disposed when closed, out of sight out of mind.
 */
export default function HUDModal({
  show,
  height,
  width,
  onClose,
  setPlane,

  title,
  body,
}: THUDModalProps) {
  const dialogHeight = height ?? 1;
  const dialogWidth = width ?? 3;

  return show ? (
    <plane
      name="dialog"
      width={1}
      height={1 * (dialogHeight / dialogWidth)}
      onCreated={setPlane}
      rotation={new Vector3(0, Math.PI, 0)}
    >
      <advancedDynamicTexture
        name="dialogTexture"
        height={1024}
        width={1024}
        createForParentMesh
        generateMipMaps={true}
        samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
      >
        <rectangle
          name="rect-1"
          background="white"
          color="#666666"
          height={dialogHeight / dialogWidth}
          width={1}
          scaleY={dialogWidth}
          scaleX={1}
          thickness={2}
          cornerRadius={12}
        >
          <stackPanel name="sp-1">
            <rectangle
              name="header-rectangle"
              height="70px"
              verticalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
              horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
            >
              <stackPanel
                name="header-stack-panel"
                isVertical={false}
                width="100%"
              >
                <textBlock
                  name="modal-title"
                  text={title}
                  color="black"
                  fontSize={28}
                  fontStyle="bold"
                  paddingLeft="20px"
                  textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
                  textVerticalAlignment={Control.VERTICAL_ALIGNMENT_CENTER}
                />
              </stackPanel>
            </rectangle>
            <rectangle
              name="body-rectangle"
              height="200px"
              thickness={2}
              color="#EEEEEE"
            >
              <stackPanel name="sp-3">
                <textBlock
                  name="description"
                  key={`body-${title}`}
                  text={body}
                  color="black"
                  fontSize={28}
                  textWrapping
                  height="100px"
                  textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
                  textVerticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                  paddingLeft="10px"
                  paddingTop="10px"
                />
              </stackPanel>
            </rectangle>
            <stackPanel
              name="footer-sp"
              height="80px"
              paddingTop="10px"
              paddingBottom="10px"
              isVertical={false}
              horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_RIGHT}
              verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
            >
              <babylon-button
                name="cancel-button"
                background="#6c757d"
                width="290px"
                height="60px"
                hoverCursor="pointer"
                cornerRadius={10}
                onPointerDownObservable={() => {
                  onClose?.();
                }}
              >
                <textBlock
                  name="close-text"
                  text={"Close"}
                  fontSize={28}
                  fontStyle="bold"
                  color="white"
                />
              </babylon-button>
            </stackPanel>
          </stackPanel>
        </rectangle>
      </advancedDynamicTexture>
    </plane>
  ) : (
    <></>
  );
}
