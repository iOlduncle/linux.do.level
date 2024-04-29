export function getLoadingSvg(size: number = 60): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${ size }px" height="${ size }px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ring">
              <circle cx="50" cy="50" r="30" stroke="#B3B5B411" stroke-width="10" fill="none"/>
              <circle cx="50" cy="50" r="30" stroke="#808281" stroke-width="10" fill="none" transform="rotate(144 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
                <animate attributeName="stroke-dasharray" calcMode="linear" values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"/>
              </circle> 
            </svg>`;
}