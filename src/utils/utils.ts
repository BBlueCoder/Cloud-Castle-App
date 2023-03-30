export class Utils {
    static formatDuration(duration: number) {
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration - (hours * 3600)) / 60);
        let remainingSeconds = Math.floor(duration % 60);

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }
}