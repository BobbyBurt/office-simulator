
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import OfficeScene from "~/scenes/OfficeScene";
import UIScene from "~/scenes/UIScene";
/* END-USER-IMPORTS */

export default class AnnoyingGuyPrefab extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "annoying guy", frame);

		this.setOrigin(0, 0);

		/* START-USER-CTR-CODE */
		
		this.startSequence();

		this.setInteractive();
		this.scene.input.on('pointerdown', this.pointerDownHandler, this);

		this.talkingSound = this.scene.sound.add
			('annoying-guy-talking', { loop: true });
		this.talkingSound.play();
		this.talkingSound.pause();

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	private tweenSequence: Phaser.Tweens.TweenChain;

	private appearDelay = 10000;
	private talkingTime = 10000;
	private upsetTime = 10000;

	private talkingSound: Phaser.Sound.BaseSound;

	startSequence()
	{
		// appear
		this.setAlpha(0);
		this.setTint(0xffffff);
		this.tweenSequence = this.scene.tweens.chain
		({
			targets: this,
			tweens: [
				{
					delay: this.appearDelay,
					duration: 1000,
					alpha: 1,
					onComplete: () =>
					{
						this.talkingSound.resume();
					}
				},
				{
					delay: this.talkingTime,
					duration: this.upsetTime,
					tint: 0xff0000,
					onComplete: this.timeUp,
					callbackScope: this
					
				},
			]
		});
	}

	timeUp()
	{
		let uiScene = this.scene.scene.get('ui-scene') as UIScene;

		uiScene.setGameOverText(true, `You have rudely ignored your coworker!`);
	}

	pointerDownHandler(event: any)
	{	
		// LEFT OFF: I can't figure out how to check that the reticle & image are overlapping
		let imageRect = new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
		let cameraCenter = new Phaser.Geom.Point
		(
			this.scene.cameras.main.scrollX + this.scene.cameras.main.width / 2, 
			(this.scene.cameras.main.scrollY + this.scene.cameras.main.height / 2)
		);
		
		if (Phaser.Geom.Rectangle.ContainsPoint(imageRect, cameraCenter))
		// if (true)
		{
			// reticle is in this image

			console.debug('asdf');

			this.tweenSequence.stop();
	
			this.appearDelay -= Phaser.Math.RND.integerInRange(100, 700);
			this.talkingTime -= Phaser.Math.RND.integerInRange(100, 700);
			this.upsetTime -= Phaser.Math.RND.integerInRange(100, 700);
	
			this.startSequence();

			this.talkingSound.pause();
		}
		
	}

	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
