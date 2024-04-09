import DbpediaService from '@/services/DbpediaService.js'
import WikidataService from '@/services/WikidataService.js'

export default {

  // to revert image change, delete "response.secondaryImage = item.image;" and decomment 15 and 18. lines, same for below 'fetch' method
  getItem(axios, uri, callback) {
    DbpediaService.getItem(axios, uri, (item) => {
      var response = item;

      if (item)
      response.secondaryImage = item.image;

      var sameAsWikidata = _.filter(item.properties, function(p){ return p.value && typeof p.value == 'string' && p.value.includes('wikidata.org/entity') && p.name == 'sameAs'});
      if(!item.wikidataId && sameAsWikidata.length > 0) {
        item.wikidataId = sameAsWikidata[0].value.substr(sameAsWikidata[0].value.indexOf('Q'),sameAsWikidata[0].value.length);
      }

      item.source = 'dbpedia';

      if(!item.wikidataId)
      callback(response);
      else (item.wikidataId)
      this.getItemFromWikidata(axios,item.wikidataId,response,callback);

    });
  },
  getItemFromWikidata(axios,wikidataId,response,callback) {
    WikidataService.getItem(axios, wikidataId, function (wikidataItem) {
      if (wikidataItem) {
        response.properties = response.properties.concat(wikidataItem.properties);
        response.shortDescription = wikidataItem.description;

        if (!response.image)
        response.image = wikidataItem.image;

        //                    response.secondaryImage = wikidataItem.image;
      }

      callback(response);
    });
  },
  getItemFromWikidataFirst(axios, wikidataId, callback) {
    WikidataService.getItem(axios, wikidataId, function (wikidataItem) {
      var response = wikidataItem;

      if (wikidataItem)
      response.secondaryImage = wikidataItem.image;

      //            var sameAsWikidata = _.filter(item.properties, function(p){ return p.value && typeof p.value == 'string' && p.value.includes('wikidata.org/entity') && p.name == 'sameAs'});
      //            if(!item.wikidataId && sameAsWikidata.length > 0) {
      //                item.wikidataId = sameAsWikidata[0].value.substr(sameAsWikidata[0].value.indexOf('Q'),sameAsWikidata[0].value.length);
      //            }

      if (true)
      DbpediaService.getItem(axios, uri, function (item) {
        if (wikidataItem) {
          response.properties = response.properties.concat(wikidataItem.properties);
          response.shortDescription = wikidataItem.description;

          if (!response.image)
          response.image = wikidataItem.image;

          //                    response.secondaryImage = wikidataItem.image;
        }

        callback(response);
      });
      else
      callback(response);
    });
  },
  fetchPropertyFromRelevantSource(axios, property, callback, errCallback) {
    if (property.source == 'wikidata') {
      WikidataService.getItem(axios, property.value, function (wikidataItem) {
        if (!wikidataItem) {
          errCallback();
          return;
        }

        callback(wikidataItem);

      });
    } else {
      DbpediaService.getItem(axios, property.value, function (item) {
        if (!item) {
          errCallback();
          return;
        }

        var response = item;

        if (item)
        response.secondaryImage = item.image;

        WikidataService.getItem(axios, item.wikidataId, function (wikidataItem) {
          if (wikidataItem) {
            response.properties = response.properties.concat(wikidataItem.properties);
            response.shortDescription = wikidataItem.description;

            if (!response.image)
            response.image = wikidataItem.image;

            //                        response.secondaryImage = wikidataItem.image;
          }

          callback(response);
        });

      });
    }
  }
}

function parseWikidataResponse($scope, wikidataItem) {
  if (wikidataItem) {
    $scope.selectedEntity.properties = $scope.selectedEntity.properties.concat(wikidataItem.properties);
    $scope.selectedEntity.shortDescription = wikidataItem.description;

    if (!$scope.selectedEntity.image)
    $scope.selectedEntity.image = wikidataItem.image;

    //            if (wikidataItem.image)
    //                $scope.selectedEntity.image = wikidataItem.image;
  }
}
