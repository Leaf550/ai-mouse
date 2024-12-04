import { electronAPI } from "@electron-toolkit/preload";

export const Versions = {
  electronVersion: electronAPI.process.versions.electron,
  chromeVersion: electronAPI.process.versions.chrome,
  nodeVersion: electronAPI.process.versions.node
}
