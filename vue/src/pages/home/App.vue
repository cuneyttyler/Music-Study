3<template>
    <div class="wrapper home">
        <span id="ruler"></span>
        <my-header></my-header>

        <div id="core" class="clearfix">
            <hr class="home-separator">

            <div class="window">
                <div class="piano-roll">
                    <div v-for="i in 5" :class="[`octave octave-${i+1}`]">
                        <div class="note-wrapper white first C Bs" @click="playNote('C', i + 1)">
                            <div class="note white-note-top"></div>
                            <div class="note white-note-bottom"></div>
                        </div>
                        <div class="note-wrapper black Cs Db" @click="playNote('Cs', i + 1)">
                            <div class="note black-note"></div>
                        </div>
                        <div class="note-wrapper white D" @click="playNote('D', i + 1)">
                            <div class="note white-note-top"></div>
                            <div class="note white-note-bottom"></div>
                        </div>
                        <div class="note-wrapper black Ds Eb" @click="playNote('Ds', i + 1)">
                            <div class="note black-note"></div>
                        </div>
                        <div class="note-wrapper white E Fb"  @click="playNote('E', i + 1)">
                            <div class="note white-note-top"></div>
                            <div class="note white-note-bottom"></div>
                        </div>
                        <div class="note-wrapper white F Es"  @click="playNote('F', i + 1)">
                            <div class="note white-note-top"></div>
                            <div class="note white-note-bottom"></div>
                        </div>
                        <div class="note-wrapper black Fs Gb" @click="playNote('Fs', i + 1)">
                            <div class="note black-note"></div>
                        </div>
                        <div class="note-wrapper white G" @click="playNote('G', i + 1)">
                            <div class="note white-note-top"></div>
                            <div class="note white-note-bottom"></div>
                        </div>
                        <div class="note-wrapper black Gs Ab" @click="playNote('Gs', i + 1)">
                            <div class="note black-note"></div>
                        </div>
                        <div class="note-wrapper white A" @click="playNote('A', i + 1)">
                            <div class="note white-note-top"></div>
                            <div class="note white-note-bottom"></div>
                        </div>
                        <div class="note-wrapper black As Bb" @click="playNote('As', i + 1)">
                            <div class="note black-note"></div>
                        </div>
                        <div class="note-wrapper white B Cb" @click="playNote('B', i + 1)">
                            <div class="note white-note-top"></div>
                            <div class="note white-note-bottom"></div>
                        </div>
                    </div>
                </div>

                <div class="info-window">
                    <div v-for="(scale, index_1) in scales" class="scale-parent-window">
                        <div class="scale-window">
                            <span class="scale-header text">{{scale.name}}</span>
                            <button :class="{selected: index_1 == selectedScale[0] && index_2 == selectedScale[1]}"
                            v-for="(note_scale, index_2) in scale.data" @click="showScale(scale, index_1, index_2)">{{note_scale.name}}</button>
                            <button @click="playScale(scales[selectedScale[0]].data[selectedScale[1]], 3)">Play</button>

                        </div>
                    </div>
                    <div class="utility-window" v-show="selectedScale[1] != 0">
                        <div class="modulation-window">
                            <table class="modulation-type-table">
                                <tr style="height: 10px">
                                    <td v-bind:colspan="modulationTypes.length">
                                        <span class="modulation-header text">Modulations</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-for="(modulationType, index) in modulationTypes">
                                        <button :class="{selected: index == selectedModulationType}" @click="selectedModulationType = index; selectedModulationSubType = 0; selectedModulationCadance = -1; selectedModulation = 0; randomModulation = null">{{modulationType.name}}</button>
                                    </td>
                                </tr>
                            </table>
                            <table v-if="selectedModulationType > 1" class="modulation-type-table">
                                <tr>
                                    <td v-for="(modulationType, index) in modulationSubTypes">
                                        <button :class="{selected: index == selectedModulationSubType}" @click="selectedModulation = 0;selectedModulationSubType = index;
                                        selectedModulationCadance = 0; setTargetScale();">{{modulationType.name}}</button>
                                    </td>
                                </tr>
                            </table>
                            <button v-show="selectedModulationType <= 1" @click="GenerateRandomModulation()">Generate</button>
                            <table v-show="selectedModulationType > 1" class="modulation-table">
                                <tr>
                                    <td><span class="text">To</span></td>
                                    <td v-for="(modulation, index) in modulations">
                                        <button :class="{selected: index == selectedModulation}" @click="selectedModulation = index; selectedModulationCadance = 0; showTargetScale(); setTargetScale();">{{modulation.to}}</button>
                                    </td>
                                </tr>
                            </table>
                            <table class="modulation-cadance-table">
                                <tr v-for="(cadance, index) in modulationCadances">
                                    <td>
                                        <button :class="{selected: index == selectedModulationCadance}" @click="selectedModulationCadance = index;setTargetScale(); ">{{modulationCadanceStr(cadance)}}</button>
                                    </td>
                                </tr>
                            </table>
                            <span class="text" v-if="targetScale">Target Scale: {{targetScale.name}}</span>
                            <span v-show="selectedModulationType <= 1" class="text">{{randomModulationCadanceStr()}}</span>
                            <span class="text">{{modulationCadanceInfo()}}</span>
                            <button v-show="selectedModulationCadance != -1 || (selectedModulationType <= 1 && randomModulation)" @click="playSelectedModulation()">Play</button>
                        </div>
                        <div class="cadance-window">
                            <span class="cadance-header text">Cadances</span>
                            <table class="cadance-table">
                                <tr v-for="(cadance, index) in cadances">
                                    <td>
                                        <button :class="{selected: index == selectedCadance}" @click="selectedCadance = index">{{cadance.join(' - ')}}</button>
                                    </td>
                                    <td>
                                        <button @click="playCadance(index)">Play</button>
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import MyHeader from '@/components/MyHeader.vue'
    import Notes from '@/services/Notes.js'
    import Scales from '@/services/Scales.js'
    import Modulations from '@/services/Modulations.js'
    import axios from 'axios'

    export default {
        name: 'Home',
        components: {
            MyHeader
        },
        data() {
            return {
                page: 'home',
                inst: new Instrument(),
                octave: 4,
                notes: {},
                scales: [],
                minorFunctions: [],
                majorFunctions: [],
                selectedScale: [0,0],
                selectedScaleType: 'None',
                cadances: [],
                minorCadances: [],
                majorCadances: [],
                selectedCadance: -1,
                modulationTypes: [],
                selectedModulationType: -1,
                selectedModulationSubType: -1,
                selectedModulation: -1,
                selectedModulationCadance: -1,
                targetScale: null,
                randomModulation: null
            }
        },
        created() {
            window.addEventListener('keyup', this.onKeyUp)
            this.scales = Scales.Scales()
            this.minorScales = Scales.MinorScales()
            this.majorScales = Scales.MajorScales()
            this.minorFunctions = Scales.MinorFunctions()
            this.majorFunctions = Scales.MajorFunctions()
            this.minorCadances = Scales.MinorCadances()
            this.majorCadances = Scales.MajorCadances()
            this.modulationTypes = Modulations.MODULATION_TYPES()
        },
        computed: {
            modulationSubTypes: function() {
                if(this.selectedScale[1] == 0) {
                    return
                }

                var sourceScale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]

                return this.selectedModulationType != -1 && this.selectedModulationType > 1 ? _.filter(this.modulationTypes[this.selectedModulationType].data, (mod) => !mod.source_scale_type || mod.source_scale_type == sourceScale.scale_type) : []
            },
            modulations: function() {
                return this.selectedModulationSubType != -1 && this.selectedModulationType > 1 ? this.modulationSubTypes[this.selectedModulationSubType].data : []
            },
            modulationCadances: function() {
                return this.selectedModulationSubType != -1 && this.selectedModulationType > 1 && this.selectedModulation != -1
                    ? this.modulationSubTypes[this.selectedModulationSubType].data[this.selectedModulation].data : []
            }
        },
        methods: {
            playNote(noteString, octave){
                this.inst.tone(Notes.midi(noteString) - (octave - 2) * 12)
                this.highlightNote(noteString, octave)
            },
            highlightNote(note, octave, removeHighlight = true) {
                var hasRootHighlight = $('.octave-' + octave + ' .note-wrapper.' + note).hasClass('highlight-root')
                var hasScaleHighlight = $('.octave-' + octave + ' .note-wrapper.' + note).hasClass('highlight-scale')

                this.removeHighlightScaleNote(note,octave)

                $('.octave-' + octave + ' .note-wrapper.' + note).addClass('highlight')
                if(removeHighlight) {
                    setTimeout(() => {
                    $('.octave-' + octave + ' .note-wrapper.' + note).removeClass('highlight')

                    if(hasRootHighlight) {
                        $('.octave-' + octave + ' .note-wrapper.' + note).addClass('highlight-root')
                    }
                    if(hasScaleHighlight) {
                        $('.octave-' + octave + ' .note-wrapper.' + note).addClass('highlight-scale')
                    }
                }, 300)
                }
            },
            highlightRootNote(note, octave) {
                $('.octave-' + octave + ' .note-wrapper.' + note).addClass('highlight-root')
            },
            highlightScaleNote(note, octave) {
                $('.octave-' + octave + ' .note-wrapper.' + note).addClass('highlight-scale')
            },
            highlightTargetRootNote(note, octave) {
                $('.octave-' + octave + ' .note-wrapper.' + note).addClass('highlight-target-root')
            },
            highlightTargetScaleNote(note, octave) {
                $('.octave-' + octave + ' .note-wrapper.' + note).addClass('highlight-target-scale')
            },
            removeHighlightScaleNote(note, octave) {
                $('.octave-' + octave + ' .note-wrapper.' + note).removeClass('highlight-root')
                $('.octave-' + octave + ' .note-wrapper.' + note).removeClass('highlight-scale')
            },
            removeHighlightTargetScaleNote(note, octave) {
                $('.octave-' + octave + ' .note-wrapper.' + note).removeClass('highlight-target-root')
                $('.octave-' + octave + ' .note-wrapper.' + note).removeClass('highlight-target-scale')
            },
            showScale(scale, index_1, index_2) {
                if(index_1 == 0) {
                    this.cadances = this.minorCadances
                    this.selectedScaleType = 'Minor'
                } else {
                    this.cadances = this.majorCadances
                    this.selectedScaleType = 'Major'
                }

                this.selectedScale = [index_1, index_2]

                for(var noteIndex in Notes.notes_sharp) {
                    for(var octave = 2; octave < 7; octave++) {
                        this.removeHighlightScaleNote(Notes.notes_sharp[noteIndex], octave, false)
                        this.removeHighlightTargetScaleNote(Notes.notes_sharp[noteIndex], octave, false)
                    }
                }

                for(var octave = 2; octave < 7; octave++) {
                    this.highlightRootNote(this.scales[index_1].data[index_2].data[0], octave)
                }

                for (var noteIndex = 1; noteIndex < this.scales[index_1].data[index_2].data.length; noteIndex++) {
                    for(var octave = 2; octave < 7; octave++) {
                        this.highlightScaleNote(this.scales[index_1].data[index_2].data[noteIndex], octave, false)
                    }
                }

                this.setTargetScale()
            },
            setTargetScale() {
                var sourceScale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]
                this.targetScale = this.getTargetScaleForModulation(sourceScale)

                return this.targetScale
            },
            showTargetScale() {
                // var sourceScale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]
                // var targetScale = this.selectedModulationSubType <= 1 ? this.getTargetScaleForRandomModulation(sourceScale,this.randomModulation.to, this.randomModulation.target_scale_type) : this.getTargetScaleForModulation(sourceScale)
                // this.targetScale = targetScale

                // for(var noteIndex in Notes.notes_sharp) {
                //     for(var octave = 2; octave < 7; octave++) {
                //         this.removeHighlightTargetScaleNote(Notes.notes_sharp[noteIndex], octave, false)
                //     }
                // }

                // for(var octave = 2; octave < 7; octave++) {
                //     this.highlightTargetRootNote(targetScale.data[0], octave)
                // }

                // for (var noteIndex = 1; noteIndex < targetScale.data.length; noteIndex++) {
                //     for(var octave = 2; octave < 7; octave++) {
                //         this.highlightTargetScaleNote(targetScale.data[noteIndex], octave, false)
                //     }
                // }
            },
            playNoteAndWait(noteData, index, waitTime) {
                if(index == noteData.length) {
                    return;
                }

                this.playNote(noteData[index]['noteString'],noteData[index]['octave'])
                setTimeout(() => {
                    this.playNoteAndWait(noteData, index + 1, waitTime)
                }, waitTime)
            },
            playChordAndWait(cadanceData, index, waitTime, repeat_count, repeat_index=repeat_count) {
                if(index == cadanceData.length) {
                    return
                }

                var octave = 4
                var chord = cadanceData[index]
                for(var i in chord) {
                    if(i == 3) {
                        break
                    }
                    this.playNote(chord[i].noteString, octave + chord[i].octave)
                }
                repeat_index--
                if(repeat_index == 0) {
                    repeat_index = repeat_count
                    index++
                }
                if(index == cadanceData.length - 1) {
                    repeat_index = 1
                }
                setTimeout(() => {
                    this.playChordAndWait(cadanceData, index, waitTime, repeat_count, repeat_index)
                }, waitTime)
            },
            playScale(scale, octave) {
                if(scale.name == 'None') {
                    return  
                }

                var notes = scale.type == 'sharp' ? Notes.notes_sharp : Notes.notes_flat
                var midiValues = scale.type == 'sharp' ? Notes.midiValues_sharp : Notes.midiValues_flat

                var noteData = []
                var firstNoteIndex = notes.findIndex((note) => note == scale.data[0])
                for(var scaleNoteIndex in scale.data) {
                    var noteIndex = notes.findIndex((note) => note == scale.data[scaleNoteIndex])
                    var playInOctave = octave
                    if(noteIndex < firstNoteIndex) {
                        playInOctave++
                    }
                    noteData.push({note: midiValues[noteIndex], noteString: scale.data[scaleNoteIndex], octave: playInOctave})
                }

                noteData.push({note: midiValues[firstNoteIndex], noteString: scale.data[0], octave: scale.data[0] == 'C' || scale.data[0] == 'Cs' ? playInOctave + 1 : playInOctave})

                this.playNoteAndWait(noteData,0,500)
            },
            playCadance(index) {
                var scale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]

                var cadance_data = Scales.FormCadance(index, scale, this.selectedScaleType)

                this.playChordAndWait(cadance_data, 0, 500, 1)
            },
            randomModulationCadanceStr() {
                return this.randomModulation ? _.map(this.randomModulation.data, (item) => item.chord + ' (' + item.scale + ')').join(' - ') : ''
            },
            modulationCadanceStr(cadance) {
                return _.map(cadance, (item) => item.chord + ' (' + item.scale + ')').join(' - ')
            },
            modulationCadanceInfo() {
                if(this.selectedModulationType <= 1 && !this.randomModulation) {
                    return ''
                } if((this.selectedModulationType == -1 || this.selectedModulationType > 1) && (this.selectedScale[1] == 0 || this.selectedModulation == -1 || this.selectedModulationCadance == -1)) {
                    return ''
                }

                var sourceScale, targetScale, sourceFunctions, targetFunctions, cadance
                if(this.selectedScale[1] != 0 && (this.selectedModulationSubType <= 1 && this.randomModulation)) {

                    sourceScale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]
                    targetScale = this.getTargetScaleForRandomModulation(sourceScale, this.randomModulation.to, this.randomModulation.target_scale_type)

                    sourceFunctions = sourceScale.scale_type == 'Minor' ? this.minorFunctions : this.majorFunctions
                    targetFunctions = targetScale.scale_type == 'Minor' ? this.minorFunctions : this.majorFunctions
                    
                    cadance = this.randomModulation.data

                } else {
                    sourceScale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]
                    targetScale = this.getTargetScaleForModulation(sourceScale)
                    sourceFunctions = sourceScale.scale_type == 'Minor' ? this.minorFunctions : this.majorFunctions
                    targetFunctions = targetScale.scale_type == 'Minor' ? this.minorFunctions : this.majorFunctions
                    
                    cadance = this.modulationSubTypes[this.selectedModulationSubType].data[this.selectedModulation].data[this.selectedModulationCadance]
                }

                if(!cadance) {
                    return
                }

                var info = []
                for(var i in cadance) {
                    if(cadance[i].scale != 1) {
                        break
                    }

                    var index = sourceFunctions.indexOf(cadance[i].chord)
                    info.push(sourceScale.data[index] + ' (1)')
                }

                for(var i = i; i < cadance.length; i++) {
                    var index = targetFunctions.indexOf(cadance[i].chord)
                    info.push(targetScale.data[index] + ' (2)')
                }

                return info.join(' - ')
            },
            getTargetScaleForRandomModulation(sourceScale, to, target_scale_type) {
                var targetScaleModifier = to.length > 1 ?  (to[1] == '+' ? 's' : 'b') : ''
                var targetScaleChord = sourceScale.data[parseInt(to[0]) - 1]
                targetScaleChord = targetScaleChord.length > 1 ? 
                    ((targetScaleChord[1] == 's' && targetScaleModifier == 'b')
                    || (targetScaleChord[1] == 'b' && targetScaleModifier == 's') ? targetScaleChord[0] 
                    : targetScaleChord[0] ) : targetScaleChord + targetScaleModifier
                targetScaleChord = targetScaleChord == 'Cb' ? 'B' : targetScaleChord
                targetScaleChord = targetScaleChord == 'Bs' ? 'C' : targetScaleChord
                targetScaleChord = targetScaleChord == 'Fb' ? 'E' : targetScaleChord
                targetScaleChord = targetScaleChord == 'Es' ? 'F' : targetScaleChord

                var targetScaleName = targetScaleChord + ' ' + target_scale_type
                var targetScale = target_scale_type == 'Minor' ? _.find(this.minorScales.data, (scale) => scale.name == targetScaleName) : _.find(this.majorScales.data, (scale) => scale.name == targetScaleName)

                return targetScale

            },
            getTargetScaleForModulation(sourceScale) {
                var to = this.modulationSubTypes[this.selectedModulationSubType].data[this.selectedModulation].to
                var targetScaleType = this.modulationSubTypes[this.selectedModulationSubType].target_scale_type
                var targetScaleModifier = to.length > 1 ?  (to[1] == '+' ? 's' : 'b') : ''
                var targetScaleChord = sourceScale.data[parseInt(to[0]) - 1]
                targetScaleChord = targetScaleChord.length > 1 ? 
                    ((targetScaleChord[1] == 's' && targetScaleModifier == 'b')
                    || (targetScaleChord[1] == 'b' && targetScaleModifier == 's') ? targetScaleChord[0] 
                    : targetScaleChord ) : targetScaleChord + targetScaleModifier
                targetScaleChord = targetScaleChord == 'Cb' ? 'B' : targetScaleChord
                targetScaleChord = targetScaleChord == 'Bs' ? 'C' : targetScaleChord
                targetScaleChord = targetScaleChord == 'Fb' ? 'E' : targetScaleChord
                targetScaleChord = targetScaleChord == 'Es' ? 'F' : targetScaleChord

                var targetScaleName = targetScaleChord + ' ' + targetScaleType
                var targetScale = targetScaleType == 'Minor' ? _.find(this.minorScales.data, (scale) => scale.name == targetScaleName || scale.sec_name == targetScaleName) : _.find(this.majorScales.data, (scale) => scale.name == targetScaleName)

                return targetScale

            },
            playSelectedModulation() {
                if(this.selectedModulationType <= 1) {
                    var sourceScale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]
                    var targetScale = this.getTargetScaleForRandomModulation(sourceScale, this.randomModulation.to, this.randomModulation.target_scale_type)
                
                    var cadance_data = Modulations.Modulate(this.randomModulation.data, sourceScale, targetScale)
                    this.playChordAndWait(cadance_data, 0, 750, 2)
                } else {
                    var sourceScale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]
                    var targetScale = this.getTargetScaleForModulation(sourceScale)
                    
                    var modulation = this.modulationSubTypes[this.selectedModulationSubType].data[this.selectedModulation].data[this.selectedModulationCadance]

                    var cadance_data = Modulations.Modulate(modulation, sourceScale, targetScale)

                    this.playChordAndWait(cadance_data, 0, 750, 2)
                }
            },
            GenerateRandomModulation() {
                var targetScaleType = this.modulationTypes[this.selectedModulationType].target_scale_type
                var sourceScale = this.scales[this.selectedScale[0]].data[this.selectedScale[1]]

                this.randomModulation = Modulations.GenerateRandom(sourceScale.scale_type, targetScaleType)
                this.targetScale = this.getTargetScaleForRandomModulation(sourceScale, this.randomModulation.to, this.randomModulation.target_scale_type)
                this.showTargetScale()
            },
            onKeyUp(e) {
                if(e.code == 'KeyZ') {
                    if (this.octave > 2) {
                        this.octave--
                    }
                } else if(e.code == 'KeyX') {
                    if (this.octave < 6) {
                        this.octave++
                    }
                } else if(e.code == 'KeyA') {
                    this.playNote('C', this.octave)
                } else if(e.code == 'KeyW') {
                    this.playNote('Cs', this.octave)
                } else if(e.code == 'KeyS') {
                    this.playNote('D', this.octave)
                } else if(e.code == 'KeyE') {
                    this.playNote('Ds', this.octave)
                } else if(e.code == 'KeyD') {
                    this.playNote('E', this.octave)
                } else if(e.code == 'KeyF') {
                    this.playNote('F', this.octave)
                } else if(e.code == 'KeyT') {
                    this.playNote('Fs', this.octave)
                } else if(e.code == 'KeyG') {
                    this.playNote('G', this.octave)
                } else if(e.code == 'KeyY') {
                    this.playNote('Gs', this.octave)
                } else if(e.code == 'KeyH') {
                    this.playNote('A', this.octave)
                } else if(e.code == 'KeyU') {
                    this.playNote('As', this.octave)
                } else if(e.code == 'KeyJ') {
                    this.playNote('B', this.octave)
                } else if(e.code == 'KeyK' && this.octave != 6) {
                    this.playNote('C', this.octave + 1)
                } else if(e.code == 'KeyO' && this.octave != 6) {
                    this.playNote('Cs', this.octave + 1)
                } else if(e.code == 'KeyL' && this.octave != 6) {
                    this.playNote('D', this.octave + 1)
                } else if(e.code == 'KeyP' && this.octave != 6) {
                    this.playNote('Ds', this.octave + 1)
                } else if(e.code == 'Semicolon' && this.octave != 6) {
                    this.playNote('E', this.octave + 1)
                } else if(e.code == 'Quote' && this.octave != 6) {
                    this.playNote('F', this.octave + 1)
                } else if(e.code == 'BracketRight' && this.octave != 6) {
                    this.playNote('Fs', this.octave + 1)
                } else if(e.code == 'Backslash' && this.octave != 6) {
                    this.playNote('G', this.octave + 1)
                }
            }
        }
    }
