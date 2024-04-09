import LodUtils from '@/services/LodUtils.js'

//    var lookupUri = "http://lookup.dbpedia-spotlight.org/api/search/PrefixSearch?QueryClass=&MaxHits=5&QueryString=";
var lookupUri = "https://lookup.dbpedia.org/api/search/PrefixSearch?QueryString=";

export default {
  prefixSearch(axios, term, onSuccess) {

    var req = {
      method: "GET",
      headers: {
        //               'Access-Control-Allow-Origin': 'origin'
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      url: lookupUri + term + "&format=application%2Fjson-ld"
    }
    axios(req)
    .then(function (response) {
      console.log("\nStatus: " + response.status);

      response.data.docs.forEach(function (r) {
        r.id = r.label;
        r.value = r.label;
      });

      onSuccess(response.data.docs);
    },
    function (err) {
      console.log("ERROR: " + JSON.stringify(err));
    });
  },

  // live.
  getItem (axios, uri, onSuccess) {
    var jsonLDUri = 'http://dbpedia.org/sparql?default-graph-uri=' +
    'http%3A%2F%2Fdbpedia.org&query=DESCRIBE%20' +
    '%3C' + uri + '%3E' + // <dbpedia.org/resource/item>
    '&' +
    'format=application%2Fjson-ld';

    $.ajax({
      url: jsonLDUri,
      jsonp: "callback",
      dataType: "jsonp",
      success: function( response ) {
        var item = response[uri];

        if (!item) {
          onSuccess(null);
          return;
        }

        // if(item['http://dbpedia.org/ontology/wikiPageRedirects']) {
        //   var redirectUri = item['http://dbpedia.org/ontology/wikiPageRedirects'].value
        //   item = response[redirectUri]
        // }

        var image = item['http://xmlns.com/foaf/0.1/depiction'] ? item['http://xmlns.com/foaf/0.1/depiction'][0].value : "";
        var description = item['http://dbpedia.org/ontology/abstract'] && _.find(item['http://dbpedia.org/ontology/abstract'], {lang: 'en'}) ? _.find(item['http://dbpedia.org/ontology/abstract'], {lang: 'en'}).value : "";
        var wikipediaUri = item['http://xmlns.com/foaf/0.1/isPrimaryTopicOf'] ? item['http://xmlns.com/foaf/0.1/isPrimaryTopicOf'][0].value : "";

        if (!_.find(item['http://www.w3.org/2000/01/rdf-schema#label'], {lang: 'en'})) {
          onSuccess(null);
          return;
        }

        var entity = {
          name: _.find(item['http://www.w3.org/2000/01/rdf-schema#label'], {lang: 'en'}).value,
          description: description,
          image: image,
          entityType: 'semantic-web',
          dbpediaUri: uri,
          wikipediaUri: wikipediaUri,
          properties: []
        };

        var wikidata_uri = _.filter(item['http://www.w3.org/2002/07/owl#sameAs'], function (obj) {
          return obj.value.match('.*wikidata\\.org.*');
        });

        if (wikidata_uri !== null) {
          entity.wikidataId = wikidata_uri[0] && wikidata_uri[0].value ? wikidata_uri[0].value.split('/')[wikidata_uri[0].value.split('/').length - 1] : "";
        }

        for (var property in item) {
          if (item.hasOwnProperty(property)) {
            for (var i = 0; i < item[property].length; i++) {
              var p = {
                name: LodUtils.getTypeNameFromUri(property),
                lang: item[property][i].lang ? item[property][i].lang : null,
                datatype: item[property][i].datatype ? item[property][i].datatype : null,
                propertyType: item[property][i].type ? item[property][i].type : null,
                value: item[property][i].value ? item[property][i].value : null,
                uri: property,
                source: 'dbpedia'
              };

              if (p.propertyType == 'uri') {
                p.valueLabel = p.value.split('/')[p.value.split('/').length - 1];
              }

              entity.properties.push(p);
            }
          }
        }

        onSuccess(entity);
      }
    });
  },

  getWikidataId(axios, label, onSuccess) {
    var jsonLDUri = 'http://live.dbpedia.org/sparql?default-graph-uri=' +
    'http%3A%2F%2Fdbpedia.org&query=' +
    'SELECT+%3Furi+%3FsameAs%0D%0AWHERE+%7B%0D%0A%3Furi+rdfs%3Alabel+%22' + encodeURI(label) + '%22%40en+.%0D%0A%3Furi+owl%3AsameAs+%3FsameAs%0D%0A%7D' +
    '&' +
    'format=application%2Fjson-ld';

    axios.jsonp(jsonLDUri)
    .then(function (response) {
      var item = response.data[uri];

      if (!item) {
        onSuccess(null);
        return;
      }



      onSuccess(entity);

    },
    function
    (err) {
      console.log("ERROR: " + err);
    })
}
}
