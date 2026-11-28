/**
 * Tabler Icons used by the interface (not tech logos).
 *
 * Raw SVGs are imported at build time so every UI icon shares the same
 * stroke-based visual language as the tech icons and no extra icon package
 * is needed.
 */

import activity from "../../node_modules/@tabler/icons/icons/outline/activity.svg?raw";
import arrowRight from "../../node_modules/@tabler/icons/icons/outline/arrow-right.svg?raw";
import arrowUpRight from "../../node_modules/@tabler/icons/icons/outline/arrow-up-right.svg?raw";
import bolt from "../../node_modules/@tabler/icons/icons/outline/bolt.svg?raw";
import building from "../../node_modules/@tabler/icons/icons/outline/building.svg?raw";
import check from "../../node_modules/@tabler/icons/icons/outline/check.svg?raw";
import chevronDown from "../../node_modules/@tabler/icons/icons/outline/chevron-down.svg?raw";
import cloud from "../../node_modules/@tabler/icons/icons/outline/cloud.svg?raw";
import code from "../../node_modules/@tabler/icons/icons/outline/code.svg?raw";
import container from "../../node_modules/@tabler/icons/icons/outline/container.svg?raw";
import copy from "../../node_modules/@tabler/icons/icons/outline/copy.svg?raw";
import download from "../../node_modules/@tabler/icons/icons/outline/download.svg?raw";
import externalLink from "../../node_modules/@tabler/icons/icons/outline/external-link.svg?raw";
import fileDownload from "../../node_modules/@tabler/icons/icons/outline/file-download.svg?raw";
import folder from "../../node_modules/@tabler/icons/icons/outline/folder.svg?raw";
import gitBranch from "../../node_modules/@tabler/icons/icons/outline/git-branch.svg?raw";
import globe from "../../node_modules/@tabler/icons/icons/outline/globe.svg?raw";
import mail from "../../node_modules/@tabler/icons/icons/outline/mail.svg?raw";
import mapPin from "../../node_modules/@tabler/icons/icons/outline/map-pin.svg?raw";
import menu2 from "../../node_modules/@tabler/icons/icons/outline/menu-2.svg?raw";
import search from "../../node_modules/@tabler/icons/icons/outline/search.svg?raw";
import server from "../../node_modules/@tabler/icons/icons/outline/server.svg?raw";
import sparkles from "../../node_modules/@tabler/icons/icons/outline/sparkles.svg?raw";
import star from "../../node_modules/@tabler/icons/icons/outline/star.svg?raw";
import terminal from "../../node_modules/@tabler/icons/icons/outline/terminal.svg?raw";
import x from "../../node_modules/@tabler/icons/icons/outline/x.svg?raw";

export const tablerUiSvg = {
  activity,
  "arrow-right": arrowRight,
  "arrow-up-right": arrowUpRight,
  bolt,
  building,
  check,
  "chevron-down": chevronDown,
  cloud,
  code,
  container,
  copy,
  download,
  "external-link": externalLink,
  "file-download": fileDownload,
  folder,
  "git-branch": gitBranch,
  globe,
  mail,
  "map-pin": mapPin,
  "menu-2": menu2,
  search,
  server,
  sparkles,
  star,
  terminal,
  x,
} as const;

export type TablerUiIcon = keyof typeof tablerUiSvg;
