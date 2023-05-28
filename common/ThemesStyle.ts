export type ThemeClasses = {
    background: any,
    buttonBlock: any,
    buttonText: any,
    text: any,
    settingsBlock: any,
    cardBackground: any,
    input: any,
    inputTextColor: any,
    imgGradient: any
}



export type ThemeVariants = {
    light: ThemeClasses,
    dark: ThemeClasses
}

export const themes : ThemeVariants =  {
    light: {
        background: {
            backgroundColor: "white"
        },
        buttonBlock: {
            backgroundColor: "#777777"
        },
        buttonText: {
            color: "white"
        },
        text: {
            color: "black"
        },
        settingsBlock: {
            backgroundColor: "#E9E7E7"
        },
        cardBackground: {
            backgroundColor: "#F2F2F2"
        },
        input: {
            backgroundColor: "#FAFAFA"
        },
        inputTextColor: "#000000",
        imgGradient: ['rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 1)']
    },
    dark: {
        background: {
            backgroundColor: "#313131"
        },
        buttonBlock: {
            backgroundColor: "#575757"
        },
        buttonText: {
            color: "white"
        },
        text: {
            color: "white"
        },
        settingsBlock: {
            backgroundColor: "#3F3F3F"
        },
        cardBackground: {
            backgroundColor: "#1D1C1C"
        },
        input: {
            backgroundColor: "#404040"
        },
        inputTextColor: "#FFFFFF",
        imgGradient: ['rgba(0, 0, 0, 0)', 'rgba(49, 49, 49, 0.4)', 'rgba(49, 49, 49, 1)']
    }
}