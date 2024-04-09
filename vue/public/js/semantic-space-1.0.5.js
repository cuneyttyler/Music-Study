var semantic = (function () {

    var artistInstance;
    var trackInstance;

    function init(svgId, type, options) {

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
        var width = !options || !options.width ? 960 : options.width, height = !options || !options.height ? 350 : options.height;
        var color = d3.scale.category20();
        var force = d3.layout.force().gravity(0.05).distance(250).linkDistance(
            250).charge(-1000).size([width, height]).nodes(graph.nodes)
            .links(graph.links).on("tick", tick);


        var x = d3.scale.linear().domain([0, 1]).range([0, 1]);
        var y = d3.scale.linear().domain([1, 0]).range([1, 0]);

        var svgSelector = svgId ? "svg#" + svgId : "svg"
        var svg = graph.svg = d3.select(svgSelector).attr("width", width).attr("height", height)
            .attr("viewBox", "0 0 " + width + " " + height)
            .call(
                d3.behavior.zoom().x(x).y(y).scaleExtent([-2, 8]).on(
                    "zoom", tick));

        svg.html('');

        var node = svg.selectAll(".node");
        var link = svg.selectAll(".path");

        var lastSelectedNode;
        var showSimilars = true;
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
                        return 0.6;
                    else
                        return 0;
                }
            }

            node.attr("join", "update")
                .style({
                    opacity: adjustNodeOpacity
                }).attr("selected", (d)=> {
                  if(d.selected && svg.select("#" + d.id).select("image").attr("width") != "0") {
                    removeHighlight(svg.selectAll("g"))
                    return highlightNode(svg.select("#" + d.id))
                  } else {
                    return false;
                  }
                })

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
                    return 0.6;
                } else if (!d.saved && !d.selected) {
                    if (showSimilars || showThisOne)
                        return 0.6;
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
                    return tmp - 80;
                } else {
                    return circle.attr("cx") - tmp - 80;
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
                var num = d.image && d.image.height && Number.isInteger(d.image.height) ? parseInt(d.image.height / 2) : 0

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

                   removeHighlight(svg.selectAll("g"))
                   highlightNode(lastSelectedNode.element);

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

            $(document).unbind('goToNodePosition');
            $(document).bind('goToNodePosition', function (e, nodeId) {
                slowlyGoToNodePositionV2(nodeId,500,100);

                removeHighlight(svg.selectAll("g"));
                highlightNode(svg.select("#" + nodeId));
            });

            $(document).bind('drawGraph', function (e, nodeName) {
                drawGraph();
            });

            force.start();
        }

        function helper(nodeId,ms,count,remaining,initialX,initialY) {

            // 20 -> 0.05      0.05*20 = 1
            if(remaining-- > 0){
                goToNodePosition(nodeId,1/count,initialX,initialY);
                setTimeout(function() {
                    helper(nodeId,ms,count,remaining,initialX,initialY)
                },ms/count);
            } else return;
        }

        function slowlyGoToNodePositionV2(nodeId,ms,count) {
            var initialX = parseFloat(parseFloat(svg.attr('viewBox').split(' ')[0]).toFixed(3));
            var initialY = parseFloat(parseFloat(svg.attr('viewBox').split(' ')[1]).toFixed(3));
            helper(nodeId,ms,count,count,initialX,initialY);
        }

        function goToNodePosition(nodeId,fraction, initialX, initialY) {
            var node = svg.select('g[id = "' + nodeId + '"]');

            if(node[0][0] == null) return;

            var currX = parseFloat(parseFloat(svg.attr('viewBox').split(' ')[0]).toFixed(3));
            var currY = parseFloat(parseFloat(svg.attr('viewBox').split(' ')[1]).toFixed(3));
            var targetX = parseFloat(parseFloat(node.attr('x')).toFixed(3)) - 500;
            var targetY = parseFloat(parseFloat(node.attr('y')).toFixed(3)) - 100;

            var distanceX = initialX > targetX ? initialX - targetX : targetX - initialX;
            var distanceY = initialY > targetY ? initialY - targetY : targetY - initialY;

            var x = currX > targetX ? currX - parseFloat((distanceX * fraction).toFixed(3)) : currX + parseFloat((distanceX * fraction).toFixed(3));
            var y = currY > targetY ? currY - parseFloat((distanceY * fraction).toFixed(3)) : currY + parseFloat((distanceY * fraction).toFixed(3));

            svg.attr('viewBox', x + ' ' + y + " 960 500");
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
            // node.attr("x", function (d) {
            //     var width = 100
            //     return (x(d.x) - width)
            // });
            // node.attr("y", function (d) {
            //     var height = d.image.height * 100 / d.image.width
            //     return (y(d.y) -  parseInt(height,10))
            // });

            node.attr("x", function (d) {
                var width = d.image.width > 100 ? 100 : d.image.width;
                return (x(d.x) - width / 2)
            });
            node.attr("y", function (d) {
                var height = d.image.width > 100 ? d.image.height * 100 / d.image.width : d.image.height
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

        function imgOnLoad(image, node, graph) {
            n = _.find(graph.nodes, (n) => n.id == node.id)
            if(n.imgLoaded) return
            n.imgLoaded = true

            var nodeId = node.id

            var img = svg.select("#" + nodeId).select("image");
            var clipPath = svg.select("#clipPath_" + nodeId).select("circle");
            var text = svg.select("#" + nodeId).select("text");

            var doScale = image.width > 100;
            var width = doScale ? 100 : image.width
            var height = doScale ? parseInt(image.height * 100 / image.width, 10) : image.height

            // var doScale = true
            // var width = 100, height = parseInt(image.height * 100 / image.width, 10)

            var shrinkShareX = 0, shrinkShareY = 0

            var scaleAdd = (100 - width) / 2 - 10

            // Image
            img.attr("width", width);
            img.attr("height", height);
            img.attr('x', function (d) {
                return doScale ? width : width + scaleAdd;
            }).attr('y', function (d) {
                return  doScale ? height : height + scaleAdd
            });

            // ClipPath
            if (clipPath.attr('r') == 0) {
                clipPath.attr("r", 30);
            }
            clipPath.attr("cx", doScale ? width + width * 0.5 : width + width * 0.5 +  scaleAdd)
            clipPath.attr("cy", doScale ? height + height * 0.5 : height + height * 0.5 +  scaleAdd)

            // Text
            text.attr("dx", function (d) {
                var tmp = getVisualLength(shortenName(d.name)) / 2;
                return doScale ? width - tmp + 57 : width - tmp + 60;
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

                        removeHighlight(svg.selectAll("g"))
                        highlightNode(svg.select("#" + nodeId));
                    } else {
                        removeHighlight(svg.select("#" + nodeId));
                    }
                }
            );
        }

        function removeHighlight(node) {
            node.selectAll("circle.selected-circle").remove();
        }

        function highlightNode(node, doScale, shrinkShareX, shrinkShareY) {
            if(!node) {
              return
            }
            node
                .append("filter")
                .attr("id", function (d) {
                    return "filter-" + d.id;
                })
                .append('feGaussianBlur')
                .attr("in", "SourceGraphic")
                .attr("stdDeviation", "5");

            var width = parseInt(node.select("image").attr("width"));
            var height = parseInt(node.select("image").attr("height"));
            var doScale = width >= 100;

            node
                .insert("circle", ".clippath")
                .attr("cx", doScale ? width + width * 0.5 : width + 40)
                .attr("cy", doScale ? height + height * 0.5 : height + 40)
                .attr("r", "35")
                .attr("fill", "yellow")
                .attr("class", "selected-circle")
                .attr("filter", function (d) {
                    return "url(#filter-" + d.id + ")";
                });

            node.attr("display", "block");
        }

        function createHTMLImage(url, node, graph) {
            var image = new Image();
            image.src = url;
            image.onload = function () {
                imgOnLoad(this, node, graph);
            };
            return image;
        }

        function processIncomingData(data, _showSimilars) {

            if (_showSimilars)
                showSimilars = _showSimilars;

            // image url'inin alınarak Image() objesine dönüstürülmesi.
            var nodes = data.nodes;
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].image = createHTMLImage(nodes[i].mediumImg, nodes[i], this.graph);
            }

            if (lastSelectedNode) {
                //lastSelectedNode.element.select(".selected-circle").attr("display", "none");
                //lastSelectedNode.data.selected = false;
            }

            svg.selectAll("circle.community").remove();

            drawGraph(data);
        }

        var clear = function () {
//            graph.clear();
//            force.nodes([]);
//            force.links([]);
            svg.html('');
        };

        return {
            graph: graph,
            processIncomingData: processIncomingData,
            clear: clear,
            type: type
        };
    }

    return {

        createNewInstance: function (svgId, type, options) {
            if (type == 'artist') {
                artistInstance = init(svgId, type, options);
                return artistInstance;
            } else {
                trackInstance = init(svgId, type, options);
                return trackInstance;
            }
        },

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (svgId, type) {

            if (type == 'artist' && !artistInstance) {
                artistInstance = init(svgId, null, type);
                return artistInstance;
            } else if (type == 'track' && !trackInstance) {
                trackInstance = init(svgId, null, type);
                return trackInstance;
            }

            if (type == 'artist')
                return artistInstance;
            else
                return trackInstance;
        }
    };
})
();
