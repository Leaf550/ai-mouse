import { TestEnum } from "./TestExport"

interface SharedTypes {
  TestEnum: typeof TestEnum
}

declare global {
  interface Window {
    types: SharedTypes
  }
}
