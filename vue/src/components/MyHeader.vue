<template>
    <div>
        <header>
            <form id="searchbox" class="searchbox form-inline" onsubmit="return false;">

                <div class="form-group">
                </div>
                <div class="form-group"></div>
            </form>

            <div class="form-group header-items">
                <div class="wide-logo"><img src="../assets/wide-logo.png"></div>
            </div>
        </header>
    </div>
</template>
<script>
    import {VueAutosuggest} from 'vue-autosuggest'

    export default {
        props: ['backendAddress', 'user','page', 'pageType'],
        components: {
          VueAutosuggest
        },
        data() {
            return {
                searchInput: 'Led Zeppelin',
                showGraphTitle: 'Show Track Graph',
                suggestions: [{data: []}]
            }
        },
        computed: {
            filteredOptions() {
                return [
                    {
                        data: this.suggestions[0].data.filter(option => {
                            return option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                        })
                    }
                ];
            }
        },
        async created() {
        },
        async updated() {
        },
        methods: {
            search() {
                this.$emit('search', this.searchInput)
            },
            onSearchInputChanged(text) {
                if (text.length < 2) {
                    return
                }

                var type = 1;
                if (this.pageType == 'artist')
                    type = 1;
                else
                    type = 2;

                axios.get(this.backendAddress + "api/lookup/" + type + "/" + encodeURIComponent(text))
                    .then((resp) => {
                        var results = [];
                        for (var i = 0; i < resp.data.length; i++) {
                            var d = resp.data[i];

                            var value;
                            if (type == 1) {
                                value = d.name;
                            } else {
                                value = d.name + "(" + d.artists[0].name + ")";
                            }
                            var r = {
                                id: d.id,
                                name: d.name
                            }

                            r = {result: d, name: d.name}

                            if (type == 2) {
                                r.name = d.name + " (" + d.artists[0].name + ")";
                            }

                            results.push(r)
                        }

                        this.suggestions[0].data = results.splice(0, 5)
                    }, printError);
            },
            onSearchSelected(item) {
                this.$emit('search:result', item.item)
            },
            login() {
                this.$emit('login:show')
            },
            logout() {
                axios.get(this.backendAddress + 'api/user/logout')
                    .then((response) => {
                        document.cookie = 'apitoken='
                        window.location.href = '/'
                    }, function (err) {
                        printError(err)
                    })
            },
            register() {
                this.$emit('register:show')
            },
            settings() {
                this.$emit('settings:show')
            },
            showArtistOrTrackGraph() {
                this.$emit("showArtistOrTrackGraph")

                if (this.pageType == 'artist') {
                    this.showGraphTitle = 'Show Artist Graph';
                    this.searchInput = 'Stairway to Heaven';
                    this.searchInputArtist = 'Led Zeppelin';
                } else {
                    this.showGraphTitle = 'Show Track Graph';
                    this.searchInput = 'Led Zeppelin';
                    this.searchInputArtist = 'Led Zeppelin';
                }
            }
        }
    };
</script>

<style>
    .demo {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .wide-logo {
      position: absolute;
      left: 660px;
      top: 5px;
    }

    .wide-logo img {
      height: 50px;
    }

    .home header {
      /* background-color: #6923caa8; */
      background-color: #7978a4;
      /* background-color: #3a4abb; */
    }

    input {
        width: 260px;
        padding: 0.5rem;
    }

    ul {
        width: 100%;
        color: rgba(30, 39, 46, 1.0);
        list-style: none;
        margin: 0;
        padding: 0.5rem 0 .5rem 0;
    }

    li {
        margin: 0 0 0 0;
        border-radius: 5px;
        padding: 0.75rem 0 0.75rem 0.75rem;
        display: flex;
        align-items: center;
        max-width: 250px;
    }

    li:hover {
        cursor: pointer;
    }

    .autosuggest__results-container {
        background-color: white;
    }

    .autosuggest-container {
        display: flex;
        justify-content: center;
        width: 280px;
    }

    #autosuggest {
        width: 100%;
        display: block;
    }

    .autosuggest__results-item--highlighted {
        background-color: rgba(51, 217, 178, 0.2);
    }

    form.searchbox {
      position: absolute;
      z-index: 99
    }

    @media only screen and (min-width: 1600px) {
      .wide-logo {
        left: 800px;
      }
    }
</style>
