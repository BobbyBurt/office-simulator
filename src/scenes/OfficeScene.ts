
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import AnnoyingGuyPrefab from "../prefabs/AnnoyingGuyPrefab";
/* START-USER-IMPORTS */
import ComputerScene from "./ComputerScene";
import GameboyScene from "./GameboyScene";

/* END-USER-IMPORTS */

export default class OfficeScene extends Phaser.Scene {

	constructor() {
		super("office-scene");

		/* START-USER-CTR-CODE */

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

		// annoyingGuy
		const annoyingGuy = new AnnoyingGuyPrefab(this, 812, -157);
		this.add.existing(annoyingGuy);

		// reticle
		const reticle = this.add.rectangle(480, 240, 8, 2);
		reticle.isFilled = true;
		reticle.fillColor = 4276545;

		// reticle_1
		const reticle_1 = this.add.rectangle(480, 240, 2, 8);
		reticle_1.isFilled = true;
		reticle_1.fillColor = 4276545;

		// gameoverText
		const gameoverText = this.add.text(480, 240, "", {});
		gameoverText.setOrigin(0.5, 0.5);
		gameoverText.visible = false;
		gameoverText.text = "Game Over";
		gameoverText.setStyle({ "align": "center", "color": "#323232ff", "fontSize": "64px", "fontStyle": "bold" });

		// gameboyPlacement
		const gameboyPlacement = this.add.rectangle(719, 360, 200, 150);
		gameboyPlacement.setOrigin(0, 0);
		gameboyPlacement.isFilled = true;
		gameboyPlacement.fillColor = 12150776;

		// lists
		const hiddenObjects = [computerPlacement, cameraBounds, gameboyPlacement];

		this.cameraBounds = cameraBounds;
		this.fNAF_bg = fNAF_bg;
		this.toidSketch = toidSketch;
		this.computerPlacement = computerPlacement;
		this.reticle = reticle;
		this.reticle_1 = reticle_1;
		this.gameoverText = gameoverText;
		this.gameboyPlacement = gameboyPlacement;
		this.hiddenObjects = hiddenObjects;

		this.events.emit("scene-awake");
	}

	private cameraBounds!: Phaser.GameObjects.Rectangle;
	private fNAF_bg!: Phaser.GameObjects.Image;
	private toidSketch!: Phaser.GameObjects.Image;
	private computerPlacement!: Phaser.GameObjects.Rectangle;
	public reticle!: Phaser.GameObjects.Rectangle;
	private reticle_1!: Phaser.GameObjects.Rectangle;
	private gameoverText!: Phaser.GameObjects.Text;
	private gameboyPlacement!: Phaser.GameObjects.Rectangle;
	private hiddenObjects!: Phaser.GameObjects.Rectangle[];

	/* START-USER-CODE */

	private plane1: Phaser.GameObjects.Plane;

	private toidTween: Phaser.Tweens.Tween;

	// secondary scenes
	private computerScene: ComputerScene;
	private gameboyScene: GameboyScene;


	preload()
	{
		console.debug('hey this does preload right');
	}

	create()
	{
		this.editorCreate();

		this.setupCamera();

		// secondary scene set
		this.computerScene = this.scene.get('computer-scene') as ComputerScene;
		this.gameboyScene = this.scene.get('gameboy-scene') as GameboyScene;

		// pointer input
		this.input.on('pointerdown', (event: any) =>
		{
			this.input.mouse?.requestPointerLock();

			console.debug(event);
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

		// setup reticle
		this.reticle.setScrollFactor(0);
		this.reticle_1.setScrollFactor(0);
	}

	update()
	{
		this.updateSceneViewports();
	}
	
	/**
	 * Update the secondary scene viewport screen position based on camera scroll.
	*/
	updateSceneViewports()
	{
		this.computerScene.cameras.main.setViewport
		(
			this.computerPlacement.x - (this.cameras.main.scrollX * 1.0), 
			this.computerPlacement.y - (this.cameras.main.scrollY * 1.0), 
			this.computerPlacement.width, 
			this.computerPlacement.height
		);
		this.gameboyScene.cameras.main.setViewport
		(
			this.gameboyPlacement.x - (this.cameras.main.scrollX * 1.0), 
			this.gameboyPlacement.y - (this.cameras.main.scrollY * 1.0), 
			this.gameboyPlacement.width,
			this.gameboyPlacement.height
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

	/**
	 * returns whatever interactive object is in the center of the screen.
	 */
	reticleOverlapping()
	{

	}

	public gameOver()
	{
		this.gameoverText.setVisible(true);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
