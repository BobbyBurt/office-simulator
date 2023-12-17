
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import ComputerScene from "./ComputerScene";

/* END-USER-IMPORTS */

export default class OfficeScene extends Phaser.Scene {

	constructor() {
		super("office-scene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// fNAF_bg_1
		const fNAF_bg_1 = this.add.image(501, -9, "test-background");
		fNAF_bg_1.scaleX = 0.7537540760340492;
		fNAF_bg_1.scaleY = 0.7537540760340492;

		// fNAF_bg
		const fNAF_bg = this.add.image(492, 242, "test-background");
		fNAF_bg.scaleX = 0.6693064932228694;
		fNAF_bg.scaleY = 0.6693064932228694;

		// toidSketch
		const toidSketch = this.add.image(-134, 320, "ToidSketch");
		toidSketch.scaleX = 1.104608767712672;
		toidSketch.scaleY = 1.104608767712672;

		// computerPlacement
		const computerPlacement = this.add.rectangle(295, 138, 300, 225);
		computerPlacement.setOrigin(0, 0);
		computerPlacement.isFilled = true;
		computerPlacement.fillColor = 2706669;

		this.fNAF_bg_1 = fNAF_bg_1;
		this.fNAF_bg = fNAF_bg;
		this.toidSketch = toidSketch;
		this.computerPlacement = computerPlacement;

		this.events.emit("scene-awake");
	}

	private fNAF_bg_1!: Phaser.GameObjects.Image;
	private fNAF_bg!: Phaser.GameObjects.Image;
	private toidSketch!: Phaser.GameObjects.Image;
	private computerPlacement!: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */

	private plane1: Phaser.GameObjects.Plane;

	private toidTween: Phaser.Tweens.Tween;

	private computerScene: Phaser.Scene;


	preload()
	{
		console.debug('hey this does preload right');
	}

	create() {

		this.editorCreate();

		// var set
		this.computerScene = this.scene.get('computer-scene') as ComputerScene;

		// pointer input
		this.input.on('pointerdown', () =>
		{
			this.input.mouse?.requestPointerLock();
		});
		this.input.on('pointermove', (pointer: Phaser.Input.Pointer) =>
		{
			if (this.input.mouse?.locked)
			{
				this.cameras.main.setScroll
				(
					this.cameras.main.scrollX + pointer.movementX * 1.5, 
					this.cameras.main.scrollY + pointer.movementY
				);
			}
		});

		// toid animate
		this.toidTween = this.tweens.add({
			targets: this.toidSketch,
			duration: 1000,
			ease: Phaser.Math.Easing.Circular.Out,
			repeat: -1,
			yoyo: true,
			y: 150
		});
		this.toidSketch.setScrollFactor(1)
		this.fNAF_bg.setScrollFactor(.9)
		this.fNAF_bg_1.setScrollFactor(.8) 
	}

	update()
	{
		this.computerScene.cameras.main.setViewport
		(
			this.computerPlacement.x - (this.cameras.main.scrollX * .9), 
			this.computerPlacement.y - (this.cameras.main.scrollY * .9), 400, 300
		);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
