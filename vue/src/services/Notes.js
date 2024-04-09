var C2 = -36
var Cs2 = -37
var D2 = -38
var Ds2 = -39
var E2 = -40
var F2 = -41
var Fs2 = -42
var G2 = -43
var Gs2 = -44
var A3 = -45
var As3 = -46
var B3 = -47

var notes_sharp = ['Bs', 'C', 'Cs', 'D', 'Ds', 'E', 'Es', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B']
var notes_flat = ['C', 'Db', 'D', 'Eb', 'E', 'Fb', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'Cb']
var midiValues_sharp = [-36, -36, -37, -38, -39, -40, -41, -41, -42, -43, -44, -45, -46, -47]
var midiValues_flat = [-36, -37, -38, -39, -40, -40, -41, -42, -43, -44, -45, -46, -47, -47]

export default {
    C2: C2,
    Cs2: Cs2,
    D2: D2,
    Ds2: Ds2,
    E2: E2,
    F2: F2,
    Fs2: Fs2,
    G2: G2,
    Gs2: Gs2,
    A3: A3,
    As3: As3,
    B3: B3,
    notes_sharp: notes_sharp, 
    notes_flat: notes_flat, 
    midiValues_sharp: midiValues_sharp, 
    midiValues_flat: midiValues_flat,
    midi: function(noteString) {
        if(noteString == 'C') {
            return C2
        } else if(noteString == 'Cs' || noteString == 'Db') {
            return Cs2
        } else if(noteString == 'D') {
            return D2
        } else if(noteString == 'Ds' || noteString == 'Eb') {
            return Ds2
        } else if(noteString == 'E' || noteString == 'Fb') {
            return E2
        } else if(noteString == 'F' || noteString == 'Es') {
            return F2
        } else if(noteString == 'Fs' || noteString == 'Gb') {
            return Fs2
        } else if(noteString == 'G') {
            return G2
        } else if(noteString == 'Gs' || noteString == 'Ab') {
            return Gs2
        } else if(noteString == 'A') {
            return A3
        } else if(noteString == 'As' || noteString == 'Bb') {
            return As3
        } else if(noteString == 'B' || noteString == 'Cb') {
            return B3
        }
    }
}