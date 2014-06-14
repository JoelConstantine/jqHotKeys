// jqHotKeys is a jQuery module to trigger window keyup
// events. This was for a high level controller module,
// to prevent individual controllers from having to
// register each keyup event.
// There are four public API methods
// initModule - Initialize the module and sets it to listen
//	 for keypress events on the window
// registerTriggers - accepts a JSON object detailing the
// 		keycode to press, plus whether shift and/or ctrl
//		should be pressed.
// pause - pauses the module
// resume - resumes listening for events
// ----------
// When register triggers, requires a JSON object formatted as
// such:
// 		keycode - numerical key representing key pressed in jquery
//				event object
//		element - ID or class of the element to trigger the event on
//				if this key is null, will trigger on window.
//    trigger - Name of the jQuery event to trigger.
//    data - Optional data to pass into the triggered event
//		shift - Boolean indicating whether shift must be pressed
// 		ctrl - Boolean indicating whether ctrl must be pressed
// 		meta - Boolean indicating whether Alt or Command must be pressed

jqHotKeys = (function() {
	'use strict'
	var
		stateMap = {
			trigger_list : {},
			running			 : false
		},
		pause, resume,
		registerTriggers, initModule;

		// ========================== BEGIN EVENT METHODS ====================
		onKeyPress = function( event ) {
			var use_trigger, use_element;

			if ( stateMap.running ) {
				use_trigger = stateMap.trigger_list[ event.keyCode ];

				if ( use_trigger && 
						 use_trigger.shift === event.shiftKey &&
						 use_trigger.ctrl === event.ctrlKey &&
						 use_trigger.meta === event.metaKey ) {
					use_element = use_trigger.element ? use_trigger.element : 'window';

					$( use_element ).trigger( use_trigger.trigger, use_trigger.data );
				}
			}
		};
		// ============================ END EVENT METHODS ====================

		// =========================== BEGIN PUBLIC METHODS =====================
		// Begin public method pause
		pause = function() {
			stateMap.running = false;
		};
		// End public method pause

		// Begin public method resume
		resume = function() {
			stateMap.running = true;
		};
		// End public method resume

		// Begin public method registerTriggers
		registerTriggers = function( trigger_list ) {
			for ( trigger in trigger_list ) {
				stateMap.trigger_list[ trigger ] = trigger_list[ trigger ];
			}
		};
		// End public method registerTriggers

		// Begin public method initModule
		initModule = function() {
			stateMap.running = true;
			$(window).on({
				keyup: onKeyUp
			});
		};
		// End public method initModule
		// ============================ END PUBLIC METHODS ======================

		return {
			initModule			 : initModule,
			registerTriggers : registerTriggers,
			pause 					 : pause,
			resume 					 : resume
		};
}());