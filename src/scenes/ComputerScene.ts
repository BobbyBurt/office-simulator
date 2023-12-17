
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { computerPhrases } from 'data/computerPhrases.json'
/* END-USER-IMPORTS */

export default class ComputerScene extends Phaser.Scene {

	constructor() {
		super("computer-scene");

		/* START-USER-CTR-CODE */
		// Write your code here.
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

	create() {

		this.editorCreate();

		// key input
		this.input.keyboard!.on('keydown', this.keyDownHandler, this);
	}

	keyDownHandler(event: KeyboardEvent)
	{
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
		{
			// is other acceptable key

			this.inputPhrase.setText(this.inputPhrase.text + event.key);
			this.inputPhrase.runWordWrap(this.inputPhrase.text);
		}

		if (this.inputPhrase.text === this.instructedPhrase.text)
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
		// AV feedback
		this.background.fillColor = this.screenColours.green;
		this.sound.play('computer-success');

		// update quota

		this.time.delayedCall(1000, () =>
		{
			// delay

			this.background.fillColor = this.screenColours.blue;

			this.setNewPhrase();
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

	/**
	 * Load medal data from PPP
	 */
	NGioExternalTest()
	{
		// create the component, and pass in an external App ID
		var component = new NewgroundsIO.components.Medal.getList({
			app_id: '55003:7XXBXFge', // in "12345:UvWXyZ" format
			id: '70087'
		});

		// execute the component on the server
		NGIO.ngioCore.executeComponent(component, onExternalMedalsLoaded);

		// serverResponse will be a NewgroundsIO.objects.Response instance
		function onExternalMedalsLoaded(serverResponse: any)
		{
			if (serverResponse.success) {

				// result will be an instance of NewgroundsIO.results.Medal.getList
				var result = serverResponse.result;

				if (result.success) {

					result.medals.forEach(function (medal: any) {
						// medal is an instance of NewgroundsIO.objects.Medal

						/**
						 * You can get medal information like so:
						 *   medal.id
						 *   medal.name
						 *   medal.description
						 *   medal.value
						 *   medal.icon  (note, these are usually .webp files, and may not work in all frameworks)
						 */
						console.debug(medal);
						console.debug(medal.unlocked);
					});

					// You can get the app id that was used with result.app_id

				} else {
					// the component failed
					console.error(result.error.message);
				}

			} else {

				// something went wrong
				console.error(serverResponse.error.message);
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
