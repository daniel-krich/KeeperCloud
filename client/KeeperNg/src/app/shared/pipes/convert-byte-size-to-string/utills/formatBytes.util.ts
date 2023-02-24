export default function formatBytes(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (!+bytes) return `0 ${sizes[0]}`;
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const sizeInUnits = (bytes / Math.pow(k, i)).toFixed(2);
    const formattedSize = sizeInUnits.endsWith('.00') ? sizeInUnits.slice(0, -3) : sizeInUnits;
    return `${formattedSize} ${sizes[i]}`;
}