
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

		// cameraBounds
		const cameraBounds = this.add.rectangle(-481, -234, 1920, 820);
		cameraBounds.setOrigin(0, 0);
		cameraBounds.isFilled = true;
		cameraBounds.fillAlpha = 0;
		cameraBounds.isStroked = true;
		cameraBounds.strokeColor = 64571;
		cameraBounds.lineWidth = 3;

		// fNAF_bg
		const fNAF_bg = this.add.image(-482, -372, "test-background");
		fNAF_bg.setOrigin(0, 0);

		// toidSketch
		const toidSketch = this.add.image(-134, 320, "ToidSketch");
		toidSketch.scaleX = 1.104608767712672;
		toidSketch.scaleY = 1.104608767712672;

		// computerPlacement
		const computerPlacement = this.add.rectangle(295, 138, 300, 225);
		computerPlacement.setOrigin(0, 0);
		computerPlacement.isFilled = true;
		computerPlacement.fillColor = 2706669;

		// bgCover
		const bgCover = this.add.rectangle(735, -148, 200, 150);
		bgCover.setOrigin(0, 0);
		bgCover.isFilled = true;

		// annoying_guy
		this.add.image(990, -63, "annoying guy");

		// lists
		const hiddenObjects = [computerPlacement, cameraBounds];

		this.cameraBounds = cameraBounds;
		this.fNAF_bg = fNAF_bg;
		this.toidSketch = toidSketch;
		this.computerPlacement = computerPlacement;
		this.hiddenObjects = hiddenObjects;

		this.events.emit("scene-awake");
	}

	private cameraBounds!: Phaser.GameObjects.Rectangle;
	private fNAF_bg!: Phaser.GameObjects.Image;
	private toidSketch!: Phaser.GameObjects.Image;
	private computerPlacement!: Phaser.GameObjects.Rectangle;
	private hiddenObjects!: Phaser.GameObjects.Rectangle[];

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

		this.setupCamera();

		// var set
		this.computerScene = this.scene.get('computer-scene') as ComputerScene;

		// pointer input
		this.input.on('pointerdown', () =>
		{
			this.input.mouse?.requestPointerLock();
		});
		this.input.on('pointermove', this.pointerMoveHandler, this);

		// toid animate
		this.toidTween = this.tweens.add({
			targets: this.toidSketch,
			duration: 1000,
			ease: Phaser.Math.Easing.Circular.Out,
			repeat: -1,
			yoyo: true,
			y: 150
		});

		this.hideObjectsInList();

	}

	update()
	{
		// update computer scene position
		this.computerScene.cameras.main.setViewport
		(
			this.computerPlacement.x - (this.cameras.main.scrollX * 1.0), 
			this.computerPlacement.y - (this.cameras.main.scrollY * 1.0), 400, 300
		);
	}

	/**
	 * Scrolls the camera
	 * @param pointer 
	 */
	pointerMoveHandler(pointer: Phaser.Input.Pointer)
	{
		if (this.input.mouse?.locked)
		{
			this.cameras.main.setScroll
			(
				this.cameras.main.scrollX + pointer.movementX * 1.5, 
				this.cameras.main.scrollY + pointer.movementY
			);
		}
	}

	/**
	 * Sets camera bounds
	 */
	setupCamera()
	{
		let topLeft = this.cameraBounds.getTopLeft();
		this.cameras.main.setBounds(topLeft.x!, topLeft.y!, this.cameraBounds.width, this.cameraBounds.height);
	}

	/**
	 * Hides everything in the `hiddenObjects` list
	 */
	hideObjectsInList()
	{
		this.hiddenObjects.forEach((object, index) =>
		{
			object.setVisible(false);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
