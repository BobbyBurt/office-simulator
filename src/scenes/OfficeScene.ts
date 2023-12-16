
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
		const fNAF_bg_1 = this.add.image(501, -163, "FNAF-bg");
		fNAF_bg_1.scaleX = 0.4633747718556862;
		fNAF_bg_1.scaleY = 0.4633747718556862;

		// fNAF_bg
		const fNAF_bg = this.add.image(492, 88, "FNAF-bg");
		fNAF_bg.scaleX = 0.37892719712943057;
		fNAF_bg.scaleY = 0.37892719712943057;

		// toidSketch
		const toidSketch = this.add.image(-134, 320, "ToidSketch");
		toidSketch.scaleX = 1.104608767712672;
		toidSketch.scaleY = 1.104608767712672;

		// bitmaptext_1
		const bitmaptext_1 = this.add.bitmapText(490, 259, "nokia_1", "The quick brown fox jumps over a lazy dog");
		bitmaptext_1.text = "The quick brown fox jumps over a lazy dog";
		bitmaptext_1.fontSize = -16;
		bitmaptext_1.maxWidth = 200;
		bitmaptext_1.dropShadowAlpha = 0;

		this.fNAF_bg_1 = fNAF_bg_1;
		this.fNAF_bg = fNAF_bg;
		this.toidSketch = toidSketch;

		this.events.emit("scene-awake");
	}

	private fNAF_bg_1!: Phaser.GameObjects.Image;
	private fNAF_bg!: Phaser.GameObjects.Image;
	private toidSketch!: Phaser.GameObjects.Image;

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
				this.cameras.main.setScroll(this.cameras.main.scrollX + pointer.movementX * 1.5, this.cameras.main.scrollY + pointer.movementY);
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
		this.computerScene.cameras.main.setViewport(-this.cameras.main.scrollX * .9, -this.cameras.main.scrollY * .9, 400, 300);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
