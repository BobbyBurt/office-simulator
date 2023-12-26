
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import UIScene from "./UIScene";
/* END-USER-IMPORTS */

export default class GameboyScene extends Phaser.Scene {

	constructor() {
		super("gameboy-scene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background
		const background = this.add.rectangle(0, 0, 200, 150);
		background.setOrigin(0, 0);
		background.isFilled = true;
		background.fillColor = 15756653;

		// instructedPhrase
		const instructedPhrase = this.add.text(100, 73, "", {});
		instructedPhrase.setOrigin(0.5, 0.5);
		instructedPhrase.alpha = 0.8;
		instructedPhrase.alphaTopLeft = 0.8;
		instructedPhrase.alphaTopRight = 0.8;
		instructedPhrase.alphaBottomLeft = 0.8;
		instructedPhrase.alphaBottomRight = 0.8;
		instructedPhrase.text = "MASH UP,\nL & R ARROWS\n\nUSE DOWN \nARROW TO HIDE";
		instructedPhrase.setStyle({ "align": "center", "color": "#ffffffff", "fontSize": "20px", "fontStyle": "bold" });
		instructedPhrase.setWordWrapWidth(270);

		this.background = background;
		this.instructedPhrase = instructedPhrase;

		this.events.emit("scene-awake");
	}

	private background!: Phaser.GameObjects.Rectangle;
	private instructedPhrase!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	private screenColours = 
	[
		0xf06d6d,
		0x61df28,
		0x41b5ed,
		0xc36df0,
		0xebb13d
	];
	private screenColourActiveIndex = 0;

	/**
	 * Used to check if the player is mashing the same key.
	 */
	private lastKey: string | undefined;
	private nextKey = 'ArrowLeft';

	private music: Phaser.Sound.BaseSound

	private UIScene: UIScene;

	create() {

		this.editorCreate();

		// key input
		this.input.keyboard!.on('keydown', this.keyDownHandler, this);

		//music
		this.music = this.sound.add('gameboy-music', { loop: true, volume: .7 });
		this.music.play();
		this.music.pause();

		this.scene.setVisible(false);

		this.UIScene = this.scene.get('ui-scene') as UIScene;
	}

	keyDownHandler(event: KeyboardEvent)
	{
		if ((event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')
			&& this.lastKey !== event.key)
		{
			// up, L or R key is down & not a repeat

			this.scene.setVisible(true);
			if (this.music.isPaused)
			{
				this.music.resume();
			}

			// update last key
			this.lastKey = event.key;

			this.gameInteract();
		}

		if (event.key === 'ArrowDown' && !this.scene.isSleeping())
		{
			this.scene.setVisible(false);
			this.music.pause();
		}
	}

	/**
	 * AV feedback
	 * 
	 * Called for each time the player hits a game key.
	 */
	gameInteract()
	{
		// set bg colour to next in the array
		this.screenColourActiveIndex++;
		this.screenColourActiveIndex = Phaser.Math.Wrap
			(this.screenColourActiveIndex, 0, this.screenColours.length - 1);
		this.background.fillColor = this.screenColours[this.screenColourActiveIndex];

		this.UIScene.uIMeter.value += .8;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
