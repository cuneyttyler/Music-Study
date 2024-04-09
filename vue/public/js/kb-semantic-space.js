var semantic = (function () {

    var instance;

    function init(svgId, options) {

        function Link(source, target, value) {
            this.source = source;
            this.target = target;
            this.value = value;
            this.id = source + "_" + target;
        }

        function shortenName(name) {
            return name.length < 17 ? name : name.substr(0, 17) + "...";
        }

        // Graph Object //
        var graph = {
            nodes: [],
            links: [],
            force: null,
            svg: null,
            selectedNode: null,
            linkIndexes: [],
            clear: function () {
                this.nodes = [];
                this.links = [];
                this.linkIndexes = [];
            },
            merge: function (_graph) {
                this.selectedNode = _graph.selectedNode;

                var _nodes = _graph.nodes;
                var _links = _graph.links;
                for (var i = 0; i < _nodes.length; i++) {
                    // varsa ekleme
                    var index = this.nodes.map(function (node) {
                        return node.id;
                    }).indexOf(_nodes[i].id);

                    if (index === -1) {
                        this.nodes.push(_nodes[i]);
                    } else {
                        if (_nodes[i].selected)
                            this.nodes[index].selected = true;
                    }
                }
                for (i = 0; i < _links.length; i++) {

                    if (this.links.map(function (link) {
                            return link.source.id + '-' + link.target.id; // link.id
                        }).indexOf(_links[i].id) === -1) {
                        var sourceIndex = this.nodes.map(function (node) {
                            return node.id;
                        }).indexOf(_links[i].source.id);

                        var targetIndex = this.nodes.map(function (node) {
                            return node.id;
                        }).indexOf(_links[i].target.id);

                        var link = new Link(this.nodes[sourceIndex], this.nodes[targetIndex],
                            _links[i].value);

                        this.links.push(link);
                    }
                }
                svg.select('#' + this.selectedNode.id).select('image')
                    .attr('xlink:href', this.selectedNode.mediumImg)
            }
        };
        // ************ //

        var maxNode = 6;
        var width = !options.width ? 1200 : options.width, height = !options.height ? 800 : options.height;
        var color = d3.scale.category20();
        var force = d3.layout.force().gravity(0.05).distance(250).linkDistance(
            250).charge(-1000).size([width, height]).nodes(graph.nodes)
            .links(graph.links).on("tick", tick);


        var x = d3.scale.linear().domain([0, 1]).range([0, 1]);
        var y = d3.scale.linear().domain([1, 0]).range([1, 0]);

        var svgSelector = svgId ? "svg#" + svgId : "svg"
        var svg = graph.svg = d3.select(svgSelector).attr("width", width).attr("height", height)
            .attr("viewBox", "0 0 " + width + " " + height)

        if(options.zoom)
            svg.call(d3.behavior.zoom().x(x).y(y).scaleExtent([-2, 8]).on(
                    "zoom", tick));

        svg.html('');

        var node = svg.selectAll(".node");
        var link = svg.selectAll(".path");

        var lastSelectedNode;
        var showSimilars = false;
        var showNames = false;

        var browsePath = [];

        var IMAGE_SHRINK_RATIO = 0.05;

        function drawGraph(incomingGraph) {

            if (incomingGraph)
                graph.merge(incomingGraph);

            // Join
            node = node.data(force.nodes(), function (d) {
                return d.id;
            });
            link = link.data(force.links());

            link.style({
                opacity: adjustLinkOpacity
            });

            // Links //
            link.enter().insert("svg:path", "g").attr("class", "link")
                .style(
                    "stroke-width", function (d) {
                        return Math.sqrt(d.value);
                    })
                .style({
                    opacity: adjustLinkOpacity
                });

            link.exit()
                .remove();

            // ***** //

            function adjustLinkOpacity(d) {
                var showThisOne = false;
                for (var i = 0; i < graph.links.length; i++) {
                    if (graph.links[i].target.id == d.id &&
                        (graph.links[i].source.selected)) {
                        showThisOne = true; // because its neighbour is selected
                    }
                }

                for (var i = 0; i < browsePath.length; i++) {
                    if (browsePath[i].name == d.target.name) {
                        showThisOne = true;
                    }
                }

                if ((d.source.saved || d.source.selected)
                    && (d.target.saved || d.target.selected)) {
                    return 1;
                } else {
                    if (showSimilars || d.source.selected || showThisOne)
                        return 0.8;
                    else
                        return 0;
                }
            }

            node.attr("join", "update")
                .style({
                    opacity: adjustNodeOpacity
                });

            // Nodes //
            var enterNode = node.enter().append("g").attr("id", function (d) {
                return d.id;
            }).attr("class", "node")
                .style({
                    opacity: adjustNodeOpacity
                })
                .call(force.drag);

            node.exit()
                .remove();

            function adjustNodeOpacity(d) {

                // if it is selected show its neighbours
                var showThisOne = false;
                for (var i = 0; i < graph.links.length; i++) {
                    if (graph.links[i].target.id == d.id &&
                        (graph.links[i].source.selected)) {
                        showThisOne = true; // because its neighbour is selected
                    }
                }

                for (var i = 0; i < browsePath.length; i++) {
                    if (browsePath[i].name == d.name) {
                        showThisOne = true;
                    }
                }

                if (d.showTransparent && !d.selected) {
                    return 0.8;
                } else if (!d.saved && !d.selected) {
                    if (showSimilars || showThisOne)
                        return 0.8;
                    else
                        return 0;
                } else {
                    return 1;
                }
            }

            var clipPath = enterNode.append("clipPath")
                .attr("id", function (d) {
                    return "clipPath_" + d.id;
                })
                .attr("class", "clippath");

            clipPath.append("circle").attr("r", function (d) {
                var doScale = d.image.width > 100

                if (d.image.height < d.image.width) {
                    return doScale ? 30 : d.image.height / 2;
                } else {
                    return doScale ? 30 : d.image.width / 2;
                }
            });

            /*
             * node.append("circle") .attr("r",5) .attr("r", 10) .style("fill",
             * "#FF6600");
             */

            enterNode.attr("name", function (d) {
                return d.name.toLowerCase();
            });

            enterNode.append("image").attr("width", function (d) {
                return d.image.width;
            }).attr("z-index", 99)
                .attr("height", function (d) {
                    return d.image.height;
                }).attr("xlink:href", function (d) {
                return d.image.src;
            }).attr('image-rendering', 'optimizeQuality').attr('x',
                function (d) {
                    return d.x;
                }).attr('y', function (d) {
                return d.y;
            }).attr("clip-path", function (d) {
                return "url(#clipPath_" + d.id + ")";
            });

            enterNode.append("text").attr("dx", function (d) {
                var circle = svg.select("#clipPath_" + d.id).select("circle");
                var tmp = getVisualLength(d.name) / 2;
                if (circle.empty() || circle.attr("cx") == null) {
                    return tmp - 100;
                } else {
                    return circle.attr("cx") - tmp - 100;
                }
            }).attr("dy", function (d) {
                var circle = svg.select("#clipPath_" + d.id).select("circle");
                if (circle.empty()) {
                    return 15;
                } else {
                    var cy = Number.isInteger(parseInt(circle.attr("cy"))) ? parseInt(circle.attr("cy")) : 0;
                    var r = Number.isInteger(parseInt(circle.attr("r"))) ? parseInt(circle.attr("r")) : 0;
                    return cy + r + 15;
                }
            }).attr("class", "text").text(function (d) {
                return shortenName(d.name);
            });

            enterNode.append("path").attr("stroke", "blue")
                .attr("stroke-width", function (d) {
                    if (d.saved) {
                        return 0; // 5
                    } else {
                        return 0;
                    }
                })
                .attr("fill", "none")
                .attr("id", function (d) {
                    return "path-" + d.id;
                }).attr("d", function (d) {
                    var num = d.image && d.image.height && Number.isInteger(d.image.height) ? parseInt(d.image.height / 2) :  0

                    var path = "M 0, 0" +
                        " m 0, " + num + " " +
                        " a 15,15 0 1,0 60,0" +
                        " a 15,15 0 1,0 -60,0";

                    return path;
            });

            node.on("mouseover", function (d, i) {
                d3.select(this).select('.text').style({opacity: 1});
            });

            node.on("mouseout", function (d, i) {
                d3.select(this).select('.text').style({opacity: adjustTextOpacity});
            });

            $(document).bind('communitiesDetected', function (e, communities) {
                for (var nodeId in communities) {
                    var community = communities[nodeId];

                    var node = svg.select("#" + nodeId);

                    var width = node.select("image").attr("width");
                    var height = node.select("image").attr("height");

                    node
                        .insert("circle", ".clippath")
                        .attr("cx", width * 3 / 4)
                        .attr("cy", height * 3 / 4)
                        .attr("r", "24")
                        .attr("stroke", communityColor(community))
                        .attr("stroke-width", "5")
                        .attr("class", "community");
                }

                drawGraph();
            });

            function communityColor(c) {
                switch (c) {
                    case 0 :
                        return "blue";
                    case 1 :
                        return "darkred";
                    case 2 :
                        return "yellow";
                    case 3 :
                        return "orange";
                    case 4 :
                        return "purple";
                    case 5 :
                        return "brown";
                }
            }

            $(document).bind('artistClicked', function (e, nodeData) {
                if (lastSelectedNode) {
                    lastSelectedNode.element.select(".selected-circle").attr("display", "none");
                    lastSelectedNode.data.selected = false;
                }

                // set selected opacity 1 / not working yet...
                nodeData.selected = true;

                lastSelectedNode = {
                    element: d3.select(this),
                    data: nodeData
                };
            });

            $(document).bind('dataFetched', function (e, nodeData) {
//                var node = svg.select('#' + nodeData.id);
////
//                if (lastSelectedNode) {
//                    lastSelectedNode.element.select(".selected-circle").attr("display", "none");
//                    lastSelectedNode.data.selected = false;
//                }
//
//                // set selected opacity 1 / not working yet...
//                nodeData.selected = true;
//
//                lastSelectedNode = {
//                    element: node,
//                    data: nodeData
//                };
            });

            node.on("click", function (d, i) {
                var tmp = d.name.replace(" ", "+").toLowerCase();
                tmp = escape(tmp);

                // lastfm url
                var url = "http://www.lastfm.com.tr/music/" + tmp;

                if (d3.event.which == 1) {
//                    getSubGraph(d.name);

                    $.event.trigger('nodeClicked', d);

                    if (!d.saved) {
                        browsePath.push(d);
                    } else {
                        browsePath = [];
                    }

                    if (lastSelectedNode) {
                        lastSelectedNode.element.select(".selected-circle").attr("display", "none");
                        lastSelectedNode.data.selected = false;
                    }

                    // set selected opacity 1 / not working yet...
                    d.selected = true;

                    lastSelectedNode = {
                        element: d3.select(this),
                        data: d
                    };

//                    highlightNode(lastSelectedNode);

//                    setTimeout(function () {
//                        drawGraph();
//                    }, 300);

                } else if (d3.event.which == 2) {
                    var win = window.open(url, "lastfm");
                    win.focus();
                }

            });

            var img = d3.select("image");
            img.on("click", function (d, i) {

            });

            $(document).bind('nodeSaved', function (e, nodeName) {
                for (var i = 0; i < graph.nodes.length; i++) {
                    if (graph.nodes[i].name == nodeName) {
                        graph.nodes[i].saved = true;
                    }
                }

//                drawGraph();
            });

            $(document).bind('nodeRemoved', function (e, nodeName) {
                var ii = -1;
                for (var i = 0; i < graph.nodes.length; i++) {
                    if (graph.nodes[i].name == nodeName) {
                        ii = i;
                    }
                }

                if (ii != -1)
                    graph.nodes[ii].saved = false;

                for (var i in graph.links) {
                    var l = graph.links[i];

                    var removeNode;
                    if (nodeName == l.source.name) {
                        removeNode = l.target.name;
                    } else if (nodeName == l.target.name) {
                        removeNode = l.source.name;
                    }

                    for (var ii in graph.links) {
                        var ll = graph.links[ii];

                        if (removeNode == ll.source.name && ll.target.saved) {
                            removeNode = undefined;
                        } else if (removeNode == ll.target.name && ll.source.saved) {
                            removeNode = undefined;
                        }
                    }

                    if (removeNode) {
                        for (var ii in graph.nodes) {
                            var n = graph.nodes[ii];
                            if (removeNode == n.name && !n.saved)
                                graph.nodes.splice(ii, 1);
                        }
                    }
                }

                for (var i in graph.links) {
                    var l = graph.links[i];

                    if ((l.source.name == nodeName && !l.target.saved) || (l.target.name == nodeName && !l.source.saved)) {
                        graph.links.splice(i, 1);
                    }
                }

                drawGraph();
            });

            $(document).bind('goToNodePosition', function (e, nodeName) {
                goToNodePosition(nodeName);
            });

            $(document).bind('drawGraph', function (e, nodeName) {
                drawGraph();
            });

            force.start();
        }

        function slowlyGoToNodePosition(nodeName, ms, count, remained) {
            setTimeout(function () {
                goToNodePosition(nodeName);

                if (!remained) remained = count;
                if (remained-- > 0) {
                    slowlyGoToNodePosition(ms, count, remained)
                } else {
                    return;
                }

            }, ms / count);
        }

        function goToNodePosition(nodeName) {
            var node = svg.select('g[name = "' + nodeName + '"]');

            if (node[0][0] == null) return;

            var x = parseInt(node.attr('x')) - 500;
            var y = parseInt(node.attr('y')) - 100;

            svg.attr('viewBox', x + ' ' + y + " 1200 800");
        }

        setTimeout(function () {
            drawGraph();
        }, 1000);

        $(document).bind('showHideSimilars', function (e) {
            showSimilars = !showSimilars;
            drawGraph();
        });

        $(document).bind('showHideNames', function (e) {
            showNames = !showNames;

            node.selectAll('.text').style({'opacity': adjustTextOpacity});
        });


        function transform(d) {
            var width = d.image.width > 100 ? 100 : d.image.width;
            var height = d.image.width > 100 ? d.image.height * 100 / d.image.width : d.image.height;

            return "translate(" + (x(d.x) - width * 1.5) + ","
                + (y(d.y) - height * 1.5) + ")";
        }

        function adjustTextOpacity(d) {
            if (d.selected || showNames) {
                return 1;
            } else {
//                return 1;
                return (scaleValue - 0.05) * (2 / 0.8);
//                return (scaleValue - 0.4) * (1 / 0.8);
            }
        }

        var scaleValue = 1;

        function tick() {

            // Zoom event
            if (d3.event != null && d3.event.scale != null) {
                scaleValue = d3.event.scale;
                node.selectAll('.text').style({'opacity': adjustTextOpacity});

            }

            link.attr('d', function (d) {
                var deltaX = x(d.target.x) - x(d.source.x);
                var deltaY = y(d.target.y) - y(d.source.y);
                var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                var normX = deltaX / dist;
                var normY = deltaY / dist;

                var sourceX = x(d.source.x) + (normX);
                var sourceY = y(d.source.y) + (normY);
                var targetX = x(d.target.x) - (normX);
                var targetY = y(d.target.y) - (normY);

                return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ','
                    + targetY;
            });

            node.attr("transform", transform);
            node.attr("x", function (d) {
                var width = d.image.width > 100 ? 100 : d.image.width;
                return (x(d.x) - width / 2)
            });
            node.attr("y", function (d) {
                var height = d.image.width > 100 ? d.image.height * 100 / d.image.width : d.image.height;
                return (y(d.y) - height / 2)
            });
        }

        // Kaynak :
        // http://blog.mastykarz.nl/measuring-the-length-of-a-string-in-pixels-using-javascript/
        // d3 selectionından offsetwidth'e dogrudan erişemediğimizden uzadı.
        function getVisualLength(text) {
            var ruler = d3.select("#ruler");
            var ruler2 = ruler[0];
            ruler.html(text);
            var length = ruler2[0].offsetWidth;
            ruler.html(null);
            return length;
        }

        function imgOnLoad(image, nodeId) {

            var img = svg.select("#" + nodeId).select("image");
            var clipPath = svg.select("#clipPath_" + nodeId).select("circle");
            var text = svg.select("#" + nodeId).select("text");

            var doScale = image.width > 100;
            var width = doScale ? 100 : image.width
            var height = doScale ? parseInt(image.height * 100 / image.width,10) : image.height

            var shrinkShareX = 0, shrinkShareY = 0

            // Image
            img.attr("width", width);
            img.attr("height", height);
            img.attr('x', function (d) {
                return doScale ? width - shrinkShareX : width / 4;
            }).attr('y', function (d) {
                return doScale ? height - shrinkShareY : height / 4 + 60;
            });

            // ClipPath
            if (clipPath.attr('r') == 0) {
                clipPath.attr("r", 30);
            }
            clipPath.attr("cx", doScale ? width + 50 - shrinkShareX : width * 3 / 4);
            clipPath.attr("cy", doScale ? height + height * 0.5 - shrinkShareY : height * 3 / 4 + 60);

            // Text
            text.attr("dx", function (d) {
                var tmp = getVisualLength(shortenName(d.name)) / 2;
                return doScale ? width - tmp + 50 : width - tmp - 50;
            });
            text.attr("dy", function (d) {
                var cy = parseInt(clipPath.attr("cy"));
                var r = parseInt(clipPath.attr("r"));
                var y = cy + r + 15;
                return doScale ? y : y;
            });
            text.attr("class", "text");

            svg.select("#" + nodeId).attr("selected", function (d) {
                    if (d.selected) {
                        lastSelectedNode = {
                            element: svg.select("#" + nodeId),
                            data: d
                        };

                        highlightNode(svg.select("#" + nodeId), doScale, shrinkShareX, shrinkShareY);
                    } else {
                        removeHighlight(svg.select("#" + nodeId));
                    }
                }
            );
        }

        function removeHighlight(node) {
            node.selectAll("circle.selected-circle").remove();
        }

        function highlightNode(node, shrink, shrinkShareX, shrinkShareY) {
            node
                .append("filter")
                .attr("id", function (d) {
                    return "filter-" + d.id;
                })
                .append('feGaussianBlur')
                .attr("in", "SourceGraphic")
                .attr("stdDeviation", "5");

            var width = node.select("image").attr("width");
            var height = node.select("image").attr("height");

            node
                .insert("circle", ".clippath")
                .attr("cx", shrink ? width + 50 - shrinkShareX : width * 3 / 4)
                .attr("cy", shrink ? height + height * 0.5 - shrinkShareY : height * 3 / 4 + 60)
                .attr("r", "25")
                .attr("fill", "yellow")
                .attr("class", "selected-circle")
                .attr("filter", function (d) {
                    return "url(#filter-" + d.id + ")";
                });

            node.attr("display", "block");
        }

        function createHTMLImage(url, id) {
            var image = new Image();
            image.src = url;
            image.onload = function () {
                imgOnLoad(this, id);
            };
            return image;
        }

        function processIncomingData(data, _showSimilars) {

            if (_showSimilars)
                showSimilars = _showSimilars;

            // image url'inin alınarak Image() objesine dönüstürülmesi.
            var nodes = data.nodes;
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].image = createHTMLImage(nodes[i].mediumImg, nodes[i].id);
            }

            if (lastSelectedNode) {
                //lastSelectedNode.element.select(".selected-circle").attr("display", "none");
                //lastSelectedNode.data.selected = false;
            }

            svg.selectAll("circle.community").remove();

            drawGraph(data);
        }

        var getSubGraph = function (artist) {
            var lowerArtist = artist.toLowerCase();

            // sag panel'in update edilmesi.
            d3.select("#artist_text").html(lowerArtist);
//            lowerArtist = lowerArtist.replaceAll(" ", "+");

            // Get Graph
            $.ajax({
                url: encodeURI("/semantic/api/getGraph/" + lowerArtist),
                method: "GET",
                success: function (data) {
                    processIncomingData(data);
                }
            });

            return false;
        };

        var clear = function () {
//            graph.clear();
//            force.nodes([]);
//            force.links([]);
            svg.html('');
        };

        var getGraphFromLastFM = function (artist) {
            var lowerArtist = artist.toLowerCase();

            d3.select("#artist_text").html(lowerArtist);
            lowerArtist = lowerArtist.replace(" ", "+");

            var nodes = [], links = [];
            for (var i = 0; i < data.similarartists.artist; i < data.similarartists.artist.length) {

            }

            // Get Graph
            $.ajax({
                url: encodeURI("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + lowerArtist + "&api_key=ecc2e1fc920c9fcbcc19ba8790570691&format=json"),
                method: "GET",
                success: function (data) {
                    processIncomingData(data);
                }
            });

            return false;
        };

        return {
            foo: function (artist) {
                graph.svg.html('');
                getSubGraph(artist);
//                getGraphFromLastFM(artist);
            },

            processIncomingData: processIncomingData,
            clear: clear
        };
    }

    return {

        createNewInstance: function (svgId, options) {
            instance = init(svgId, options);

            return instance;
        },

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (svgId) {

            if (!instance) {
                instance = init(svgId);
            }

            return instance;
        }
    };
})
();