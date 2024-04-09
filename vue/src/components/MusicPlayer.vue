<template>
    <div class="player">

        <!-- Define the section for displaying the seek slider-->
        <div v-if="currentTrack" class="info">
            <div v-bind:title="currentTrack.name" class="track-title">{{playingTrackTitle}}</div>
            <a class="like-track-button" v-if="!isTrackLiked(currentTrack)" href="#" @click="likeTrack(currentTrack,true)">
              <img  src="../assets/like-button-unliked.png"/>
            </a>
            <a class="like-track-button" v-if="isTrackLiked(currentTrack)" href="#" @click="likeTrack(currentTrack,false)">
              <img  src="../assets/like-button-liked.png"/>
            </a>
            <a class="plus-button" href="#" @click="openTrackContextMenu(t)">
              <img  src="../assets/plus-icon.png"/>
            </a>
            <a  class="spotify-icon" v-bind:href="currentTrack.spotifyData.external_urls.spotify" target="_blank">
                <img src="../assets/spotify-icon.png"/>
            </a>
        </div>
        <div class="slider_container seek_slider">
            <div class="buttons">
                <div class="prev-track" @click="prevTrack()">
                    <i class="fa fa-step-backward fa-x"></i>
                </div>
                <div class="playpause-track" @click="playPauseTrack()">
                    <i v-if="!isPlaying" class="fa fa-play-circle fa-2x"></i>
                    <i v-if="isPlaying" class="fa fa-pause-circle fa-2x"></i>
                </div>
                <div class="next-track" @click="nextTrack()">
                    <i class="fa fa-step-forward fa-x"></i>
                </div>
            </div>
            <div class="current-time">{{currentTime}}</div>
            <input type="range" min="0" max="100"
                   value="0" @change="seekTo()">

            <div class="total-duration">{{duration}}</div>

            <div class="slider_container volume_slider">
                <i class="fa fa-volume-down"></i>
                <input type="range" min="1" max="100"
                       value="100" @change="setVolume()">
                <i class="fa fa-volume-up"></i>
            </div>
        </div>

        <!-- Define the section for displaying the volume slider-->

    </div>
</template>

