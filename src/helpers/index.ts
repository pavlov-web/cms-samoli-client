import { uniqueId } from "lodash";

export const getUniqueId = (prefix: string): string =>
  `${prefix}_${uniqueId()}`;
