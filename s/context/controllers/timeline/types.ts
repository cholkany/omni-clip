import {Media} from "../../../components/omni-media/types.js"

export type V2 = [number, number]

export interface Timeline {
	length: number
	clips: XClip[]
	tracks: XTrack[]
	zoom: number
}

export interface Text {
	type: "Text"
	content: string
	size: number
	color: string
}

export interface XClip {
	id: string
	item: Media | Text
	start_at_position: number
	duration: number
	start: number
	end: number
	track: number
}

export interface Timecode {
	timeline_start: number
	timeline_end: number
	track: number
}

export interface At {
	coordinates: V2
	indicator: Indicator
}

export interface XTrack {
	id: string
}

export interface ProposedTimecode {
	proposed_place: {
		start_at_position: number
		track: number
	}
	duration: number | null
	clips_to_push: XClip[] | null
}

export type Indicator = "add-track-indicator"