</script>


<style lang="scss">
    body {
        background-color: #8987ff;
    }

    .background-overlay {
      // background-image: url("../../assets/dots-background.png");
      // background-size: contain;
      background-color: #7e46ba;
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0.3;
    }

    .home-separator {
        margin: 0;
        width: 100%;
    }

    #self {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .window {
        margin: 5% 0 0 20%;
        width: 1165px;
    }

    .piano-roll {
        display: flex;
        height: 120px;
    }

    .piano-roll .octave {
        margin-left: -1px;
        display: flex;
    }

    .piano-roll .note {
    }

    .note-wrapper {
        margin-left: -11px;
        height: 120px;
    }

    .note-wrapper.first {
        margin-left: 0;
    }

    .white-note-top {
        width: 25px;
        height: 70px;
        border: 1px black solid;
        border-bottom: none;
    }

    .white-note-bottom {
        width: 35px;
        height: 50px;
        border: 1px black solid;
        border-top: none;
    }

    .black-note {
        width: 20px;
        height: 70px;
        border: 1px black solid;
    }

    .note-wrapper.white {
        background-color: white;
    }
    .note-wrapper.black {
        z-index: 99;
        background-color: black;
        height: 70px;
    }

    .note-wrapper.white:hover, .note-wrapper.black:hover, .note-wrapper.highlight {
        background-color: gray!important;
    }

    .note-wrapper.highlight-scale {
        background-color: cornflowerblue;
    }

    .note-wrapper.highlight-root {
        background-color: darkorchid;
    }

    .note-wrapper.highlight-scale.highlight-target-root {
        background-color: burlywood;
    }

    .note-wrapper.highlight-scale.highlight-target-scale {
        background-color: lightsteelblue;
    }

    .note-wrapper.highlight-root.highlight-target-scale {
        background-color: orchid;
    }

    .note-wrapper.highlight-target-root {
        background-color: orange;
    }

    .note-wrapper.highlight-target-scale {
        background-color: indianred;
    }

    .note-wrapper.E .white-note-top, .note-wrapper.B .white-note-top {
        width: 35px;
    }

    .note-wrapper.F {
        margin-left: -1px;
    }

    .text {
        color: white;
        font-size: 14pt;
    }

    .info-window {
        margin-top: 5%;
    }

    .info-window .scale-window {
        display: inline-grid;
    }

    .info-window .utility-window {
        display: flex;
        float: right;
    }

    .scale-parent-window {
        width: 100px;
        display: inline-flex;
    }

    .scale-parent-window .scale-window button.selected {
        background-color: cadetblue;
        border: 1px solid black;    
    }

    .info-window .utility-window table tr td {
        padding: 1px 0 1px 0;
    }

    .info-window .utility-window .modulation-window {
        display: grid;
        margin-right: 10px;
    }

    .info-window .utility-window .modulation-window table tr td {
        vertical-align: top;
    }

    .info-window .utility-window .modulation-window button.selected {
        background-color: cadetblue;
        border: 1px solid black; 
    }

    .info-window .utility-window .modulation-window .modulation-header {
        float:left;
    }

    
</style>
