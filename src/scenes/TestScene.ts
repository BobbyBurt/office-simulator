
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
		const toidSketch = this.add.image(184, 151, "ToidSketch");
		toidSketch.scaleX = 0.4253923881732923;
		toidSketch.scaleY = 0.4253923881732923;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	private plane1: Phaser.GameObjects.Plane;

	create() {

		this.editorCreate();

		// Plane test
		this.plane1 = this.add.plane(480, 270, 'QR');
		// this.plane1.modelPosition.set(30, 30, 30);
		
		this.input.keyboard!.on('keydown-Q', () =>
		{
			this.plane1.modelRotation.x += Phaser.Math.DegToRad(1);
		});
		this.input.keyboard!.on('keydown-W', () =>
		{
			this.plane1.modelRotation.y += .1;
		});
		this.input.keyboard!.on('keydown-E', () =>
		{
			this.plane1.modelRotation.z += .1;
		});
	}

	update()
	{
		this this.input.keyboard?.addKey('Q');
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
