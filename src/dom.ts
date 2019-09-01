import { OCCUPIED_COLOR, FREE_COLOR, COLS, COL_LENGTH } from "./constants";
import { CellMap } from "./utils";
import { Card } from "./Card";

function makeDiv({
	x,
	y,
	w,
	h,
	color,
	text,
}: {
	x?: number;
	y?: number;
	w: number;
	h: number;
	color: string;
	text?: string;
}) {
	let div = document.createElement("div");
	x && (div.style.left = `${x}px`);
	y && (div.style.top = `${y}px`);
	div.style.position = `absolute`;
	div.style.width = `${w}px`;
	div.style.height = `${h}px`;
	div.style.backgroundColor = color;
	text && (div.innerText = text);
	return div;
}

export function makeCanvas() {
	let w = COL_LENGTH * COLS;
	let h = COL_LENGTH * COLS;
	let color = `rgba(240, 240, 240, 0.7)`;
	let grid = makeDiv({ w, h, color });
	return grid;
}

export function drawMap(canvas: HTMLElement, map: CellMap) {
	for (let i = 0; i < COLS; i++) {
		for (let j = 0; j < COLS; j++) {
			let x = j * COL_LENGTH;
			let y = i * COL_LENGTH;
			let w = COL_LENGTH;
			let h = COL_LENGTH;
			let sum = map.get(`${i},${j}`);
			let color = sum ? FREE_COLOR : OCCUPIED_COLOR;
			let text = (sum && sum.join("x")) || "";

			let div = makeDiv({ x, y, w, h, color, text });

			canvas.append(div);
		}
	}
}

export function drawCards(canvas: HTMLElement, cards: Card[]) {
	cards.forEach(c => {
		let { x, y, w, h } = c;
		let color = `rgba(50, 50, 50, 0.5)`;
		let cardDiv = makeDiv({ x, y, w, h, color });
		canvas.append(cardDiv);
	});
}

export function drawArea(canvas: HTMLElement, area: Card) {
	let { x, y, w, h } = area;
	let color = `rgba(255, 255, 80, 0.75)`;
	let cardDiv = makeDiv({ x, y, w, h, color });
	canvas.append(cardDiv);
}
