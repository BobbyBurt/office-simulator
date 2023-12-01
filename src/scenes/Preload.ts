
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";

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

		// load_bg
		const load_bg = this.add.image(0, 0, "load-bg");
		load_bg.setOrigin(0, 0);

		// progress
		const progress = this.add.bitmapText(240, 104, "nokia", "0%");
		progress.setOrigin(0.5, 0.5);
		progress.tintTopLeft = 9737364;
		progress.tintTopRight = 9737364;
		progress.tintBottomLeft = 9737364;
		progress.tintBottomRight = 9737364;
		progress.text = "0%";
		progress.fontSize = -16;
		progress.dropShadowColor = 9737364;

		// fileText
		const fileText = this.add.bitmapText(369, 324, "nokia", "New BitmapText");
		fileText.alpha = 0.2;
		fileText.alphaTopLeft = 0.2;
		fileText.alphaTopRight = 0.2;
		fileText.alphaBottomLeft = 0.2;
		fileText.alphaBottomRight = 0.2;
		fileText.text = "New BitmapText";
		fileText.fontSize = -8;
		fileText.maxWidth = 200;

		// progress_1
		const progress_1 = this.add.bitmapText(240, 197, "nokia", "- PLEASE STAND BY -");
		progress_1.setOrigin(0.5, 0.5);
		progress_1.tintTopLeft = 9737364;
		progress_1.tintTopRight = 9737364;
		progress_1.tintBottomLeft = 9737364;
		progress_1.tintBottomRight = 9737364;
		progress_1.text = "- PLEASE STAND BY -";
		progress_1.fontSize = -10;
		progress_1.align = 1;
		progress_1.dropShadowColor = 9737364;

		// birdFade
		const birdFade = this.add.rectangle(240, 132, 50, 40);
		birdFade.alpha = 0.7;
		birdFade.isFilled = true;

		// progress (components)
		// new PreloadText(progress);

		this.fileText = fileText;
		this.birdFade = birdFade;

		this.events.emit("scene-awake");
	}

	private fileText!: Phaser.GameObjects.BitmapText;
	private birdFade!: Phaser.GameObjects.Rectangle;

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
		this.scene.launch("Titlescreen");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
