
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import UIScene from "~/scenes/UIScene";
/* END-USER-IMPORTS */

export default class UIMeter extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// text
		const text = scene.add.text(0, 0, "", {});
		text.text = "Fun";
		text.setStyle({ "color": "#2c2c2cff", "fontSize": "28px", "fontStyle": "bold", "strokeThickness":6});
		this.add(text);

		// barOutline
		const barOutline = scene.add.rectangle(153, 3, 128, 23);
		barOutline.setOrigin(0, 0);
		barOutline.isStroked = true;
		barOutline.lineWidth = 4;
		this.add(barOutline);

		// barFill
		const barFill = scene.add.rectangle(153, 3, 128, 23);
		barFill.setOrigin(0, 0);
		barFill.isFilled = true;
		barFill.lineWidth = 2;
		this.add(barFill);

		this.text = text;
		this.barOutline = barOutline;
		this.barFill = barFill;

		/* START-USER-CTR-CODE */

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.setupProperties, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

		this.SetBarX();

		this.uiScene = this.scene as UIScene;

		/* END-USER-CTR-CODE */
	}

	private text: Phaser.GameObjects.Text;
	private barOutline: Phaser.GameObjects.Rectangle;
	private barFill: Phaser.GameObjects.Rectangle;
	public fillColour: string = "#000000ff";
	public outlineColour: string = "#ffffff";
	public barWidth: number = 120;

	/* START-USER-CODE */

	private _value = 100;
	/**
	 * 0-100
	 */
	public set value(value: number)
	{
		value = Phaser.Math.Clamp(value, 0, 100);
		this._value = value;
	}
	public get value()
	{
		return this._value;
	}

	/**
	 * per frame
	 */
	public valueChange = -.003;

	// references
	private uiScene: UIScene;

	/**
	 * For callback on first update. Properties are set after the prefab is constructed, so they can't 
	 */
	private setupProperties()
	{
		this.setColour();

		this.setBarSize();
	}

	update(time: number, delta: number)
	{
		// update value
		this.value += this.valueChange * delta;
		this.value = Phaser.Math.Clamp(this.value, 0, 100);

		if (this.value === 0)
		{
			// TODO: check that the gameover state isn't already true.

			this.uiScene.setGameOverText(true, `You fell asleep on the job!`);
		}

		this.updateBar();
	}

	/**
	 * Set bar fill based on `value` / 100
	 */
	private updateBar()
	{
		// calculate
		let value = this.value / 100;
		value = Phaser.Math.Clamp(value, 0, 1);
		let width = this.barOutline.width * value;

		this.barFill.setSize(width, this.barFill.height);
	}

	/**
	 * Setup Bar size to property value.
	*/
	private setBarSize()
	{
		this.barOutline.setSize(this.barWidth, this.barOutline.height);

		// this.barFill.setSize(this.barWidth, this.barFill.height);
	}

	/**
	 * Sets bar position to be spaced beside text.
	 */
	SetBarX()
	{
		this.barFill.setX(this.text.width + 20);
		this.barOutline.setX(this.text.width + 20);
	}

	/**
	 * Setup colour of the text and bar to the colour property values.
	 */
	private setColour()
	{
		// text
		this.text.setColor(this.fillColour);
		this.text.setStroke(this.outlineColour, 4);

		// colour code string to int
		const fillColour = '0x' + this.fillColour.slice(1, 7) as unknown as number;
		// const outlineColour = '0x' + this.outlineColour.slice(1, 7) as unknown as number;

		// shapes
		this.barFill.fillColor = fillColour;
		this.barOutline.strokeColor = fillColour;

		// At some point I may want to set the colour to something different during the game. I could have colour params and default to the properties if null.
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
