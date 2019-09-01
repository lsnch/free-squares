export class Card {
	constructor(
		public x: number,
		public y: number,
		public w: number,
		public h: number
	) {}

	get l() {
		return this.x;
	}
	get r() {
		return this.x + this.w;
	}
	get t() {
		return this.y;
	}
	get b() {
		return this.y + this.h;
	}
}
