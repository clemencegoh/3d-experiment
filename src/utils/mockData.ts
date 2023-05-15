import { Vector3 } from "@babylonjs/core";
import { TCategoryNode } from "src/hooks/dataHooks";

export const mockCategories: TCategoryNode[] = [
  {name: 'JS', position: new Vector3(10, 0, 1)},
  {name: 'Notion', position: new Vector3(18, 1, -5)},
  {name: 'Firebase', position: new Vector3(5, 12, 1)},
  {name: 'Typescript', position: new Vector3(18, 10, -1)},
  {name: 'Performance', position: new Vector3(21, 12, 1)},
  {name: 'pipelines', position: new Vector3(1, -10, -1)},
  {name: 'jenkins', position: new Vector3(10, 0, -12)},
  {name: 'Github', position: new Vector3(8, -8, -8)},
];