
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class UIMeter extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// text
		const text = scene.add.text(0, 0, "", {});
		text.text = "Boredom";
		text.setStyle({ "fontSize": "22px" });
		this.add(text);

		// barOutline
		const barOutline = scene.add.rectangle(103, 3, 128, 15);
		barOutline.setOrigin(0, 0);
		barOutline.isStroked = true;
		barOutline.lineWidth = 2;
		this.add(barOutline);

		// barFill
		const barFill = scene.add.rectangle(103, 3, 128, 15);
		barFill.setOrigin(0, 0);
		barFill.isFilled = true;
		barFill.lineWidth = 2;
		this.add(barFill);

		this.text = text;
		this.barOutline = barOutline;
		this.barFill = barFill;

		/* START-USER-CTR-CODE */

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.setupProperties, this);

		/* END-USER-CTR-CODE */
	}

	private text: Phaser.GameObjects.Text;
	private barOutline: Phaser.GameObjects.Rectangle;
	private barFill: Phaser.GameObjects.Rectangle;
	public colour: string = "#000000ff";

	/* START-USER-CODE */

	/**
	 * For callback on first update. Properties are set after the prefab is constructed, so they can't 
	 */
	private setupProperties()
	{
		this.setColour();
	}

	/**
	 * Sets colour of the text and bar to `colour` property
	 */
	private setColour()
	{
		this.text.setColor(this.colour);

		// colour code string to int
		const colour = '0x' + this.colour.slice(1, 7);

		// TODO: decouple into util class

		this.barFill.setFillStyle(colour as unknown as number);
		this.barOutline.strokeColor = colour as unknown as number;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
