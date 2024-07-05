import { config } from "@tamagui/config/v3";

import { createFont, createTamagui } from "tamagui";
import { theme } from "./theme";

const axiformaFont = createFont({
  family: "Axiforma",
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
  },
  lineHeight: {
    // 1 will be 22
    2: 22,
  },
  weight: {
    1: "300",
    // 2 will be 300
    3: "600",
  },
  letterSpacing: {
    1: 0,
    2: -1,
    // 3 will be -1
  },
});
export const tamaguiConfig = createTamagui({
  ...config,
  fonts: {
    // for tamagui, heading and body are assumed
    heading: axiformaFont,
    body: axiformaFont,
  },
});
export default tamaguiConfig;
export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