<script>
    export default {
        props: ['backendAddress', 'user', 'track', 'currentTrack', 'graphs', 'trackGraphs'],
        data() {
            return {
                showMobileMenu: false,
                users: [],
                currentTime: '00:00',
                currentTimeSeconds: 0,
                duration: '00:00',
                updateTimer: null,
                isPlaying: false,
                player: null,
                playerConfigured: false,
                spotifyPaused: false,
                deviceId: null,
                tokenRefreshed: false,
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            }
        },
        computed: {
            playingTrackTitle: function () {
                if (this.currentTrack && this.currentTrack.spotifyData) {
                    var trackName = this.currentTrack.name.length > 50 ? this.currentTrack.name.slice(0,50) + '...' : this.currentTrack.name
                    return trackName + ' - ' + this.currentTrack.spotifyData.artists[0].name
                } else {
                    return ''
                }
            },
            seekSlider: function () {
                return document.querySelector(".seek_slider input")
            },
            volumeSlider: function () {
                return document.querySelector(".volume_slider input")
            },
        },
        watch: {
            'track': {
                handler: function (newTrack, oldTrack) {
                    // if (oldTrack == null || newTrack.artist != oldTrack.artist ||
                    //     newTrack.title != oldTrack.title || newTrack.duration != oldTrack.duration) {
                    //     this.track = newTrack
                    //     this.loadTrack();
                    // }
                },
                deep: true
            },
            user(newValue, oldValue) {
              this.refreshSpotifyToken()
            }
        },
        async created() {
            window.onSpotifyWebPlaybackSDKReady = () => {
                console.log('Spotify Web Player Ready')
            }

            setInterval(()=>{
              this.refreshSpotifyToken(() => {
                this.tokenRefreshed = true
                if(this.isPlaying) {
                  this.continuePlaying()
                }
              })
            },  60000 * 50)
        },
        async updated() {

        },
        methods: {
            refreshSpotifyToken(callback) {
              if (!this.user) return
              axios.put(this.backendAddress + 'api/user/spotify/refreshAccessToken')
                  .then(response => {
                      this.user.spotifyWebApiToken = response.data.token
                      this.setupSpotifyPlayer(callback)
                  })
            },
            setupSpotifyPlayer(cb) {
                var self = this
                // window.onSpotifyWebPlaybackSDKReady = () => {
                self.player = new Spotify.Player({
                    name: 'MusicSpace Spotify Player',
                    getOAuthToken: callback => {
                        callback(self.user.spotifyWebApiToken);
                    },
                    volume: 1
                });

                self.player.addListener('ready', ({device_id}) => {
                    if(!this.playerConfigured) {
                      bus.$on("player:play", (track) => {
                          this.playTrack(track)
                      })
                    }
                    this.playerConfigured = true

                    console.log('Ready with Device ID', device_id);
                    this.deviceId = device_id

                    self.play = ({
                                     spotify_uri,
                                     playerInstance: {
                                         _options: {
                                             getOAuthToken,
                                             id
                                         }
                                     }
                                 }) => {
                        getOAuthToken(access_token => {
                            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                                method: 'PUT',
                                body: JSON.stringify({uris: [spotify_uri]}),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${access_token}`
                                },
                            });
                        });
                    };

                    if(cb)
                      cb();
                });

                // Not Ready
                self.player.addListener('not_ready', ({device_id}) => {
                    console.log('Device ID has gone offline', device_id);
                });

                self.player.addListener('initialization_error', ({message}) => {
                    console.error(message);
                });

                self.player.addListener('authentication_error', ({message}) => {
                    console.error(message);
                });

                self.player.addListener('account_error', ({message}) => {
                    console.error(message);
                });

                self.player.addListener('player_state_changed', ( state => {

                    if (!state) {
                        return;
                    }

                    this.spotifyPaused = state.paused
                }));




                self.player.connect()


                // }
            },
            play() {

            },
            playPauseTrack() {
                if(!this.currentTrack) {
                    this.$emit('player:play')
                }

                if(!this.isPlaying && this.tokenRefreshed) {
                  this.continuePlaying()
                  this.tokenRefreshed = false
                } else {
                  this.player.togglePlay()
                }

                this.isPlaying = !this.isPlaying
            },
            continuePlaying() {
              clearInterval(this.updateTimer);

              this.play({
                  playerInstance: this.player,
                  spotify_uri: 'spotify:track:' + this.currentTrack.spotifyData.id,
              });
              this.player.setVolume(0)

              // Here the song starts to play again if it was paused before, so in the callback
              // I toggle pause if it's paused so that it would be paused again, otherwise I do nothing,
              // it continues to play - BUT IT DOESN'T WORK!
              setTimeout(()=>{
                  this.callSeekTo(this.currentTimeSeconds, () => {
                    this.player.setVolume(this.volumeSlider.value / 100)
                    // if(!this.isPlaying) {
                    //     // this.player.togglePlayer() // this should be here instead of the one below
                    //     this.isPlaying = true
                    //     this.player.setVolume(this.volumeSlider.value / 100)
                    // } else {
                    //   this.player.setVolume(this.volumeSlider.value / 100)
                    // }
                  })
              },1000)

              setTimeout(() => {
                  this.updateTimer = setInterval(this.seekUpdate, 1000);
              }, 2000)

            },
            playTrack(track) {
                // Clear the previous seek timer
                this.currentTrack = track

                clearInterval(this.updateTimer);
                this.resetValues();

                this.play({
                    playerInstance: this.player,
                    spotify_uri: 'spotify:track:' + track.spotifyData.id,
                });

                this.isPlaying = true;
                setTimeout(() => {
                    this.updateTimer = setInterval(this.seekUpdate, 1000);
                }, 2000)
            },

            // Function to reset all values to their default
            resetValues() {
                if (this.currentTrack != null) {
                    // this.currentTrack.pause()
                }

                this.currentTimeSeconds = 0
                this.currentTime = "00:00";
                this.duration = "00:00";
                // this.seekSlider.value = 0;
            },

            nextTrack() {
                if (this.isPlaying) {
                    this.player.togglePlay()
                }
                this.resetValues()
                this.$emit('player:nextTrack')
            },

            prevTrack() {
                if (this.isPlaying) {
                    this.player.togglePlay()
                }
                this.resetValues()
                this.$emit('player:prevTrack')
            },

            seekTo(callback) {
                if(!this.currentTrack) {
                   this.seekSlider.value = 0
                   return
                }
                // Calculate the seek position by the
                // percentage of the seek slider
                // and get the relative duration to the track
                // if (!this.isPlaying) {
                //     this.playPauseTrack()
                // }

                let seekto = parseInt((this.currentTrack.spotifyData.duration_ms / 1000) * (this.seekSlider.value / 100))

                this.callSeekTo(seekto)
            },

            callSeekTo(seekto, cb) {
              axios.get(this.backendAddress + "api/spotify/seekToPosition?seekTo=" + seekto + "&deviceId=" + this.deviceId)
                  .then((response) => {
                      this.currentTimeSeconds = parseInt(seekto);

                      if(cb)
                        cb()
                  })
            },

            setVolume() {
                // Set the volume according to the
                // percentage of the volume slider set
                this.player.setVolume(this.volumeSlider.value / 100)
            },

            seekUpdate() {
                if (!this.isPlaying) return

                let seekPosition = 0;

                // Check if the current track duration is a legible number
                if (!isNaN(this.currentTrack.spotifyData.duration_ms)) {
                    if (parseInt(this.currentTrack.spotifyData.duration_ms / 1000) == this.currentTimeSeconds) {
                        this.isPlaying = false
                        this.nextTrack()
                        return
                    }

                    seekPosition = this.currentTimeSeconds * (100 / (this.currentTrack.spotifyData.duration_ms / 1000));
                    this.seekSlider.value = seekPosition;

                    // Calculate the time left and the total duration
                    let currentMinutes = Math.floor(this.currentTimeSeconds / 60);
                    let currentSeconds = Math.floor(this.currentTimeSeconds - currentMinutes * 60);
                    let durationMinutes = Math.floor(this.currentTrack.spotifyData.duration_ms / 1000 / 60);
                    let durationSeconds = Math.floor(this.currentTrack.spotifyData.duration_ms / 1000 - durationMinutes * 60);

                    // Add a zero to the single digit time values
                    if (currentSeconds < 10) {
                        currentSeconds = "0" + currentSeconds;
                    }
                    if (durationSeconds < 10) {
                        durationSeconds = "0" + durationSeconds;
                    }
                    if (currentMinutes < 10) {
                        currentMinutes = "0" + currentMinutes;
                    }
                    if (durationMinutes < 10) {
                        durationMinutes = "0" + durationMinutes;
                    }

                    // Display the updated duration
                    this.currentTime = currentMinutes + ":" + currentSeconds;
                    this.duration = durationMinutes + ":" + durationSeconds;

                    this.currentTimeSeconds++
                }
            },
            isTrackLiked(track) {
              return _.find(this.trackGraphs[0].nodes, (t) => t.spotifyId == track.spotifyData.id)
            },
            likeTrack(track, isLiked){
              this.$emit('track:like', track, isLiked)

              if(isLiked) {
                this.trackGraphs[0].nodes.push(response.data)
              } else {
                var index = _.findIndex(this.trackGraphs[0].nodes, (n) => {n.id == response.data.id})
                this.trackGraphs[0].nodes.splice(index,1)
              }
            }
        }
    }
    ;
</script>

<style>
    .player {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        bottom: 0px;
        width: 700px;
        background-color: #779ce8;
        left: 350px;
        box-shadow: 1px 1px 20px 20px #779ce8;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .playpause-track,
    .prev-track,
    .next-track {
        padding: 5px;
        opacity: 0.8;

        /* Smoothly transition the opacity */
        transition: opacity .2s;
    }

    /* Change the opacity when mouse is hovered */
    .playpause-track:hover,
    .prev-track:hover,
    .next-track:hover {
        opacity: 1.0;
    }

    /* Define the slider width so that it scales properly */
    .slider_container {
        width: 100%;
        /*max-width: 400px;*/
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .slider_container.seek_slider {
        /*width: 100%;*/
    }

    .slider_container.volume_slider {
        width: 40%;
    }

    /* Modify the appearance of the slider */
    .seek_slider input, .volume_slider input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        height: 5px;
        background: #111111;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        padding: 0;
        overflow: hidden;
        /* width: 400px;
        height: 15px;
        -webkit-appearance: none;
        background: #343232;
        outline: none;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 1); */
    }

    /* Modify the appearance of the slider thumb */
    .seek_slider input::-webkit-slider-thumb,
    .volume_slider input::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 1px;
        height: 1px;
        border-radius: 50%;
        background: #333333;
        cursor: pointer;
        border: 1px solid black;
        box-shadow: -407px 0 0 400px #ffffff;
    }

    /* Change the opacity when mouse is hovered */
    .seek_slider input:hover,
    .volume_slider input:hover {
        opacity: 1.0;
    }

    .track-title {
        white-space: nowrap;
    }

    .current-time,
    .total-duration {
        padding: 10px;
        color: white;
    }

    .track-title {
        color: white;
    }

    i.fa-volume-down,
    i.fa-volume-up {
        padding: 10px;
        color: white;
    }

    /* Change the mouse cursor to a pointer
       when hovered over */
    i.fa-play-circle,
    i.fa-pause-circle,
    i.fa-step-forward,
    i.fa-step-backward {
        cursor: pointer;
        color: white;
    }

    .spotify-icon {
      margin: -3px 0 0 5px;
    }
    .spotify-icon img {
        width: 24px;
        height: 24px;
    }

    .player .info {
        display: inline-flex;
    }

    .player a.like-track-button {
        margin: -3px 0px 0 5px;
    }

    .player a.like-track-button img {
      width: 24px;
      height: 24px;
    }

    .player a.plus-button {
        margin: -3px 0px 0 5px;
    }

    .player a.plus-button img {
      width: 24px;
      height: 24px;
    }
</style>
