// Type used for defining the API response object from Open Weather API,
// for use in the NavBar
interface Weather {
    // Denotes the different applicable weather descriptors based on 
    // the Open Weather API, only really used for the icon for our 
    // purposes
    weather: {
        description: string,
        icon: string,
        id: number,
        main: string
    }[],
    // Object denoting the different number variables for the temperature
    main: {
        feels_like: number,
        humidity: number,
        temp: number,
        temp_max: number,
        temp_min: number
    },
    // Denotes the region for which the temperature was polled from
    name: string
}

export type { Weather }