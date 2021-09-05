import { Cost, ResourceBonus } from './Types'
function shuffle<T>(a: Array<T>): Array<T> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export let Item: [Cost, ResourceBonus]

export function initializeTier1(): Array<typeof Item> {
    let itemsTier1: Array<ResourceBonus> = [
        { green: 0, red: 0, blue: 1, hp: 0 },
        { green: 0, red: 19, blue: 0, hp: 0 },
        { green: 42, red: 0, blue: 0, hp: 0 },
        { green: 66, red: 0, blue: 0, hp: 0 },
        { green: 20, red: 20, blue: 0, hp: 0 },
        { green: 7, red: 2, blue: 0, hp: 10 },
    ]

    let costsTier1: Array<Cost> = [
        { green: 65, red: 0, blue: 0, hp: 0 },
        { green: 87, red: 0, blue: 0, hp: 0 },
        { green: 123, red: 0, blue: 0, hp: 0 },
        { green: 198, red: 0, blue: 0, hp: 0 },
        { green: 270, red: 0, blue: 0, hp: 0 },
        { green: 1033, red: 0, blue: 0, hp: 0 },
    ]

    itemsTier1 = shuffle(itemsTier1)
    let items: Array<typeof Item> = []
    for (let i in costsTier1) {
        items.push([costsTier1[i], itemsTier1[i]]);
    }
    return items
}

let itemsTier2: Array<ResourceBonus> = [
    { green: 0, red: 0, blue: 104, hp: 0 },
    { green: 0, red: 290, blue: 0, hp: 0 },
    { green: 4255, red: 0, blue: 0, hp: 0 },
    { green: 660, red: 0, blue: 0, hp: 24 },
    { green: 808, red: 935, blue: 0, hp: 0 },
    { green: 7, red: 2, blue: 0, hp: 0 },
]

