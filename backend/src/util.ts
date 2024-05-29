const words = [
    "circle",
    "square",
    "triangle",
    "heart",
    "star",
    "line",
    "arrow",
    "smiley",
    "sun",
    "moon",
    "cloud",
    "tree",
    "house",
    "cat",
    "dog",
    "car",
    "boat",
    "flower",
    "bird",
    "apple",
    "banana",
    "fish",
    "butterfly",
    "umbrella",
    "houseplant",
    "cupcake",
    "book",
    "rocket",
    "balloon",
    "guitar",
    "robot",
    "snowflake",
    "cookie",
    "snake",
    "hat"
];

function getRandomNumber() {
    return Math.floor(Math.random() * 50);
}

export function threeWords(): string[]{
    let res:string[] = [];

    for (let i=0;i<3;i++){
        res.push(words[getRandomNumber()]);
    }
    return res;

}