<template>
    <section id="right" v-if="selectedNode && selectedNode.mediumImg">
        <div id="right_inner">
            <div>
                <!--<label class="info-label mb-15">image:</label>-->

                <div class="info-image">
                    <img v-bind:src="selectedNode.mediumImg"/>
                </div>
            </div>

            <div class="row">
                <div v-if="selectedNode" class="col-md-12">
                    <div class="form-group">
                        <label class="info-title">{{selectedNode.name}}</label><br>
                        <label v-if="selectedNode.artistName" class="info-artist-name">{{selectedNode.artistName}}</label>

                        <!--<div class="info-text">{{selectedNode.bioSummary}}</div>-->
                    </div>

                    <div class="form-group">
                        <!--<label class="info-label mb-15">description:</label>-->
                        <hr style="color:white; margin-top: 10px; margin-bottom:15px;">

                        <div class="info-text description" v-html="selectedNode.bioSummary"></div>
                    </div>
                    <section class="catalogue-tags">
                        <ul class="tags-list tags-list--global">
                            <li class="tag" v-for="tag in selectedNode.tags">
                                <a href="#">{{tag.name}}</a>
                            </li>
                        </ul>
                    </section>
                    <div class="icon-section">
                            <a :href="lastfm_url" target="_blank"><img src="../assets/lastfm-icon.png" class="external-icon"></a>
                            <a :href="spotify_url" target="_blank"><img src="../assets/spotify-icon.png" class="external-icon"></a>
                    </div>  
                    <!--<div class="form-group" v-if="!isEntitySaved() && !propertiesLoading">-->
                    <!--<label class="blue">Category</label>-->
                    <!--<input type="text" class="form-control" id="entity-category-input">-->
                    <!--</div>-->
                    <div class="form-group right-save-button">
                        <input type="button" class="btn btn-default blue" value="Save"
                               v-if="page != 'home' && !selectedNode.saved && showSaveButton()"
                               @click="saveNode()">
                        <input type="button" class="btn btn-default blue" value="Remove"
                               v-if="page != 'home' && selectedNode.saved"
                               @click="removeNode()">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        props: ['backendAddress', 'page', 'selectedNode', 'isNodeSaved'],
        data() {
            return {
            }
        },
        async created() {

        },
        methods: {
            showSaveButton() {
                return this.page == 'graph' && !this.isNodeSaved;
            },
            saveNode() {
                this.$emit('node:save')
            },
            removeNode() {
                this.$emit('node:remove')
            }
        },
        computed: {
            lastfm_url: function() {
                return "https://www.last.fm/music/" + encodeURIComponent(this.selectedNode.name.replace(' ', '+'))
            },
            spotify_url: function() {
                return "https://open.spotify.com/artist/" + encodeURIComponent(this.selectedNode.spotifyId)
            }
        }
    };
</script>

<style>

    .right-save-button {
        margin-top: 10px;
    }

    .right-save-button input {
        width: 100px;
    }

    .info-title {
      margin-top: 5px;
      color: white;
      font-size: 18px;
      font-family: "Times New Roman";
    }

    .info-artist-name {
      color: white;
      font-size: 16px;
      font-family: "Times New Roman";
      margin: 0
    }

    .catalogue-tags {
        display: flex;
    }

    .icon-section {
        margin: 10px 0 0 0;
        display: flex;
    }

    .external-icon {
        margin-right: 2px;
        width: 30px;
        height: 30px;
    }
</style>
