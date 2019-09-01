import { Card } from "./Card";
import { COL_LENGTH, COLS } from "./constants";

export type CellMap = Map<string, [number, number] | null>;

// do this shit for any grid change
export function generateCellMap() {
	let map: CellMap = new Map();

	for (let i = COLS - 1; i >= 0; i--) {
		for (let j = COLS - 1; j >= 0; j--) {
			setSum(map, i, j);
		}
	}

	return map;
}

export function occupy(map: CellMap, card: Card) {
	let l = Math.floor(card.l / COL_LENGTH);
	let r = Math.ceil(card.r / COL_LENGTH);

	let t = Math.floor(card.t / COL_LENGTH);
	let b = Math.ceil(card.b / COL_LENGTH);

	for (let i = t; i < b; i++) {
		for (let j = l; j < r; j++) {
			map.set(`${i},${j}`, null);
		}
	}

	for (let i = b; i >= t; i--) {
		for (let j = l - 1; j >= 0; j--) {
			setSum(map, i, j);
		}
	}

	for (let i = t - 1; i >= 0; i--) {
		for (let j = r; j >= 0; j--) {
			setSum(map, i, j);
		}
	}
}

export function findNearestSpace(
	map: CellMap,
	{ cellW, cellH }: { cellW: number; cellH: number }
) {
	for (let i = 0; i < COLS; i++) {
		for (let j = 0; j < COLS; j++) {
			let cell = map.get(`${i},${j}`);
			if (!cell) continue;

			let [hA, wA] = cell;
			if (hA >= cellH && wA >= cellW) {
				let x = j * COL_LENGTH;
				let y = i * COL_LENGTH;
				let w = cellW * COL_LENGTH;
				let h = cellH * COL_LENGTH;
				return new Card(x, y, w, h);
			}
		}
	}
}

function setSum(map: CellMap, i: number, j: number) {
	if (map.get(`${i},${j}`) === null) return;

	let b = map.get(`${i + 1},${j}`);
	let bV = (b && b[0]) || 0;
	let r = map.get(`${i},${j + 1}`);
	let rV = (r && r[1]) || 0;

	map.set(`${i},${j}`, [bV + 1, rV + 1]);
}
