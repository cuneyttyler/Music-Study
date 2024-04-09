<template>
    <div class="side-menu-items" v-bind:class="{'open': selectedMenu != null}">
        <div v-if="page != 'home'" class="graph-box-edge graphs" v-bind:class="{selected : selectedMenu == 'graphs'}">
            <div class="graph-box">
                <button class="accordion"  v-for="g in graphs" v-bind:class="{active: selectedGraph && selectedGraph.name == g.name}"
                        @click="graphClicked(g,$event.currentTarget)">
                    {{g.name}}
                </button>
            </div>
                <div class="side-menu">
                    <div class="side-menu-edge">
                        <p class=""><a href="#!" @click="openMenu('graphs')">Graphs</a></p>
                        <p class="create-graph-button"><a href="#!" @click="openCreateGraphDialog('graphs')">+</a></p>
                    </div>
                </div>
            </a>
        </div>

        <div class="graph-box-edge artists" v-if="pageType == 'artist'"
             v-bind:class="{selected : selectedMenu == 'artists'}">
            <div class="graph-box">
                <div v-if="selectedGraph">
                    <div  class="accordion-box" v-for="(n,$index) in selectedGraph.nodes">
                        <button class="accordion"
                                v-bind:class="{active: selectedNode.name == n.name}"
                                @click="artistClicked(n, $index,$event.currentTarget)">
                                <div class="side-menu-overlay" v-if="n.saved"></div>
                            {{n.name}}
                        </button>
                    </div>
                </div>
            </div>
            <a href="#!" @click="openMenu('artists')">
                <div class="side-menu artists">
                    <div class="side-menu-edge">
                        <p class="">Artists</p>
                    </div>
                </div>
            </a>
        </div>

        <div class="graph-box-edge albums" v-if="pageType == 'artist'"
             v-bind:class="{selected : selectedMenu == 'albums'}">
             <div v-if="sideMenuLoading" class="overlay">
                 <div class="lds-ripple center"><div></div><div></div></div>
             </div>
            <div class="graph-box" v-if="selectedNode">

                <button class="accordion" v-for="a in selectedNode.albums" :key="a.spotifyId"
                        v-bind:class="{active: selectedAlbum.spotifyId == a.spotifyId}"
                        @click="albumClicked(a,selectedNode,$event.currentTarget)">
                    {{a.name}} ({{a.releaseYear}})
                </button>
            </div>
            <a href="#!" @click="openMenu('albums')">
                <div class="side-menu albums">
                    <div class="side-menu-edge">
                        <p class="">Albums</p>
                    </div>
                </div>
            </a>
        </div>

        <div class="graph-box-edge tracks"
             v-bind:class="{selected : selectedMenu == 'tracks', 'track-graph': pageType == 'track'}">
             <div v-if="sideMenuLoading" class="overlay">
                 <div class="lds-ripple center"><div></div><div></div></div>
             </div>
            <div class="graph-box" v-if="selectedAlbum">

              <div class="accordion-box" v-for="(t,$index) in getTracks()">

                <button class="accordion"
                        v-bind:class="{active: isTrackSelected(t)}"
                        @click="trackClicked(t, $event.currentTarget)">
                    <div class="side-menu-overlay" v-if="t.saved"></div>
                    {{getTrackTitle($index)}}

                </button>
                <div v-if="page != 'home'" class="track-options">
                    <a class="like-track-button" v-if="!isTrackLiked(t)" href="#" @click="likeTrack(t,true)">
                      <img  src="../assets/like-button-unliked.png"/>
                    </a>
                    <a class="like-track-button" v-if="isTrackLiked(t)" href="#" @click="likeTrack(t,false)">
                      <img  src="../assets/like-button-liked.png"/>
                    </a>
                    <a class="open-menu-button" href="#" @click="openTrackContextMenu(t)">
                      <img  src="../assets/open-menu-button.png"/>
                    </a>
                </div>
              </div>
            </div>
            <a href="#!" @click="openMenu('tracks')">
                <div class="side-menu tracks">
                    <div class="side-menu-edge">
                        <p class="">Tracks</p>
                    </div>
                </div>
            </a>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['backendAddress', 'page', 'pageType', 'graphs', 'trackGraphs', 'selectedGraph', 'selectedNode', 'selectedAlbum', 'selectedTrack', 'tracks', 'selectedMenu','sideMenuLoading'],
        data() {
            return {
                isOpen: false,
            }
        },
        created() {
          bus.$on('sideMenu:open',(menu)=> { this.openMenu(menu)})
        },
        updated() {
        },
        methods: {
            openMenu(menu) {
                if (menu == this.selectedMenu) {
                    $('.graph-box-edge').animate({left: '-310px'}, 300);
                    this.$emit('sideMenu:select', null)
                } else {
                    $('.graph-box-edge').animate({left: '0px'}, 300);
                    this.$emit('sideMenu:select', menu)
                }

            },
            openCreateGraphDialog() {
              this.$emit("createGraphDialog:open")
            },
            getTracks() {
                return this.pageType == 'artist' ? this.selectedAlbum ? this.selectedAlbum.tracks : '' : this.selectedGraph.nodes;
            },
            isTrackSelected(t){
              return this.selectedTrack && this.selectedTrack.name == t.name
            },
            getTrackTitle($index) {
                var tracks = this.getTracks();

                if (this.pageType == 'artist')
                    return tracks[$index].name;
                else
                    return tracks[$index].name + ' - ' + tracks[$index].artistName;
            },
            graphClicked(graph, $el) {
                this.$emit("graph:show", {graph: graph, $el: $el})
                if(this.pageType == 'artist' && (this.selectedGraph == null || this.selectedGraph.id != graph.id)) {
                  this.openMenu("artists")
                } else if(this.selectedGraph == null || this.selectedGraph.id != graph.id){
                  this.openMenu("tracks")
                }
            },
            artistClicked(artist, $index, $el) {
                this.$emit("artist:show", {artist: artist, $index: $index, $el: $el})
                this.openMenu("albums")
            },
            albumClicked(album, artist, $el) {
                this.$emit("album:show", {album: album, artist: artist, $el: $el})
                this.openMenu("tracks")
            },
            trackClicked(track, $el) {
                this.$emit("track:play", {artist: this.selectedNode, track: track, $el: $el})
            },
            isTrackLiked(track) {
               return this.trackGraphs && this.trackGraphs.length > 0 && _.find(this.trackGraphs[0].nodes, (t) => t.spotifyId == track.spotifyId)
            },
            likeTrack(track,isLiked) {
              if(track.spotifyId) {
                this.$emit('track:like', track, isLiked)
              } else {
                axios.put(this.backendAddress + "api/tracks/spotifyData?id="+track.dbId)
                    .then((response) => {
                        var index = _.findIndex(this.selectedGraph.nodes, (n) => n.id == response.data.id)
                        track = this.selectedGraph.nodes[index] = response.data

                        this.$emit('track:like', track, isLiked)
                    }).catch((error) => {
                      if(error.response.status == 404) {
                        console.log("Song could not be found on Spotify : " + track.name)
                      }
                    })
              }
            }
        }
    };
