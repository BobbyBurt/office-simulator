
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ComputerScene extends Phaser.Scene {

	constructor() {
		super("computer-scene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// rectangle_1
		const rectangle_1 = this.add.rectangle(0, 0, 400, 300);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 15596;

		// instructedPhrase
		const instructedPhrase = this.add.text(40, 86, "", {});
		instructedPhrase.text = "The quick brown fox jumps over a lazy dog";
		instructedPhrase.setStyle({ "fontSize": "22px", "fontStyle": "bold" });
		instructedPhrase.setWordWrapWidth(350);

		// inputPhrase
		const inputPhrase = this.add.text(40, 167, "", {});
		inputPhrase.setStyle({ "fontSize": "22px", "fontStyle": "bold" });
		inputPhrase.setWordWrapWidth(300, true);

		this.instructedPhrase = instructedPhrase;
		this.inputPhrase = inputPhrase;

		this.events.emit("scene-awake");
	}

	private instructedPhrase!: Phaser.GameObjects.Text;
	private inputPhrase!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		// key input
		this.input.keyboard!.on('keydown', (event: any) =>
		{
			// backspace
			if (event.key === 'Backspace' && this.inputPhrase.text.length > 0)
			{
				this.inputPhrase.setText(this.inputPhrase.text.substring(0, this.inputPhrase.text.length - 1));
			}
			// other acceptable keys
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
			{
				this.inputPhrase.setText(this.inputPhrase.text + event.key);
				this.inputPhrase.runWordWrap(this.inputPhrase.text);
			}

			// check string
			if (this.inputPhrase.text === this.instructedPhrase.text)
			{
				this.phraseCompleteSequence();
			}
		});
	}

	/**
	 * AV feedback, update quota / count, delay, call new phrase
	 */
	phraseCompleteSequence()
	{
		// AV feedback

		// update quota

		this.time.delayedCall(1000, () =>
		{

		});
	}

	setNewPhrase()
	{
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
