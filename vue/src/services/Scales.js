import Notes from '@/services/Notes.js'

var minor_scales_data = []
var major_scales_data = []

var None = {name: 'None', data: []}
var C_Major = {name: 'C Major', type: 'sharp', scale_type: 'Major', data: ['C', 'D', 'E', 'F', 'G', 'A', 'B']}
var Db_Major = {name: 'Db Major', sec_name: 'Cs Major', type: 'flat', scale_type: 'Major', data: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']}
var D_Major = {name: 'D Major', type: 'sharp', scale_type: 'Major', data: ['D', 'E', 'Fs', 'G', 'A', 'B', 'Cs']}
var Eb_Major = {name: 'Eb Major', sec_name: 'Ds Major', type: 'flat', scale_type: 'Major', data: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']}
var E_Major = {name: 'E Major', type: 'sharp', scale_type: 'Major', data: ['E', 'Fs', 'Gs', 'A', 'B', 'Cs', 'Ds']}
var F_Major = {name: 'F Major', type: 'flat', scale_type: 'Major', data: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']}
var Fs_Major = {name: 'Fs Major', sec_name: 'Gb Major', type: 'sharp', scale_type: 'Major', data: ['Fs', 'Gs', 'As', 'B', 'Cs', 'Ds', 'Es']}
var G_Major = {name: 'G Major', type: 'sharp', scale_type: 'Major', data: ['G', 'A', 'B', 'C', 'D', 'E', 'Fs']}
var Ab_Major = {name: 'Ab Major', sec_name: 'Gs Major', type: 'flat', scale_type: 'Major', data: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G']}
var A_Major = {name: 'A Major', type: 'sharp', scale_type: 'Major', data: ['A', 'B', 'Cs', 'D', 'E', 'Fs', 'Gs']}
var Bb_Major = {name: 'Bb Major', sec_name: 'As Major', type: 'flat', scale_type: 'Major', data: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A']}
var B_Major = {name: 'B Major', type: 'sharp', scale_type: 'Major', data: ['B', 'Cs', 'Ds', 'E', 'Fs', 'Gs', 'As']}

var A_Minor = {name: 'A Minor', type: 'sharp', scale_type: 'Minor', data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']}
var Bb_Minor = {name: 'Bb Minor', sec_name: 'As Minor', type: 'flat', scale_type: 'Minor', data: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab']}
var B_Minor = {name: 'B Minor', type: 'sharp', scale_type: 'Minor', data: ['B', 'Cs', 'D', 'E', 'Fs', 'G', 'A', ]}
var C_Minor = {name: 'C Minor', type: 'flat', scale_type: 'Minor', data: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']}
var Cs_Minor = {name: 'Cs Minor', sec_name: 'Db Minor', type: 'sharp', scale_type: 'Minor', data: ['Cs', 'Ds', 'E', 'Fs', 'Gs', 'A', 'B']}
var D_Minor = {name: 'D Minor', type: 'flat', scale_type: 'Minor', data: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C']}
var Ds_Minor = {name: 'Ds Minor', sec_name: 'Eb Minor', type: 'sharp', scale_type: 'Minor', data: ['Ds', 'Es', 'Fs', 'Gs', 'As', 'B', 'Cs']}
var E_Minor = {name: 'E Minor', type: 'sharp', scale_type: 'Minor', data: ['E', 'Fs', 'G', 'A', 'B', 'C', 'D']}
var F_Minor = {name: 'F Minor', type: 'flat', scale_type: 'Minor', data: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb']}
var Fs_Minor = {name: 'Fs Minor', sec_name: 'Gb Minor', type: 'sharp', scale_type: 'Minor', data: ['Fs', 'Gs', 'A', 'B', 'Cs', 'D', 'E']}
var G_Minor = {name: 'G Minor', type: 'flat', scale_type: 'Minor', data: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F']}
var Gs_Minor = {name: 'Gs Minor', sec_name: 'Ab Minor', type: 'sharp', scale_type: 'Minor', data: ['Gs', 'As', 'B', 'Cs', 'Ds', 'E', 'Fs']}

major_scales_data.push(None)
major_scales_data.push(C_Major)
major_scales_data.push(Db_Major)
major_scales_data.push(D_Major)
major_scales_data.push(Eb_Major)
major_scales_data.push(E_Major)
major_scales_data.push(F_Major)
major_scales_data.push(Fs_Major)
major_scales_data.push(G_Major)
major_scales_data.push(Ab_Major)
major_scales_data.push(A_Major)
major_scales_data.push(Bb_Major)
major_scales_data.push(B_Major)

minor_scales_data.push(None)
minor_scales_data.push(A_Minor)
minor_scales_data.push(Bb_Minor)
minor_scales_data.push(B_Minor)
minor_scales_data.push(C_Minor)
minor_scales_data.push(Cs_Minor)
minor_scales_data.push(D_Minor)
minor_scales_data.push(Ds_Minor)
minor_scales_data.push(E_Minor)
minor_scales_data.push(F_Minor)
minor_scales_data.push(Fs_Minor)
minor_scales_data.push(G_Minor)
minor_scales_data.push(Gs_Minor)

var minor_scales = {name: 'Minor', data: minor_scales_data}
var major_scales = {name: 'Major', data: major_scales_data}

var minorDistances = [2,1,2,2,2,1,2]
var majorDistances = [2,2,1,2,2,2,1]

var majorFunctions = ['T', 'Sp', 'Dp', 'S', 'D', 'Tp', 'D-']
var minorFunctions = ['t', 'sk-', 'tP', 's', 'd', 'sP', 'dP']

var minorCadances = [['t', 's', 't'], ['t', 'd', 't'], ['t', 's', 'd', 't'], ['t', 'd', 's', 't']]
var majorCadances = [['T', 'S', 'T'], ['T', 'D', 'T'], ['T', 'S','D', 'T'], ['T', 'D', 'S', 'T']]

var calculateDistance = function(scale, scaleType, originalCIndex,source, sourceOctave, target, targetOctave) {
	var distances = scaleType == 'Minor' ? minorDistances : majorDistances
	var tmp_distances = []

	for(var i = originalCIndex; i < 7; i++) {
		tmp_distances.push(distances[i])
	}
	for(var i = 0; i < originalCIndex; i++) {
		tmp_distances.push(distances[i])
	}

	var distance = 0
	if(sourceOctave == targetOctave) {
		var start, end
		if(source > target) {
			start = target
			end = source
		} else {
			start = source
			end = target
		}
		for(var i = 0; i < 7; i++) {
			var index = (start + i) % 7

			if(index == end) {
				break
			}

			distance += tmp_distances[index]
		}
	} else if(sourceOctave < targetOctave) {
		var start = source, end = target

		for(var i = sourceOctave * 7; i < 7 + (Math.abs(sourceOctave - targetOctave) - 1) * 7; i++) {
			var index = (start + i)

			if(index == end) {
				break
			}

			if(index < 0) {
				index = 7 + index
			}

			distance += tmp_distances[index]
		}
	} else {
		var start = target, end = source

		for(var i = targetOctave * 7; i < 7 + (Math.abs(sourceOctave - targetOctave) - 1) * 7; i++) {
			var index = (start + i)

			if(index == end) {
				break
			}

			if(index < 0) {
				index = 7 + index
			}

			distance += tmp_distances[index]
		}
	}

	return distance
}

export default {
	ByName(name) {
		var scales = []
		for(var i in this.Scales()) {
			scales.push(this.Scales()[i].data)
		}

		return _.find(scales, (scale) => { scale.name == name})
	},
	Scales() {
		return [minor_scales, major_scales]
	},
	MinorScales() {
		return minor_scales
	},
	MajorScales() {
		return major_scales
	},
	MajorFunctions() {
		return majorFunctions
	},
	MinorFunctions() {
		return minorFunctions
	},
	MinorCadances() {
		return minorCadances
	},
	MajorCadances() {
		return majorCadances
	},
	Chord(root_note, notes, midi_values, scale, type, prev_chord, prev_scale) {
		var root_index = scale.data.indexOf(root_note)
		var _3rd_note_index = (root_index + 2) % 7
		var _5th_note_index = (root_index + 4) % 7
		var _7th_note_index = (root_index + 6) % 7

		var octave_1 = 0, octave_3 = 0, octave_5 = 0, octave_7 = 0
		if(prev_chord) {
			octave_1 = -1
			octave_3 = -1
			octave_5 = -1
			octave_7 = -1
		}
		var first_note = {note: midi_values[notes.indexOf(root_note)], octave: octave_1, noteString: root_note}
		var third_note = {note: midi_values[notes.indexOf(scale.data[_3rd_note_index])], octave: octave_3, noteString: scale.data[_3rd_note_index]}
		var fifth_note = {note: midi_values[notes.indexOf(scale.data[_5th_note_index])], octave: octave_5, noteString: scale.data[_5th_note_index]}
		var seventh_note = {note: midi_values[notes.indexOf(scale.data[_7th_note_index])], octave: octave_7, noteString: scale.data[_7th_note_index]}

		var chord = [first_note, third_note, fifth_note, seventh_note], result

		var tmp_scale = []
		var indexC = scale.data.indexOf('C') != -1 ? scale.data.indexOf('C') 
			: scale.data.indexOf('Cs') != -1 ? scale.data.indexOf('Cs') : scale.data.indexOf('Cb')
		for(i = indexC; i < 7; i++) {
		    tmp_scale.push(scale.data[i])
		}
		for(i = 0; i < indexC; i++) {
		    tmp_scale.push(scale.data[i])
		}

		if(prev_chord) {
			var min_distance = 999
			for(var i = 0; i < 2; i++) {
				for(var j = 0; j < 2; j++) {
					for(var k = 0; k < 2; k++) {
						for(var n = 0; n < 2; n++) {
							var new_chord_first = $.extend(true, [], chord[0]), new_chord_third = $.extend(true, [], chord[1]), new_chord_fifth = $.extend(true, [], chord[2]), new_chord_seventh = $.extend(true, [], chord[3])
							new_chord_first.octave -= i
							new_chord_third.octave -= j
							new_chord_fifth.octave -= k
							new_chord_seventh.octave -= n

							var new_chord = [new_chord_first, new_chord_third, new_chord_fifth, new_chord_seventh]

							var distance = 0
							for(var l = 0; l < 4; l++) {
								var prev_position = tmp_scale.indexOf(prev_chord[l].noteString) != -1 
								? tmp_scale.indexOf(prev_chord[l].noteString) : 
								prev_chord[l].noteString.length == 1 
									? (tmp_scale.indexOf(prev_chord[l].noteString + 's') != -1 
										? tmp_scale.indexOf(prev_chord[l].noteString + 's') 
										: tmp_scale.indexOf(prev_chord[l].noteString + 'b')) 
									: tmp_scale.indexOf(prev_chord[l].noteString[0])

								var originalCIndex = scale.data.indexOf('C') != -1 
									? scale.data.indexOf('C') 
										: scale.data.indexOf('Cs') != -1 
											? scale.data.indexOf('Cs') : scale.data.indexOf('Cb')
								for(var m = 0; m < 4; m++) {
									distance += calculateDistance(tmp_scale, scale.scale_type, originalCIndex, tmp_scale.indexOf(new_chord[m].noteString), new_chord[m].octave, prev_position, prev_chord[l].octave)
								}
							}

							if(distance <= min_distance) {
								min_distance = distance
								result = $.extend(true, [], new_chord)
							}

							new_chord_first = $.extend(true, [], chord[0]), new_chord_third = $.extend(true, [], chord[1]), new_chord_fifth = $.extend(true, [], chord[2]), new_chord_seventh = $.extend(true, [], chord[3])
							new_chord_first.octave += i
							new_chord_third.octave += j
							new_chord_fifth.octave += k
							new_chord_seventh.octave += n

							new_chord = [new_chord_first, new_chord_third, new_chord_fifth, new_chord_seventh]

							distance = 0
							for(var l = 0; l < 4; l++) {
								var prev_position = tmp_scale.indexOf(prev_chord[l].noteString) != -1 
								? tmp_scale.indexOf(prev_chord[l].noteString) : 
								prev_chord[l].noteString.length == 1 
									? (tmp_scale.indexOf(prev_chord[l].noteString + 's') != -1 
										? tmp_scale.indexOf(prev_chord[l].noteString + 's') 
										: tmp_scale.indexOf(prev_chord[l].noteString + 'b')) 
									: tmp_scale.indexOf(prev_chord[l].noteString[0])

								var originalCIndex = scale.data.indexOf('C') != -1 
									? scale.data.indexOf('C') 
										: scale.data.indexOf('Cs') != -1 
											? scale.data.indexOf('Cs') : scale.data.indexOf('Cb')
								for(var m = 0; m < 4; m++) {
									distance += calculateDistance(tmp_scale, scale.scale_type, originalCIndex, tmp_scale.indexOf(new_chord[m].noteString), new_chord[m].octave, prev_position, prev_chord[l].octave)
								}
							}

							if(distance < min_distance) {
								min_distance = distance
								result = $.extend(true, [], new_chord)
							}
						}
					}
				}
			}
		} else {
			result = chord
		}

		return result
	},
	FormCadance(index, scale, scale_type) {
		var cadance_data = []
        var notes = scale.type == 'sharp' ? Notes.notes_sharp : Notes.notes_flat
        var midiValues = scale.type == 'sharp' ? Notes.midiValues_sharp : Notes.midiValues_flat
        var cadances = scale_type == 'Minor' ? minorCadances : majorCadances
        var cadance = cadances[index]

        if(scale_type == 'Minor') {
            for(var i in cadance) {
                var index = minorFunctions.indexOf(cadance[i])
                var chord = this.Chord(scale.data[index], notes, midiValues, scale, 'Minor', cadance_data[cadance_data.length - 1])
                cadance_data.push(chord)
            }
        } else if (scale_type == 'Major') {
            for(var i in cadance) {
                var index = majorFunctions.indexOf(cadance[i])
                var chord = this.Chord(scale.data[index], notes, midiValues, scale, 'Major', cadance_data[cadance_data.length - 1])
                cadance_data.push(chord)
            }
        }

        return cadance_data
	}
}