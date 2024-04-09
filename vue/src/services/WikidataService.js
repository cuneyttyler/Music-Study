export default {

  prefixSearch(axios, term, onSuccess) {

    axios.jsonp("https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&uselang=en&type=item&search= " + term)
    .then(function (response) {
      console.log("Data: " + response + "\nStatus: " + status);

      var results = [];
      // parse data
      for (var i = 0; i < response.data.search.length; i++) {
        var r = response.data.search[i];

        results.push(
          {
            uri: r.concepturi,
            id: r.label,
            wikidataId: r.id,
            label: r.label,
            value: r.label,
            description: r.description
          });
        }

        onSuccess(results);
      },
      function (err) {
        console.error("ERROR: " + JSON.stringify(err));
      });
    },
    getImageUrl(axios, fileName, onSuccess) {

      $.ajax({
        url: "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&redirects&format=json&iiurlwidth=250&titles=File:" + fileName,
        jsonp: "callback",
        dataType: "jsonp",
        success: (response) => {
          console.log("Data: " + response + "\nStatus: " + status);

          var obj = response.query.pages;
          obj[Object.keys(obj)[0]];

          onSuccess(obj[Object.keys(obj)[0]].imageinfo[0].url);
        },
        error: (err) => {
          console.error("ERROR: " + JSON.stringify(err));
        }
      });

    },

    getItem(axios, id, onSuccess) {
      var uri = 'https://www.wikidata.org/w/api.php?action=wbgetentities' +
      '&ids=' + id + '&languages=en&format=json';

      $.ajax({
        url: uri,
        jsonp: "callback",
        dataType: "jsonp",
        success: (response) => {
          var abstract = '';

          if (!response.entities) {
            onSuccess(null);
            return
          }

          var item = response.entities[id];

          var entity = {
            wikidataId: id,
            name: item.labels["en"].value,
            entityType: 'semantic-web',
            properties: []
          };

          if (item.descriptions && item.descriptions["en"]) {
            entity.description = item.descriptions["en"].value;
          }

          var ids = [];
          for (var propertyId in item.claims) {
            ids.push(propertyId);

            var datatype = item.claims[propertyId][0].mainsnak.datatype;
            if (datatype == "wikibase-item" ||
            datatype == "wikibase-property") {
              for (var i = 0; i < item.claims[propertyId].length; i++) {
                if (item.claims[propertyId][i].mainsnak.datavalue)
                ids.push(item.claims[propertyId][i].mainsnak.datavalue.value.id);
              }
            }
          }

          getLabels(axios, ids, (labels) => {

            for (var propertyId in item.claims) {
              for (var i = 0; i < item.claims[propertyId].length; i++) {

                if(!labels[propertyId]) continue;

                var description = labels[propertyId].descriptions["en"] ? labels[propertyId].descriptions["en"].value : '';

                var p = {
                  source: 'wikidata',
                  uri: 'https://www.wikidata.org/wiki/Property:' + propertyId,
                  datatype: item.claims[propertyId][0].mainsnak.datatype,
                  name: labels[propertyId].labels["en"].value,
                  description: description,
                  subproperties: []
                };

                var claim = item.claims[propertyId][i];
                if (claim.mainsnak.datavalue) {
                  var value = claim.mainsnak.datavalue.value;

                  if ((p.datatype == "wikibase-item" || p.datatype == "wikibase-property")
                  && Object.keys(labels[value.id].labels).length === 0) {
                    break;
                  }

                  if (p.datatype == "wikibase-item") {
                    p.value = value.id;
                    p.valueLabel = labels[value.id].labels["en"].value;
                  } else if (p.datatype == "wikibase-property") {
                    p.value = value.id;
                    p.valueLabel = labels[value.id].labels["en"].value;
                  } else if (p.datatype == "external-id") {
                    p.value = value;
                  } else if (p.datatype == "monolingualtext") {
                    p.value = value.text;
                  } else if (p.datatype == "commonsMedia") {
                    p.value = value;
                  } else if (p.datatype == "string") {
                    p.value = value;
                  } else if (p.datatype == "url") {
                    p.value = value;
                  } else if (p.datatype == "math") {
                    p.value = value;
                  } else if (p.datatype == "globe-coordinate") {
                    p.subproperties.push({name: 'latitude', value: value.latitude + ""});
                    p.subproperties.push({ name: 'longitude', value: value.longitude + ""});
                  } else if (p.datatype == "time") {
                    p.value = value.time;
                    p.subproperties.push({name: 'time', value: value.time});
                    p.subproperties.push({ name: 'timezone', value: value.timezone});
                    p.subproperties.push({ name: 'before', value: value.before});
                    p.subproperties.push({name: 'after', value: value.after});
                    p.subproperties.push({name: 'precision', value: value.precision});
                    p.subproperties.push({name: 'calendarmodel', value: value.calendarmodel});
                  } else if (p.datatype == "geo-shape") {

                  } else if (p.datatype == "quantity") {
                    p.subproperties.push({name: 'amount', value: value.amount});
                    p.subproperties.push({ name: 'unit', value: value.unit});
                    p.subproperties.push({ name: 'upperbound', value: value.upperbound});
                    p.subproperties.push({name: 'lowerbound', value: value.lowerbound});
                  }

                  entity.properties.push(p);
                }
              }
            }

            if (!entity.image || entity.image == '') {
              var fileName = _.find(entity.properties, {uri: 'https://www.wikidata.org/wiki/Property:P18'});

              if (fileName) {
                this.getImageUrl(axios, fileName.value, function (img) {
                  entity.image = img;
                  onSuccess(entity)
                });
              } else {
                onSuccess(entity);
              }
            } else {
              onSuccess(entity);
            }

          });
        }
      });
    }

  }

  var getLabels = function (axios, ids, onSuccess) {
    var baseUri = 'https://www.wikidata.org/w/api.php?action=wbgetentities&languages=en&props=labels|descriptions&format=json&ids=';
    var uris_length = Math.floor(ids.length / 50 + 1);

    var uris = [];

    for (var j = 0; j < uris_length; j++) {
      var uri = baseUri;
      for (var i = j * 50; i < j * 50 + 50; i++) {
        if (i > ids.length - 1) break;
        uri += ids[i];
        if (i < ids.length - 1) uri += '|';
      }

      uris.push(uri);
    }

    var arr = [];
    for (var i = 0; i < uris.length; i++) {
      arr.push(
        $.ajax({
          url: uris[i],
          jsonp: "callback",
          dataType: "jsonp",
          success: function( response ) {}
        })
      );
    }

    $.when.apply($,arr).then(function() {
      if(!arguments || arguments.length == 0 || !arguments[0].entities) {
        console.error('Cannot find response to parallel label request!');
        onSuccess([]);
        return;
      }

      var entities = {};
      for(i in arguments[0].entities) {
        var e = {}
        e[i] = arguments[0].entities[i]
        entities = $.extend(e, entities);
      }
      // arguments[0].entities.forEach(function (response) {
      // });

      onSuccess(entities);
    });
    // $q.all(arr).then(function (responses) {
    //         var entities = {};
    //         responses.forEach(function (response) {
    //             entities = $.extend(response.data.entities, entities);
    //         });
    //
    //         onSuccess(entities);
    //     },
    //     function (err) {
    //         console.log("ERROR: " + JSON.stringify(err));
    //     });
  };
