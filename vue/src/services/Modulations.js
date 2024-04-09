import Notes from '@/services/Notes.js'
import Scales from '@/services/Scales.js'

var MinorModifiers = ['','-','+','+','','+','+']
var MajorModifiers = ['','-','-','+','','-','-']

var diatonicMod_Major_To_Major = [
		{
		to: '2', 
		data: [
			]
		}, 
		{to: '4', data: []}, 
		{to: '5', data: []}, 
		{
		to: '7-', 
		data: [
			
			]
		}
	]

var chromaticMod_Major_To_Major = [
		{
		to: '2-', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}]
			]
		},
		{
		to: '2', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'Dp'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'S'}, {scale: 1, chord: 'T'}, {scale: 2, chord: 'Tp'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'D'}, {scale: 1, chord: 'T'}, {scale: 2, chord: 'Tp'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'Tp'}, {scale: 2, chord: 'T'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'Tp'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'Tp'}, {scale: 2, chord: 'Dp'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'Sp'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'Sp'}, {scale: 2, chord: 'Dp'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'D'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 2, chord: 'D'}, {scale: 2, chord: 'S'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 2, chord: 'Dp'}, {scale: 2, chord: 'T'}, {scale:2, chord: 'T'}]
			]
		}, 
		{
		to: '3-', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}]
			]
		},
		{
		to: '3', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 2, chord: 'S'}],
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}]
			]
		},
		{to: '4', data: [[{scale: 1, chord: 'T'}, {scale: 1, chord: 'D'}, {scale: 2, chord: 'S'}, {scale:2, chord: 'T'}]]}, 
		{
		to: '4+', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}]
			]
		},
		{to: '5', data: [[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}]]}, 
		{
		to: '6', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}]
			]
		},
		{
		to: '6-', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'D'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}],
			]
		},
		{
		to: '7-', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'Dp'}, {scale: 2, chord: 'S'}, {scale:2, chord: 'T'}],
			[{scale: 1, chord: 'T'}, {scale: 2, chord: 'S'}, {scale: 2, chord: 'Dp'}, {scale:2, chord: 'T'}]
			]
		},
		{
		to: '7', 
		data: [
			[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 2, chord: 'D'}, {scale:2, chord: 'T'}]
			]
		}
	]

var chromaticMod_Major_To_Minor = [
		{
			to: '2-',
			data: [
				[{scale: 1, chord: 'T'}, {scale: 1, chord: 'T'}, {scale:2, chord: 't'}, {scale:2, chord: 't'}],
				[{scale: 1, chord: 'T'}, {scale: 1, chord: 'D'}, {scale:2, chord: 't'}, {scale:2, chord: 'd'}, {scale:2, chord: 'sP'}, {scale:2, chord: 't'}],
				[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale:2, chord: 't'}, {scale:2, chord: 's'}, {scale:2, chord: 't'}, {scale:2, chord: 't'}]
			]
		},
		{
			to: '3-',
			data: [
				[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 1, chord: 'D'}, {scale:1, chord: 'T'}, {scale:2, chord: 't'}, {scale:2, chord: 't'}]
			]
		},
		{
			to: '3',
			data: [
				[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 1, chord: 'D'}, {scale: 1, chord: 'T'}, {scale:2, chord: 'd'}, {scale:2, chord: 't'}],
			]
		},
		{
			to: '4+',
			data: [
				[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'},  {scale:2, chord: 't'}, {scale:2, chord: 't'}, {scale:2, chord: 's'}, {scale:2, chord: 'd'}, {scale:2, chord: 't'}, {scale:2, chord: 't'},]
				
			]
		},
		{
			to: '6-',
			data: [
				[{scale: 1, chord: 'T'}, {scale: 1, chord: 'D'},  {scale:2, chord: 't'}, {scale:2, chord: 't'}, {scale:2, chord: 's'}, {scale:2, chord: 'd'}, {scale:2, chord: 't'}, {scale:2, chord: 't'},]
			]
		},
		{
			to: '7',
			data: [
				[{scale: 1, chord: 'T'}, {scale: 1, chord: 'S'}, {scale: 1, chord: 'D'}, {scale:2, chord: 't'}, {scale:2, chord: 's'}, {scale:2, chord: 't'}]
			]
		}
	]

var diatonicMod_Minor_To_Minor = [
		{
			to: '2',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 'sP'}, {scale: 1, chord: 'dP'}, {scale: 2, chord: 't'}, {scale: 2, chord: 't'}],
			]
		},
		{
			to: '4',
			data: [
			]
		}

	]

