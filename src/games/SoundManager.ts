import { Utils } from "../engine/utils/Utils"

const POINT_AUDIO_PATH = 'assets/audios/point.ogg'

export class SoundManager{    
    public static playPointSound(): void {
        const pointAudio = new Audio(POINT_AUDIO_PATH)
        pointAudio.volume = 0.5

        pointAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        pointAudio.play()
    }
}