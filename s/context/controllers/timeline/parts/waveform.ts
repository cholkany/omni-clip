import WaveSurfer from 'wavesurfer.js'
import {fetchFile} from "@ffmpeg/util/dist/esm/index.js"

import {AudioEffect, State} from '../../../types.js'
import {Compositor} from '../../compositor/controller.js'
import {calculate_effect_width} from '../../../../components/omni-timeline/utils/calculate_effect_width.js'

export class Waveform {
	wave = document.createElement("div")
	#wavesurfer: WaveSurfer
	#isReady = false

	constructor(private effect: AudioEffect, private compositor: Compositor, state: State) {
		this.#wavesurfer = this.#create_waveform()
		this.#load_audio_file(state)
		this.#wavesurfer.on("ready", () => {
			this.#isReady = true
		})
	}
	
	#create_waveform() {
		return WaveSurfer.create({
			container: this.wave,
			backend: "MediaElement",
			autoScroll: true,
			hideScrollbar: true,
			interact: false,
			height: 50
		})
	}

	async #load_audio_file(state: State) {
		this.#wavesurfer.setOptions({width: calculate_effect_width(this.effect, state.zoom)})
		const {file} = this.compositor.managers.audioManager.get(this.effect.id)!
		const uint = await fetchFile(file)
		const blob = new Blob([uint])
		const url = URL.createObjectURL(blob)
		await this.#wavesurfer.load(url)
		this.update_waveform(state)
	}

	update_waveform(state: State) {
		if(this.#isReady) {
			const get_effect = state.effects.find(e => e.id === this.effect.id)! as AudioEffect
			const width = get_effect.duration * Math.pow(2, state.zoom)
			if(width < 4000) {
				this.#wavesurfer.setOptions({width})
			} else {
				this.#wavesurfer.setOptions({width: 4000})
			}
			this.#wavesurfer.zoom(width / this.#wavesurfer.getDuration())
		}
	}

	dispose() {
		this.#wavesurfer.destroy()
	}
}
