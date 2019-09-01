import { generateCellMap, occupy, findNearestSpace } from "./utils";
import { Card } from "./Card";
import { makeCanvas, drawMap, drawCards, drawArea } from "./dom";

let map = generateCellMap();

let cards = [
	new Card(10, 10, 100, 100),
	new Card(151, 150, 100, 300),
	new Card(500, 0, 200, 200),
	new Card(0, 0, 100, 100),
	new Card(133, 350, 100, 100),
	new Card(0, 600, 500, 100),
	new Card(150, 40, 300, 300),
];

cards.forEach(c => occupy(map, c));

let canvas = makeCanvas();
drawMap(canvas, map);
drawCards(canvas, cards);

let next = findNearestSpace(map, { cellW: 7, cellH: 2 });
next && drawArea(canvas, next);

document.body.append(canvas);
