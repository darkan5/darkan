var AnimationItemCollection = Backbone.Collection.extend({
    model: AnimationItemModel
});

window._layout.animations = {
	animIn: {
		flip: [
			{
				name: _lang('ANIMATION_flipInX'),
				value: 'flipInX'
			},
			{
				name: _lang('ANIMATION_flipInY'),
				value: 'flipInY'
			},
			{
				name: _lang('ANIMATION_pullUp'),
				value: 'pullUp'
			},
			{
				name: _lang('ANIMATION_pullDown'),
				value: 'pullDown'
			},
		],

		fade: [
			{
				name: _lang('ANIMATION_fadeInOpacityOnly'),
				value: 'fadeInOpacityOnly'
			},
			{
				name: _lang('ANIMATION_fadeIn'),
				value: 'fadeIn'
			},
			{
				name: _lang('ANIMATION_fadeInUp'),
				value: 'fadeInUp'
			},
			{
				name: _lang('ANIMATION_fadeInDown'),
				value: 'fadeInDown'
			},
			{
				name: _lang('ANIMATION_fadeInLeft'),
				value: 'fadeInLeft'
			},
			{
				name: _lang('ANIMATION_fadeInRight'),
				value: 'fadeInRight'
			},
			{
				name: _lang('ANIMATION_fadeInUpBig'),
				value: 'fadeInUpBig'
			},
			{
				name: _lang('ANIMATION_fadeInDownBig'),
				value: 'fadeInDownBig'
			},
			{
				name: _lang('ANIMATION_fadeInLeftBig'),
				value: 'fadeInLeftBig'
			},
			{
				name: _lang('ANIMATION_fadeInRightBig'),
				value: 'fadeInRightBig'
			},
		],

		bounce: [
			{
				name: _lang('ANIMATION_bounce'),
				value: 'bounce'
			},
			{
				name: _lang('ANIMATION_bounceInDown'),
				value: 'bounceInDown'
			},
			{
				name: _lang('ANIMATION_bounceInUp'),
				value: 'bounceInUp'
			},
			{
				name: _lang('ANIMATION_bounceInLeft'),
				value: 'bounceInLeft'
			},
			{
				name: _lang('ANIMATION_bounceInRight'),
				value: 'bounceInRight'
			},
		],

		rotate: [
			{
				name: _lang('ANIMATION_rotateIn'),
				value: 'rotateIn'
			},
			{
				name: _lang('ANIMATION_rotateInDownLeft'),
				value: 'rotateInDownLeft'
			},
			{
				name: _lang('ANIMATION_rotateInDownRight'),
				value: 'rotateInDownRight'
			},
			{
				name: _lang('ANIMATION_rotateInUpLeft'),
				value: 'rotateInUpLeft'
			},
			{
				name: _lang('ANIMATION_rotateInUpRight'),
				value: 'rotateInUpRight'
			},
			{
				name: _lang('ANIMATION_lightSpeedIn'),
				value: 'lightSpeedIn'
			},
			{
				name: _lang('ANIMATION_rollIn'),
				value: 'rollIn'
			}
		],

		door: [
			{
				name: _lang('ANIMATION_doorLeftPushIn'),
				value: 'doorLeftPushIn'
			},
			{
				name: _lang('ANIMATION_doorLeftPullIn'),
				value: 'doorLeftPullIn'
			},
			{
				name: _lang('ANIMATION_doorRightPushIn'),
				value: 'doorRightPushIn'
			},
			{
				name: _lang('ANIMATION_doorRightPullIn'),
				value: 'doorRightPullIn'
			},
			{
				name: _lang('ANIMATION_doorUpPushIn'),
				value: 'doorUpPushIn'
			},
			{
				name: _lang('ANIMATION_doorUpPullIn'),
				value: 'doorUpPullIn'
			},
			{
				name: _lang('ANIMATION_doorDownPushIn'),
				value: 'doorDownPushIn'
			},
			{
				name: _lang('ANIMATION_doorDownPullIn'),
				value: 'doorDownPullIn'
			},
			{
				name: _lang('ANIMATION_doorLeftPushBounceIn'),
				value: 'doorLeftPushBounceIn'
			},
			{
				name: _lang('ANIMATION_doorLeftPullBounceIn'),
				value: 'doorLeftPullBounceIn'
			},
			{
				name: _lang('ANIMATION_doorRightPushBounceIn'),
				value: 'doorRightPushBounceIn'
			},
			{
				name: _lang('ANIMATION_doorRightPullBounceIn'),
				value: 'doorRightPullBounceIn'
			},
			{
				name: _lang('ANIMATION_doorUpPushBounceIn'),
				value: 'doorUpPushBounceIn'
			},
			{
				name: _lang('ANIMATION_doorUpPullBounceIn'),
				value: 'doorUpPullBounceIn'
			},
			{
				name: _lang('ANIMATION_doorDownPushBounceIn'),
				value: 'doorDownPushBounceIn'
			},
			{
				name: _lang('ANIMATION_doorDownPullBounceIn'),
				value: 'doorDownPullBounceIn'
			}
		],

		etc: [
			{
				name: _lang('ANIMATION_stretchLeft'),
				value: 'stretchLeft'
			},
			{
				name: _lang('ANIMATION_stretchRight'),
				value: 'stretchRight'
			},
			{
				name: _lang('ANIMATION_slideExpandUp'),
				value: 'slideExpandUp'
			},
			{
				name: _lang('ANIMATION_expandUp'),
				value: 'expandUp'
			},
			{
				name: _lang('ANIMATION_expandOpen'),
				value: 'expandOpen'
			},
			{
				name: _lang('ANIMATION_bigEntrance'),
				value: 'bigEntrance'
			},
			{
				name: _lang('ANIMATION_hatch'),
				value: 'hatch'
			}
		]

	},

	animOut: {

		fade: [
			{
				name: _lang('ANIMATION_fadeOut'),
				value: 'fadeOut'
			},
			{
				name: _lang('ANIMATION_fadeOutUp'),
				value: 'fadeOutUp'
			},
			{
				name: _lang('ANIMATION_fadeOutDown'),
				value: 'fadeOutDown'
			},
			{
				name: _lang('ANIMATION_fadeOutLeft'),
				value: 'fadeOutLeft'
			},
			{
				name: _lang('ANIMATION_fadeOutRight'),
				value: 'fadeOutRight'
			},
			{
				name: _lang('ANIMATION_fadeOutUpBig'),
				value: 'fadeOutUpBig'
			},
			{
				name: _lang('ANIMATION_fadeOutDownBig'),
				value: 'fadeOutDownBig'
			},
			{
				name: _lang('ANIMATION_fadeOutLeftBig'),
				value: 'fadeOutLeftBig'
			},
			{
				name: _lang('ANIMATION_fadeOutRightBig'),
				value: 'fadeOutRightBig'
			}
		],

		bounce: [
			{
				name: _lang('ANIMATION_bounceOut'),
				value: 'bounceOut'
			},
			{
				name: _lang('ANIMATION_bounceOutDown'),
				value: 'bounceOutDown'
			},
			{
				name: _lang('ANIMATION_bounceOutUp'),
				value: 'bounceOutUp'
			},
			{
				name: _lang('ANIMATION_bounceOutLeft'),
				value: 'bounceOutLeft'
			},
			{
				name: _lang('ANIMATION_bounceOutRight'),
				value: 'bounceOutRight'
			}
		],

		rotate: [
			{
				name: _lang('ANIMATION_rotateOut'),
				value: 'rotateOut'
			},
			{
				name: _lang('ANIMATION_rotateOutDownLeft'),
				value: 'rotateOutDownLeft'
			},
			{
				name: _lang('ANIMATION_rotateOutDownRight'),
				value: 'rotateOutDownRight'
			},
			{
				name: _lang('ANIMATION_rotateOutUpLeft'),
				value: 'rotateOutUpLeft'
			},
			{
				name: _lang('ANIMATION_rotateOutUpRight'),
				value: 'rotateOutUpRight'
			}
		],

		door: [
			{
				name: _lang('ANIMATION_doorLeftPushOut'),
				value: 'doorLeftPushOut'
			},
			{
				name: _lang('ANIMATION_doorLeftPullOut'),
				value: 'doorLeftPullOut'
			},
			{
				name: _lang('ANIMATION_doorRightPushOut'),
				value: 'doorRightPushOut'
			},
			{
				name: _lang('ANIMATION_doorRightPullOut'),
				value: 'doorRightPullOut'
			},
			{
				name: _lang('ANIMATION_doorUpPushOut'),
				value: 'doorUpPushOut'
			},
			{
				name: _lang('ANIMATION_doorUpPullOut'),
				value: 'doorUpPullOut'
			},
			{
				name: _lang('ANIMATION_doorDownPushOut'),
				value: 'doorDownPushOut'
			},
			{
				name: _lang('ANIMATION_doorDownPullOut'),
				value: 'doorDownPullOut'
			},
			{
				name: _lang('ANIMATION_doorLeftPushBounceOut'),
				value: 'doorLeftPushBounceOut'
			},
			{
				name: _lang('ANIMATION_doorLeftPullBounceOut'),
				value: 'doorLeftPullBounceOut'
			},
			{
				name: _lang('ANIMATION_doorRightPushBounceOut'),
				value: 'doorRightPushBounceOut'
			},
			{
				name: _lang('ANIMATION_doorRightPullBounceOut'),
				value: 'doorRightPullBounceOut'
			},
			{
				name: _lang('ANIMATION_doorUpPushBounceOut'),
				value: 'doorUpPushBounceOut'
			},
			{
				name: _lang('ANIMATION_doorUpPullBounceOut'),
				value: 'doorUpPullBounceOut'
			},
			{
				name: _lang('ANIMATION_doorDownPushBounceOut'),
				value: 'doorDownPushBounceOut'
			},
			{
				name: _lang('ANIMATION_doorDownPullBounceOut'),
				value: 'doorDownPullBounceOut'
			}
		],

		etc: [
			{
				name: _lang('ANIMATION_lightSpeedOut'),
				value: 'lightSpeedOut'
			},
			{
				name: _lang('ANIMATION_rollOut'),
				value: 'rollOut'
			},
			{
				name: _lang('ANIMATION_hinge'),
				value: 'hinge'
			}
		]
	},

	animOver: {
		etc: [
			// {
			// 	name: _lang('ANIMATION_flash'),
			// 	value: 'flash'
			// },
			// {
			// 	name: _lang('ANIMATION_bounce'),
			// 	value: 'bounce'
			// },
			// {
			// 	name: _lang('ANIMATION_shake'),
			// 	value: 'shake'
			// },
			// {
			// 	name: _lang('ANIMATION_tada'),
			// 	value: 'tada'
			// },
			// {
			// 	name: _lang('ANIMATION_swing'),
			// 	value: 'swing'
			// },
			// {
			// 	name: _lang('ANIMATION_pulse'),
			// 	value: 'pulse'
			// },
			// {
			// 	name: _lang('ANIMATION_grow'),
			// 	value: 'grow'
			// },
			// {
			// 	name: _lang('ANIMATION_shrink'),
			// 	value: 'shrink'
			// },
			// {
			// 	name: _lang('ANIMATION_skew'),
			// 	value: 'skew'
			// },
			{
				name: _lang('ANIMATION_pulse-grow'),
				value: 'pulse-grow'
			},
			{
				name: _lang('ANIMATION_pulse-shrink'),
				value: 'pulse-shrink'
			},
			{
				name: _lang('ANIMATION_push'),
				value: 'push'
			},
			{
				name: _lang('ANIMATION_pop'),
				value: 'pop'
			},
			{
				name: _lang('ANIMATION_rotate'),
				value: 'rotate'
			},
			{
				name: _lang('ANIMATION_float'),
				value: 'float'
			},
			{
				name: _lang('ANIMATION_sink'),
				value: 'sink'
			},
			{
				name: _lang('ANIMATION_hover'),
				value: 'hover'
			},
			{
				name: _lang('ANIMATION_hang'),
				value: 'hang'
			},
			{
				name: _lang('ANIMATION_wobble-vertical'),
				value: 'wobble-vertical'
			},
			{
				name: _lang('ANIMATION_wobble-horizontal'),
				value: 'wobble-horizontal'
			},
			{
				name: _lang('ANIMATION_wobble-top'),
				value: 'wobble-top'
			},
			{
				name: _lang('ANIMATION_wobble-bottom'),
				value: 'wobble-bottom'
			}
		],

		// border: [
		// 	{
		// 		name: _lang('ANIMATION_border-fade'),
		// 		value: 'border-fade'
		// 	},
		// 	{
		// 		name: _lang('ANIMATION_hollow'),
		// 		value: 'hollow'
		// 	},
		// 	{
		// 		name: _lang('ANIMATION_round-corners'),
		// 		value: 'round-corners'
		// 	}
		// ],

		shadow: [
			{
				name: _lang('ANIMATION_glow'),
				value: 'glow'
			},
			{
				name: _lang('ANIMATION_box-shadow-outset'),
				value: 'box-shadow-outset'
			},
			// {
			// 	name: _lang('ANIMATION_box-shadow-inset'),
			// 	value: 'box-shadow-inset'
			// },
			{
				name: _lang('ANIMATION_float-shadow'),
				value: 'float-shadow'
			},
			{
				name: _lang('ANIMATION_hover-shadow'),
				value: 'hover-shadow'
			},
			{
				name: _lang('ANIMATION_shadow-radial'),
				value: 'shadow-radial'
			}
		],

		curl: [
			{
				name: _lang('ANIMATION_curl-top-left'),
				value: 'curl-top-left'
			},
			{
				name: _lang('ANIMATION_curl-top-right'),
				value: 'curl-top-right'
			},
			{
				name: _lang('ANIMATION_curl-bottom-right'),
				value: 'curl-bottom-right'
			},
			{
				name: _lang('ANIMATION_curl-bottom-left'),
				value: 'curl-bottom-left'
			}
		],

		bubble: [
			{
				name: _lang('ANIMATION_bubble-left'),
				value: 'bubble-left'
			},
			{
				name: _lang('ANIMATION_bubble-top'),
				value: 'bubble-top'
			},
			{
				name: _lang('ANIMATION_bubble-right'),
				value: 'bubble-right'
			},
			{
				name: _lang('ANIMATION_bubble-bottom'),
				value: 'bubble-bottom'
			},
			{
				name: _lang('ANIMATION_bubble-float-top'),
				value: 'bubble-float-top'
			},
			{
				name: _lang('ANIMATION_bubble-float-right'),
				value: 'bubble-float-right'
			},
			{
				name: _lang('ANIMATION_bubble-float-bottom'),
				value: 'bubble-float-bottom'
			},
			{
				name: _lang('ANIMATION_bubble-float-left'),
				value: 'bubble-float-left'
			}
		]
	},

	animEndless: {
		endless: [
			{
				name: _lang('ANIMATION_pulse'),
				value: 'pulse'
			},
			{
				name: _lang('ANIMATION_floating'),
				value: 'floating'
			},
			{
				name: _lang('ANIMATION_tossing'),
				value: 'tossing'
			},
			{
				name: _lang('ANIMATION_bounce-endless'),
				value: 'bounce-endless'
			},
			{
				name: _lang('ANIMATION_flash-endless'),
				value: 'flash-endless'
			},
			{
				name: _lang('ANIMATION_shake-endless'),
				value: 'shake-endless'
			},
			{
				name: _lang('ANIMATION_swing-endless'),
				value: 'swing-endless'
			},
			{
				name: _lang('ANIMATION_tada-endless'),
				value: 'tada-endless'
			},
			{
				name: _lang('ANIMATION_wobble-endless'),
				value: 'wobble-endless'
			}
		]
	}
}