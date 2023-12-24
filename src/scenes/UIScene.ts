
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import UIMeter from "../prefabs/UI/UIMeter";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class UIScene extends Phaser.Scene {

	constructor() {
		super("ui-scene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// uIMeter
		const uIMeter = new UIMeter(this, 17, 18);
		this.add.existing(uIMeter);

		// reticle_1
		const reticle_1 = this.add.rectangle(480, 270, 2, 8);
		reticle_1.isFilled = true;
		reticle_1.fillColor = 4276545;

		// reticle
		const reticle = this.add.rectangle(480, 270, 8, 2);
		reticle.isFilled = true;
		reticle.fillColor = 4276545;

		// uIMeter (prefab fields)
		uIMeter.fillColour = "#373737ff";
		uIMeter.outlineColour = "#ffffffff";
		uIMeter.barWidth = 300;

		this.uIMeter = uIMeter;
		this.reticle_1 = reticle_1;
		this.reticle = reticle;

		this.events.emit("scene-awake");
	}

	private uIMeter!: UIMeter;
	private reticle_1!: Phaser.GameObjects.Rectangle;
	public reticle!: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
