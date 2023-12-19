
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorPreload(): void {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	editorCreate(): void {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	preload()
	{
		this.editorCreate();

		this.editorPreload();

		// Setup camera
		this.cameras.main.setOrigin(0, 0); 	
		this.cameras.main.setViewport(0, 0, this.scale.width, this.scale.height);

		// Load event
		this.load.on(Phaser.Loader.Events.COMPLETE, () => 
		{
			this.start();
		});

		this.scene.launch('medal-scene');
	}

	start()
	{
		this.scene.stop(this);
		this.scene.launch("computer-scene");
		this.scene.launch("gameboy-scene");
		this.scene.launch("office-scene");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
