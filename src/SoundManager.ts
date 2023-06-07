export class SoundManager {
    private static instance: SoundManager
    private pointAudio: HTMLAudioElement

    public static Instance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager()
        }

        return SoundManager.instance
    }
}