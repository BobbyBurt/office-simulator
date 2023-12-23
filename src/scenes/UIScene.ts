
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
		const uIMeter = new UIMeter(this, 20, 18);
		this.add.existing(uIMeter);

		// uIMeter (prefab fields)
		uIMeter.colour = "#d75050ff";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
