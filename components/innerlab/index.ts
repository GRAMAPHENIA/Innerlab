// Exportación de compound components para InnerLab
import { InnerLab as InnerLabRoot } from "./innerlab"
import { Selector } from "./selector"
import { Option } from "./option"
import { Controls } from "./controls"
import { Toggle } from "./toggle"
import { Slider } from "./slider"
import { Preview } from "./preview"

// Compound component pattern
export const InnerLab = Object.assign(InnerLabRoot, {
  Selector,
  Option,
  Controls,
  Toggle,
  Slider,
  Preview,
})
