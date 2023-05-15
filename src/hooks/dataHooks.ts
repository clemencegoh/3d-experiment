import { Vector3 } from "@babylonjs/core";
import { mockCategories } from "src/utils/mockData";
import { useEffectOnce, useMap } from "usehooks-ts";
import _ from 'lodash';

export type TCategoryNode = {
  name: string;
  position: Vector3;
}

export function useCategoryMap(){
  const [map, {set: setCategoryMap}] = useMap<string, TCategoryNode>(new Map());
  useEffectOnce(() => {
    mockCategories.forEach((category) => {
      setCategoryMap(_.lowerCase(category.name), category)
    })
  })

  return map;
}