var chromaticMod_Minor_To_Minor = [
		{
			to: '2-',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 's'}, {scale: 2, chord: 'd'}, {scale: 2, chord: 't'}],
				[{scale: 1, chord: 't'}, {scale: 1, chord: 'd'}, {scale: 2, chord: 'd'}, {scale: 2, chord: 't'}],
				[{scale: 1, chord: 't'}, {scale: 1, chord: 'dP'}, {scale: 2, chord: 'tP'}, {scale: 2, chord: 't'}],
			]
		},
		{
			to: '2',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 's'}, {scale: 2, chord: 'd'}, {scale: 2, chord: 't'}],
				[{scale: 1, chord: 't'}, {scale: 1, chord: 's'}, {scale: 2, chord: 'd'}, {scale: 2, chord: 'tP'}, {scale: 2, chord: 't'}]
			]
		},
		{
			to: '3',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 's'}, {scale: 2, chord: 'd'}, {scale: 2, chord: 't'}],
				[{scale: 1, chord: 't'}, {scale: 1, chord: 'd'}, {scale: 2, chord: 'd'}, {scale: 2, chord: 'tP'}]
			]
		},
		{
			to: '3+',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 't'}, {scale: 2, chord: 't'}, {scale: 2, chord: 't'}],
			]
		},
		{
			to: '4',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 'd'}, {scale: 1, chord: 't'}, {scale: 2, chord: 'sP'}, {scale: 2, chord: 't'}]
			]
		},
		{
			to: '6',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 't'}, {scale: 2, chord: 't'}, {scale: 2, chord: 't'}]
			]
		},
		{
			to: '6+',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 'sP'}, {scale: 2, chord: 't'}, {scale: 2, chord: 't'}],
				[{scale: 1, chord: 't'}, {scale: 1, chord: 'tP'}, {scale: 2, chord: 't'}, {scale: 2, chord: 't'}],
			]
		},
		{
			to: '7',
			data: [
				[{scale: 1, chord: 't'}, {scale: 1, chord: 'd'}, {scale: 2, chord: 't'}, {scale: 2, chord: 't'}]
			]
		}
	]

var MODULATION_TYPES = [
	{name: 'Random Minor', target_scale_type: 'Minor'},
	{name: 'Random Major', target_scale_type: 'Major'},
	{name: 'Chromatic', data:[
		{name: 'Major-to-Major', source_scale_type: 'Major', target_scale_type: 'Major', data: chromaticMod_Major_To_Major},
		{name: 'Major-to-Minor', source_scale_type: 'Major', target_scale_type: 'Minor', data: chromaticMod_Major_To_Minor},
		{name: 'Minor-to-Minor', source_scale_type: 'Minor', target_scale_type: 'Minor', data: chromaticMod_Minor_To_Minor}
	]},
	{name: 'Diatonic', data:[
		{name: 'Major-to-Major', source_scale_type: 'Major', target_scale_type: 'Major', data: diatonicMod_Major_To_Major},
		{name: 'Minor-to-Minor', source_scale_type: 'Minor', target_scale_type: 'Minor', data: diatonicMod_Minor_To_Minor}
	]}
	]

export default {
	MODULATION_TYPES() {
		return MODULATION_TYPES
	},
	GenerateRandom(source_scale_type, target_scale_type) {
		var source_functions = source_scale_type == 'Minor' ? Scales.MinorFunctions() : Scales.MajorFunctions()
		var target_functions = target_scale_type == 'Minor' ? Scales.MinorFunctions() : Scales.MajorFunctions()
		var modifiers = target_scale_type == 'Minor' ? MinorModifiers : MajorModifiers

		var to_degree = Math.round(Math.random() * 7 + 1)
		var to = Math.round(Math.random()) == 0 ? to_degree + '' : to_degree + modifiers[to_degree]

		var modulation_data = [{scale: 1, chord: source_functions[0]}]

		var nextScale = 1
		var firstScaleCount = 1
		for(var i = 0; i < 6; i++) {
			var functions = nextScale == 1 ? source_functions : target_functions

			var nextFunction = functions[Math.round(Math.random() * 6)]
			while(_.map(modulation_data, (data) => data.scale + '-' + data.chord).indexOf((nextScale + '-' + nextFunction)) != -1) {
				nextFunction = functions[Math.round(Math.random() * 6)]
			}
			
			modulation_data.push({scale: nextScale, chord: nextFunction})

			if(nextScale == 1) {
				firstScaleCount++
			}

			if(firstScaleCount < 4) {
				nextScale = 1
			} 
			// else if(nextScale == 1 && i < 7) {
			// 	nextScale = Math.round(Math.random() + 1)
			// }
			 else {
				nextScale = 2
			}
		}

		modulation_data.push({scale: 2, chord: functions[0]})
		
		return {to: to, target_scale_type: target_scale_type, data: modulation_data}
	},
	Modulate(modulation, source_scale, target_scale) {
		var cadance_data = []
        var source_notes = source_scale.type == 'sharp' ? Notes.notes_sharp : Notes.notes_flat
        var source_midiValues = source_scale.type == 'sharp' ? Notes.midiValues_sharp : Notes.midiValues_flat
        var target_notes = target_scale.type == 'sharp' ? Notes.notes_sharp : Notes.notes_flat
        var target_midiValues = target_scale.type == 'sharp' ? Notes.midiValues_sharp : Notes.midiValues_flat
        var source_functions = source_scale.scale_type == 'Minor' ? Scales.MinorFunctions() : Scales.MajorFunctions()
        var target_functions = target_scale.scale_type == 'Minor' ? Scales.MinorFunctions() : Scales.MajorFunctions()
        var prev_scale = source_scale
        // first form source scale chords
        for(var i in modulation) {
        	if(modulation[i].scale != 1) {
        		break
        	}

        	var index = source_functions.indexOf(modulation[i].chord)
        	var chord = Scales.Chord(source_scale.data[index], source_notes, source_midiValues, source_scale, source_scale.scale_type, cadance_data[cadance_data.length - 1], prev_scale)
        	cadance_data.push(chord)
        }

        // form target scale chords
        for(var i = i; i < modulation.length; i++) {
        	var index = target_functions.indexOf(modulation[i].chord)
        	var chord = Scales.Chord(target_scale.data[index], target_notes, target_midiValues, target_scale, target_scale.scale_type, cadance_data[cadance_data.length - 1], prev_scale)
        	cadance_data.push(chord)
        	prev_scale = target_scale
        }

        return cadance_data
	}
}