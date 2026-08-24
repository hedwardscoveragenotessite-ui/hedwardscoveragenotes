const pagesConfig = [
    {
        title: "🍃 Hedden 5th floor",
        fields: [
            { id: "h5-hallway", type: "toggle", label: "Hallway", },
            // This field will be hidden on load because defaults to true
            { id: "h5-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h5-hallway" },
            { id: "h5-north", type: "number", label: "North Common Room" },
            {
                id: "h5-north-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h5-north",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h5-south", type: "number", label: "South Common Room" },
            {
                id: "h5-south-select",
                type: "multiselect",
                label: "Number of people in room ",
                hideIfZero: "h5-south",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h5-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🍃 Hedden 4th floor",
        fields: [
            { id: "h4-hallway", type: "toggle", label: "Hallway", },
            // This field will be hidden on load because defaults to true
            { id: "h4-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h4-hallway" },
            { id: "h4-north", type: "number", label: "North Common Room" },
            {
                id: "h4-north-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h4-north",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h4-south", type: "number", label: "South Common Room" },
            {
                id: "h4-south-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h4-south",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h4-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🍃 Hedden 3rd floor",
        fields: [
            { id: "h3-hallway", type: "toggle", label: "Hallway", },
            // This field will be hidden on load because defaults to true
            { id: "h3-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h3-hallway" },
            { id: "h3-north", type: "number", label: "North Common Room" },
            {
                id: "h3-north-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h3-north",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h3-south", type: "number", label: "South Common Room" },
            {
                id: "h3-south-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h3-south",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h3-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🍃 Hedden 2nd floor",
        fields: [
            { id: "h2-hallway", type: "toggle", label: "Hallway", },
            // This field will be hidden on load because defaults to true
            { id: "h2-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h2-hallway" },
            { id: "h2-north", type: "number", label: "North Common Room" },
            {
                id: "h2-north-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h2-north",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h2-south", type: "number", label: "South Common Room" },
            {
                id: "h2-south-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h2-south",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h2-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🍃 Hedden 1st floor",
        fields: [
            { id: "h1-hallway", type: "toggle", label: "Hallway", },
            // This field will be hidden on load because defaults to true
            { id: "h1-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h1-hallway" },
            { id: "h1-north", type: "number", label: "North Common Room" },
            {
                id: "h1-south-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h1-north",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h1-south", type: "number", label: "South Common Room" },
            {
                id: "h1-south-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h1-south",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "h1-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🍃 Hedden Basement N",
        fields: [
            { id: "h0-laundry", type: "number", label: "Laundry Room" },
            { id: "h0-studyb111toggle", type: "toggle", label: "Study room 111" },
            { id: "h0-studyb111-count", type: "number", label: "Number of people in room ", showIfFalse: "h0-studyb111toggle" },
            { id: "h0-studyb112toggle", type: "toggle", label: "Study room 112", },
            { id: "h0-studyb112-count", type: "number", label: "Number of people in room ", showIfFalse: "h0-studyb112toggle" },
        ]
    },
    {
        title: "🍃 Hedden Basement S",
        fields: [
            { id: "h0-ravine", type: "number", label: "Ravine Room" },
            {
                id: "h0-ravine-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "h0-ravine",
                options: ["Watching TV", "Playing Ping-Pong", "Playing pool", "Hanging Out", "In Kitchen"] // Add your options here!
            },
            { id: "h0-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🌲 Edwards Floor 3",
        fields: [
            { id: "e3-hallway", type: "toggle", label: "Hallway", },
            // This field will be hidden on load because defaults to true
            { id: "e3-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "e3-hallway" },
            { id: "e3-notes", type: "textarea", label: "General Notes" },
        ]
    },
    {
        title: "🌲 Edwards Floor 2",
        fields: [
            { id: "e2-hallway", type: "toggle", label: "Hallway", },
            // This field will be hidden on load because defaults to true
            { id: "e2-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "e2-hallway" },
            { id: "e2-kitchen", type: "number", label: "Kitchen 226" },
            {
                id: "e2-kitchen-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "e2-kitchen",
                options: ["Studying", "On phone", "Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "e2-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🌲 Edwards Floor 1",
        fields: [
            { id: "e1-hallway", type: "toggle", label: "Hallway", },
            // This field will be hidden on load because defaults to true
            { id: "e1-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "e1-hallway" },
            { id: "e1-common108", type: "number", label: "Common 108" },
            {
                id: "e1-common108-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "e1-common108",
                options: ["Studying", "On phone", "Hanging Out"] // Add your options here!
            },
            { id: "e1-common115", type: "number", label: "Common 115" },
            {
                id: "e1-common115-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "e1-common115",
                options: ["Studying", "On phone", "Hanging Out"] // Add your options here!
            },
            { id: "e1-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🌲 Edwards Basement N",
        fields: [
            { id: "e0-gameroom", type: "number", label: "Game Room" },
            {
                id: "e0-gameroom-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "e0-gameroom",
                options: ["Watching TV", "Playing Ping-Pong", "Playing pool", "Hanging Out", "In Kitchen"] // Add your options here!
            },
            { id: "e0-kichenate", type: "number", label: "Kitchenette" },
            {
                id: "e0-kitchenate-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "e0-kichenate",
                options: ["Cooking", "Filling Water", "Hanging Out"] // Add your options here!
            },
            { id: "e0-kitchen", type: "number", label: "Kitchen" },
            {
                id: "e0-kitchen-select",
                type: "multiselect",
                //label: "Number of people in room ",
                hideIfZero: "e0-kitchen",
                options: ["Cooking", "Filling Water", "Socialising"] // Add your options here!
            },
            { id: "e0-notes", type: "textarea", label: "General Notes" }
        ]
    },
    {
        title: "🌲 Edwards Basement S",
        fields: [
            { id: "e0-studyb106toggle", type: "toggle", label: "Study room B106" },
            { id: "e0-studyb106-count", type: "number", label: "Number of people in room ", showIfFalse: "e0-studyb106toggle" },
            { id: "e0-studyb105toggle", type: "toggle", label: "Study room B105", },
            { id: "e0-studyb105-count", type: "number", label: "Number of people in room ", showIfFalse: "e0-studyb105toggle" },
            { id: "e0-studyb102toggle", type: "toggle", label: "Study room B102" },
            { id: "e0-studyb102-count", type: "number", label: "Number of people in room ", showIfFalse: "e0-studyb102toggle" },
            { id: "e0-laundry", type: "number", label: "Laundry Room" },
            // { id: "e0-notes", type: "textarea", label: "General Notes" }
        ]
    }
];