</script>

<style>
    .graph-box-edge.selected {
        z-index: 999;
    }

    .side-menu-items.open .graph-box-edge {
        left: 0px;
    }

    .accordion-box {
      display: inline-flex;
      width: 100%;
      position: relative;
    }

    a.like-track-button {
      float: right;
      margin: 13px 5px 0 0;
      z-index: 99;
    }

    a.like-track-button img {
      width: 24px;
      height: 24px;
    }

    a.open-menu-button {
      float: right;
      margin: 15px 5px 0 0;
      z-index: 99;
    }

    a.open-menu-button img {
      width: 24px;
      height: 20px;
    }

    .track-options {
      display: inline-flex;
    }

    .side-menu-overlay {
      opacity: 0.25;
      background-color: yellow;
      position: absolute; /* Sit on top of the page content */
      /*display: none; *//* Hidden by default */
      width: 100%; /* Full width (cover the whole page) */
      height: 97%; /* Full height (cover the whole page) */
      top: 3px;
      left: 0;
      right: 0;
      bottom: 0;
      /*background-color: rgba(0,0,0,0.5); *//* Black background with opacity */
      z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
      cursor: pointer; /* Add a pointer on hover */
    }


    .side-menu {
        margin-left: 10px;
        background-color: #6892fc;
        left: 305px;
        position: absolute;
        top: 10px;
        width: 20px;
        height: 75px;
        box-shadow: 1px 1px 20px 10px #6892fc;
        overflow: hidden; /* Hide scrollbars */
    }

    .side-menu.artists {
        top: 95px;
    }

    .home .side-menu.artists {
      top: 25px;
    }

    .side-menu.albums {
        top: 170px;
    }

    .home .side-menu.albums {
      top: 95px;
    }

    .side-menu.tracks {
        top: 250px;
    }

    .home .side-menu.tracks {
      top: 170px;
    }

    .track-graph .side-menu.tracks {
        top: 95px;
    }

    .side-menu-edge {
        height: 100px;
        margin-left: 20px;
    }

    .side-menu p {
        color: #f6f328;
        transform: rotate(90deg);
        transform-origin: left top 0;
        font-weight: 500;
        font-size: 18px;
        font-family: Times New Roman;
    }

    .side-menu p a {
      color: #f6f328;
    }

    .side-menu p a:hover {
      text-decoration: none;
    }

    .side-menu .create-graph-button {
      margin-top: 33px;
    }

    .graph-box-edge {
        height: 350px;
        width: 300px;
        background-color: #006bff;
        position: absolute;
        top: 350px;
        left: -310px;
        background-color: #4f9aff;
    }

    .home .graph-box-edge {
      top: 750px;
    }
    .graph-box {
        margin-top: 10px;
        margin-left: 10px;
        background-color: white;
        height: 330px;
        width: 300px;
        overflow-y: scroll;
        background-color: #66b2dd;
        /*box-shadow: 1px 1px 20px 5px #6892fc;*/
    }


    .graph-box-edge.selected a div div p {
        color : #f4bd3a;
    }

    /* coloring */
    .graph-box {


    }

    /* Accordion */
    /* Style the buttons that are used to open and close the accordion panel */
    button.accordion {
        color: #f6f328;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        text-align: left;
        border: none;
        outline: none;
        transition: 0.4s;
    }

    /* Style the accordion panel. Note: hidden by default */
    div.panel {
        padding: 0 18px;
        background-color: white;
        display: none;
    }

    .graph-box-edge.selected a div div p, .graph-box-edge.selected .side-menu .side-menu-edge p a {
        color: #f4bd3a
    }


</style>
