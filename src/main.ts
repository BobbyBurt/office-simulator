import cloudSaves from './API/SavesData';
import medalScene from './API/medalScene';
import { newgroundsIOWrapper } from './API/newgroundsIOWrapper';
import ComputerScene from './scenes/ComputerScene';
import GameboyScene from './scenes/GameboyScene';
import OfficeScene from './scenes/OfficeScene';
import Preload from './scenes/Preload';
import PostFX from './FX/PostFX.js';
import UIScene from './scenes/UIScene';


window.addEventListener('load', function ()
{
	var game = new Phaser.Game( 
	{
		title: 'Office Simulator',
		version: '0',
		
	// visuals
		type: Phaser.AUTO,
		backgroundColor: "#333333",
		input: {
			gamepad: true
		},
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: 960,
			height: 540
		},
		// fps: {
		// 	target: 15,
		// 	forceSetTimeOut: true
		// 	}
		// pipeline: { PostFX }
	});
	
	game.scene.add("Preload", Preload);
	game.scene.add("Boot", Boot, true);
	game.scene.add('medal-scene', medalScene);
	game.scene.add('office-scene', OfficeScene);
	game.scene.add('computer-scene', ComputerScene);
	game.scene.add('gameboy-scene', GameboyScene);
	game.scene.add('ui-scene', UIScene);
});

class Boot extends Phaser.Scene
{
	private ngWrap: newgroundsIOWrapper;

	/**
	 * load preload assets, then the scene
	 */
	preload()
	{
		this.load.pack("pack", "assets/preload-asset-pack.json");
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}

	create()
	{
		// NG.io event callbacks
		this.game.events.once(Phaser.Core.Events.STEP, () => 
		{
			this.ngWrap = new newgroundsIOWrapper();
			this.ngWrap.start();
		});
		this.game.events.on(Phaser.Core.Events.STEP, () => 
		{
			NGIO.keepSessionAlive();
			if (NGIO.isInitialized)
			{
				this.ngWrap.update(this.game);
			}
		});
		
		// this.setSaveDataKeys();
		/*  */
	}

	/**
	 * Sets registry data keys that will be included in the save file.
	 */
	setSaveDataKeys()
	{
		let dataKeys = new Array<string>();
	
		dataKeys.push('keys-for-data-that-should-be-saved');

		cloudSaves.setDataKeys(dataKeys);
	}
}