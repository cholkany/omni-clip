import {html, css} from "@benev/slate"

import {Effect} from "./parts/effect.js"
import {shadow_view} from "../../../../context/context.js"
import {ImageEffect as XImageEffect} from "../../../../context/types.js"

export const ImageEffect = shadow_view(use => (effect: XImageEffect) => {
	return html`${Effect([effect, html``, css``, `background-image: url(${effect.url});background-size: contain;`])}`
})
