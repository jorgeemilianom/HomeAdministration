import { StyleSheet } from 'react-native';


export const Css = StyleSheet.create({
    // Helpers
    b: {
        borderWidth: 1,
        borderColor: "red",
    },

    // Display
    d_flex: {
        display: "flex",
        col: {
            flexDirection: "column",
        },
        row: {
            flexDirection: "row",
        },
        ai: {
            center:{
                alignItems: "center"
            }
        },
        gap: {
            _1: {
                gap: 5,
            },
            _2: {
                gap: 10,
            },
            _3: {
                gap: 15,
            },
            _4: {
                gap: 20,
            },
        }
    },

    // Tamaños
    w: {
        _100: {
            width: '100%',
        },
        _80: {
            width: '80%',
        },
        _50: {
            width: '50%',
        },
        _30: {
            width: '30%',
        },
    },

    // Padding
    p: {
        _1: {
            padding: 0,
            padding: 5,
        },
        _2: {
            padding: 0,
            padding: 10,
        },
        _3: {
            padding: 0,
            padding: 15,
        },
        _4: {
            padding: 0,
            padding: 20,
        }

    },

    // Margin
    m: {
        _1: {
            margin: 5,
        },
        _2: {
            margin: 10,
        },
        _3: {
            margin: 15,
        },
        _4: {
            margin: 20,
        }

    },
    mt: {
        _1: {
            marginTop: 5,
        },
        _2: {
            marginTop: 10,
        },
        _3: {
            marginTop: 15,
        },
        _4: {
            marginTop: 20,
        }

    },
    mx: {
        _1: {
            marginRight: 5,
            marginLeft: 5,
        },
        _2: {
            marginRight: 10,
            marginLeft: 10,
        },
        _3: {
            marginRight: 15,
            marginLeft: 15,
        },
        _4: {
            marginRight: 20,
            marginLeft: 20,
        }

    },

    // Decoradores
    bg:{
        _1: {
            backgroundColor: 'rgb(24, 2, 44)'
        },
        _2: {
            backgroundColor: '#2f3e9fe'
        }
    },
    br: {
        _1: {
            borderRadius: 5,
        },
        _2: {
            borderRadius: 10,
        },
        _3: {
            borderRadius: 15,
        },
        _4: {
            borderRadius: 20,
        },
    }
});