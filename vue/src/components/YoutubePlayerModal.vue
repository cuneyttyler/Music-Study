<template>
    <div class="youtube-player">
    	<youtube :video-id="videoId" :player-vars="playerVars" ref="youtube" 
    	@paused="playing=false" @ended="nextTrack()" @playing="playing"></youtube>

    	<div class="buttons">
                <div class="prev-track" @click="prevTrack()">
                    <i class="fa fa-step-backward fa-x"></i>
                </div>
                <div class="playpause-track" @click="playPauseTrack()">
                    <i v-if="!playing" class="fa fa-play-circle fa-2x"></i>
                    <i v-if="playing" class="fa fa-pause-circle fa-2x"></i>
                </div>
                <div class="next-track" @click="nextTrack()">
                    <i class="fa fa-step-forward fa-x"></i>
                </div>
            </div>
    </div>
</template>

<script>
	export default {
	  data() {
	    return {
	      videoId: null,
	      playing: false,
	      playerVars: {
	        autoplay: 1
	      }
	    }
	  },
	  async created() {
	  	bus.$on('youtube:stop', () => {
	  		this.stopVideo();
	  	})
	  	bus.$on('youtube:play', (videoId) => {
	  		this.videoId = videoId
	  		this.playVideo()
	  		// setTimeout(() => {
	  		// 	this.playVideo()
	  		// }, 500)
	  	})
	  },
	  methods: {
	    playVideo() {
	    	this.playing = true
	      	this.player.playVideo()
	    },
	    pauseVideo() {
	    	this.playing = true
	      	this.player.pauseVideo()
	    },
	    stopVideo() {
	    	this.playing = false
	    	this.player.stopVideo()
	    },
	    playPauseTrack() {
	    	if(this.playing) {
	    		this.pauseVideo()
	    	} else {
	    		this.playVideo()
	    	}
	    },
	    nextTrack() {
	    	this.player.stopVideo()
	    	this.$emit('player:nextTrack')
	    },
	    prevTrack() {
	    	this.player.stopVideo()
	    	this.$emit('player:prevTrack')
	    }
	  },
	  computed: {
	    player() {
	      return this.$refs.youtube.player
	    }
	  }
	}
</script>

<style>
	.youtube-dialog .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 46%;
    }

    .youtube-dialog .playpause-track,
    .youtube-dialog .prev-track,
    .youtube-dialog .next-track {
        padding: 5px;
        opacity: 0.8;

        /* Smoothly transition the opacity */
        transition: opacity .2s;
    }

	.youtube-dialog .vodal-dialog {
        background-color: #7472ee;
		width: 670px!important;
		height: 400px!important;
		box-shadow: 1px 1px 20px 20px #7472ee;
    }
</style>