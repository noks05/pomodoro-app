declare module '*.css' {
    const styles: { [key: string]: string };
    export = styles;
}
declare module '*.mp3' {
    const src: string;
    export default src;
}