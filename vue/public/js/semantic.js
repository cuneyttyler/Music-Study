var app = new Vue({
    delimiters : ['[[',']]'],
    el: '#app',
    data: {
        searchInput: 'Led Zeppelin',
        page : 'search',
        graph : {nodes: [], links: []},
        selectedNode : [],
        artists : []
    },
    methods: {
        fetchData(nodeName) {
            axios.get("/api/getNode/" + nodeName)
                .then(response => {
                    var incomingGraph = response.data;
                    for(var i in incomingGraph.nodes) {
                        if(incomingGraph.nodes[i].name.toLowerCase() == nodeName.toLowerCase()) {
                            this.selectedNode = incomingGraph.nodes[i];
                        }
                    }

                    if(this.page == 'search' && !_.find(this.artists, {id : this.selectedNode.id}))
                        this.artists.push(this.selectedNode);

                    for (var i = 0; i < response.data.nodes.length; i++) {
                        var n = _.find(this.graph.nodes, {id: response.data.nodes[i].id});

                        if (!n) {
                            this.graph.nodes.push(response.data.nodes[i]);
                        } else {
                            var j = _.findIndex(this.graph.nodes,{name : n.name});
                            this.graph.nodes[j] = n;
                        }
                    }

                    for(var i in response.data.links)
                        this.graph.links.push(response.data.links[i]);

                    var node = this.graph.nodes.filter(n => n.name.toLowerCase() == nodeName.toLowerCase())[0]
                    node.selected = true;
                    incomingGraph.selectedNode = n;

                    semantic.getInstance().processIncomingData(incomingGraph);

                    axios.get("/api/albums/" + this.selectedNode.name + "/" + this.selectedNode.mbid)
                        .then(response => {
                            this.selectedNode.albums = response.data;

                            $.event.trigger('dataFetched', this.selectedNode);
                            setupAccordion();
                            $('.info-text').find('a').attr('target', '_blank');
                        });

                })
        },
        search() {
            $('.album-box-edge').animate({left: '-290px'}, 300);
            this.page = this.page == 'graph' ? 'graph' : 'search';

            var node = this.graph.nodes.filter(n => n.name.toLowerCase() == this.searchInput.toLowerCase())[0];

            if (node) {
                $.event.trigger('goToNodePosition', node.name.toLowerCase());
            } else {
                this.fetchData(this.searchInput.toLowerCase());
            }
        }
    }
})

