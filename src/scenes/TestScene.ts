
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TestScene extends Phaser.Scene {

	constructor() {
		super("test-scene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// toidSketch
		const toidSketch = this.add.image(108, 96, "ToidSketch");
		toidSketch.scaleX = 0.4253923881732923;
		toidSketch.scaleY = 0.4253923881732923;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
