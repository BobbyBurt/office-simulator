
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { computerPhrases } from 'data/computerPhrases.json'
import PostFX from "../FX/PostFX";
/* END-USER-IMPORTS */

export default class ComputerScene extends Phaser.Scene {

	constructor() {
		super("computer-scene");

		/* START-USER-CTR-CODE */
		
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background
		const background = this.add.rectangle(0, 0, 300, 225);
		background.setOrigin(0, 0);
		background.isFilled = true;
		background.fillColor = 15596;

		// instructedPhrase
		const instructedPhrase = this.add.text(23, 48, "", {});
		instructedPhrase.alpha = 0.8;
		instructedPhrase.alphaTopLeft = 0.8;
		instructedPhrase.alphaTopRight = 0.8;
		instructedPhrase.alphaBottomLeft = 0.8;
		instructedPhrase.alphaBottomRight = 0.8;
		instructedPhrase.text = "ill get you meddling kids";
		instructedPhrase.setStyle({ "color": "#ffffffff", "fontSize": "20px", "fontStyle": "bold" });
		instructedPhrase.setWordWrapWidth(270);

		// inputPhrase
		const inputPhrase = this.add.text(23, 129, "", {});
		inputPhrase.setStyle({ "fontSize": "20px", "fontStyle": "bold" });
		inputPhrase.setWordWrapWidth(270, true);

		this.background = background;
		this.instructedPhrase = instructedPhrase;
		this.inputPhrase = inputPhrase;

		this.events.emit("scene-awake");
	}

	private background!: Phaser.GameObjects.Rectangle;
	private instructedPhrase!: Phaser.GameObjects.Text;
	private inputPhrase!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	private screenColours = 
	{
		blue: 0x003cec,
		green: 0x2bc347,
		red: 0xec0000
	}

	/** True during complete sequences / between phrases */
	private lockInput = false;

	create() {

		this.editorCreate();

		// key input
		this.input.keyboard!.on('keydown', this.keyDownHandler, this);

		this.setNewPhrase();
	}

	keyDownHandler(event: KeyboardEvent)
	{
		if (this.lockInput)
			return;
		
		if (event.key === 'Backspace' && this.inputPhrase.text.length > 0)
		{
			// is backspace

			this.inputPhrase.setText(this.inputPhrase.text.substring(0, this.inputPhrase.text.length - 1));
		}
		else if (event.key === 'q' ||
		event.key === 'w' ||
		event.key === 'e' ||
		event.key === 'r' ||
		event.key === 't' ||
		event.key === 'y' ||
		event.key === 'u' ||
		event.key === 'i' ||
		event.key === 'o' ||
		event.key === 'p' ||
		event.key === 'a' ||
		event.key === 's' ||
		event.key === 'd' ||
		event.key === 'f' ||
		event.key === 'g' ||
		event.key === 'h' ||
		event.key === 'j' ||
		event.key === 'k' ||
		event.key === 'l' ||
		event.key === 'z' ||
		event.key === 'x' ||
		event.key === 'c' ||
		event.key === 'v' ||
		event.key === 'b' ||
		event.key === 'n' ||
		event.key === 'm' ||
		event.key === ' ')
		// TODO: accept uppercase letters as lowercase. Currently doesn't work w/ capslock on.
		{
			// is other acceptable key

			this.inputPhrase.setText(this.inputPhrase.text + event.key);
			this.inputPhrase.runWordWrap(this.inputPhrase.text);
		}

		if (this.inputPhrase.text === this.instructedPhrase.text && !this.lockInput)
		{
			// input & instructed strings match

			this.phraseCompleteSequence();
		}
	}

	/**
	 * AV feedback, update quota / count, delay, call new phrase
	 */
	phraseCompleteSequence()
	{
		this.lockInput = true;
		
		// AV feedback
		this.background.fillColor = this.screenColours.green;
		this.sound.play('computer-success');

		// TODO: update necessary classes / variables

		this.time.delayedCall(1000, () =>
		{
			// delay

			this.background.fillColor = this.screenColours.blue;

			this.setNewPhrase();

			this.lockInput = false;

		});

	}

	setNewPhrase()
	{
		// pick random phrase
		let phraseIndex = Phaser.Math.RND.integerInRange(0, computerPhrases.length - 1);
		let phrase = computerPhrases[phraseIndex].phrase;

		// set lowercase
		phrase = phrase.toLocaleLowerCase();

		// set texts
		this.instructedPhrase.setText(phrase);
		this.inputPhrase.setText('');
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
