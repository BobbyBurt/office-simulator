const fragShader = `
#define SHADER_NAME COOL

precision mediump float;

uniform float     uTime;
uniform sampler2D uMainSampler;
uniform vec2 gameResolution;
varying vec2 outTexCoord;

void main( void )
{
    vec2 uv = outTexCoord;
	uv.x += (sin(((uv.x - 3.14) + (1.0 * 0.5)) * 10.0) * 0.1);
	vec4 texColor = texture2D(uMainSampler, uv);
	gl_FragColor = texColor;
}
`;

export default class PostFX extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline
{
    constructor (game)
    {
        super({
            game,
            renderTarget: true,
            fragShader,
            uniforms: [
                'uProjectionMatrix',
                'uMainSampler',
                'uTime',
                'gameResolution'
            ]
        });
        this._time = 0;
    }
    
    onBoot()
    {
        this.set2i('gameResolution', this.game.scale.width, this.game.scale.height);
    }

    onPreRender ()
    {
        this._time += 0.005;
        this.set1f('uTime', this._time);
    }
}
