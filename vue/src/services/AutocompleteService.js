import DbpediaService from '@/services/DbpediaService.js'
import LodService from '@/services/LodService.js'

var cache = {};

export default {
  configureEntity($scope, axios, callback) {
    $("#entity-input").autocomplete({
      minLength: 2,
      source: function (request, response) {
        var term = request.term;
        if (term in cache) {
          response(cache[ term ]);
          return;
        }

        DbpediaService.prefixSearch(axios, request.term, function (results) {
          cache[ term ] = response;
          response(results);
        });

      }, select: function (event, ui) {
        this.value = ui.item.value;
        $scope.searchValue = ui.item.value;

        $scope.selectedEntities = [];

        var e = _.find($scope.entities, {dbpediaUri: ui.item.uri}); // is property(entity) included in database?

        $scope.propertiesLoading = true;
        $('body').css('cursor', 'wait');
        if (e) {
          axios.get('api/getEntityById/' + e.id)
          .then(function (response) {
            callback(response.data);
          }, function (err) {
            printError(err);
          });
          return;
        } else {
          LodService.getItem(axios, ui.item.resource[0], callback);
        }

      }, change: function (event, ui) { // not-selected
        if (ui.item === null) {
          if (isUrl($("#entity-input").val())) {
            $scope.selectedEntity = {
              name: '',
              webUri: $("#entity-input").val(),
              entityType: 'web-page'
            };
          } else {
            $scope.selectedEntity = {
              name: $("#entity-input").val(),
              entityType: 'non-semantic-web'
            }
          }
        }
      }
    });
  },
  configureCustomObject(entities, axios, backendAddress, selectedCallback, changeCallback, callback) {
    $("#custom-object-input").autocomplete({
      minLength: 2,
      source: function (request, response) {
        var term = request.term;
        if (term in cache) {
          response(cache[ term ]);
          return;
        }

        DbpediaService.prefixSearch(axios, request.term, function (results) {
          cache[ term ] = response;
          response(results);
        });

      }, select: function (event, ui) {
        this.value = ui.item.value;

        var e = _.find(entities, {dbpediaUri: ui.item.resource[0]}); // is property(entity) included in database?

        selectedCallback()

        if (e) {
          axios.get(backendAddress + 'api/getEntityById/' + e.id)
          .then(function (response) {
            callback(response.data);
          }, function (err) {
            printError(err);
          });
          return;
        } else {
          LodService.getItem(axios, ui.item.resource[0], callback);
        }

      }, change: function (event, ui) { // not-selected
        // if (ui.item === null) {
        //   var r = {name: $('#custom-object-input').val(), entityType: 'non-semantic-web'};
        //
        //   callback(r.name == '' ? null : r);
        // } else {
        // }
        changeCallback()
      }
    });
  }, configureCustomProperty(axios, backendAddress, callback, changeCallback) {
    $("#custom-property-input").autocomplete({
      minLength: 2,
      source: function (request, response) {
        var term = request.term;
        if (term in cache) {
          response(cache[ term ]);
          return;
        }

        axios.get(backendAddress + 'api/autocomplete/property/' + request.term)
        .then(function (dbResponse) {
          cache[ term ] = dbResponse.data;

          var results = [];
          for (var i = 0; i < dbResponse.data.length; i++) {
            results.push({id: dbResponse.data[i].id, value: dbResponse.data[i].name, object: dbResponse.data[i]});
          }

          response(results);

        }, function (err) {
          printError(err);
        });
        return;

      }, select: function (event, ui) {
        this.value = ui.item.value;

        callback(ui.item.object);

      }, change: function (event, ui) { // not-selected
        if (ui.item === null) {
          var r = {name: $('#custom-property-input').val(), source: 'custom'};
          callback(r.name == '' ? null : r);
        } else {
        }
      }
    });
  },
  configureCategory($scope, component) {

    var topicClasses = "",  categoryClasses = "", subCategoryClasses = "", $parentScope = null
    if(component == "detail-summary") {
      topicClasses = "#entity-topic-input"
      categoryClasses = "#entity-category-input"
      subCategoryClasses = "#entity-subcategory-input"
      $parentScope = $scope.$parent
    } else if(component == "detail") {
      topicClasses = "#popup-entity-topic-input"
      categoryClasses = "#popup-entity-category-input"
      subCategoryClasses = "#popup-entity-subcategory-input"
      $parentScope = $scope.$parent.$parent
    } else if(component == "detail/side") {
      topicClasses = "#side-entity-topic-input"
      categoryClasses = "#side-entity-category-input"
      subCategoryClasses = "#side-entity-subcategory-input"
      $parentScope = $scope.$parent.$parent.$parent
    } else {
      console.error("configureCategory: Component arg should be given!")
    }

    $(topicClasses).autocomplete({
      minLength: 2,
      source: function (request, response) {
        var topics = [];
        for (var i = 0; i < $parentScope.topics.length; i++) {
          var t = $parentScope.topics[i];

          if (t.name.toLowerCase().indexOf(request.term.toLowerCase()) != -1)
          topics.push({id: t.id, label: t.name, value: t.name, categories: t.categories});
        }

        response(topics);
      }, select: function (event, ui) {
        if (!_.find($parentScope.topics, {name: ui.item.value})) {
          ui.item.value = _.find($scope.topics, {name: 'Other'}).name;
        }

        this.value = ui.item.value;
        $scope.topicInput = ui.item.value
        if($(this).attr("id") == "popup-entity-topic-input"){
          $scope.sideTopicInput = ui.item.value
          $scope.selectedTopic = {id: ui.item.id, name: ui.item.value, categories: ui.item.categories};
          $scope.selectedSideTopic = $scope.selectedTopic;
        } else if ($(this).attr("id") == "entity-topic-input") {
          $parentScope.selectedTopic = {id: ui.item.id, name: ui.item.value, categories: ui.item.categories};
        } else {
          $scope.sideTopicInput = ui.item.value
          $scope.selectedSideTopic = {id: ui.item.id, name: ui.item.value, categories: ui.item.categories};
        }

        return false;
      }, change: function (event, ui) { // not-selected
      }
    });

    $(categoryClasses).autocomplete({
      minLength: 2,
      source: function (request, response) {
        var topic;
        if ($($(this)[0].element).attr("id") == "entity-category-input")
        topic = $parentScope.selectedTopic;
        else if( $($(this)[0].element).attr("id") == "popup-entity-category-input")
        topic = $scope.selectedTopic
        else
        topic = $scope.selectedSideTopic;

        var cats = [];
        if (!topic || !topic.selectedCategory) {
          _.each($parentScope.topics, function (t) {
            _.each(t.categories, function (c) {
              if (c.name.toLowerCase().indexOf(request.term.toLowerCase()) != -1 && c.id != -1 && c.id != -2) {
                cats.push({id: c.id, label: c.name, value: c.name, subCategories: c.subCategories});
              }
            });
          });
        } else {
          for (var i = 0; i < topic.categories.length; i++) {
            var c = topic.categories[i];

            if (c.name.toLowerCase().indexOf(request.term.toLowerCase()) != -1)
            cats.push({id: c.id, label: c.name, value: c.name, subCategories: c.subCategories});
          }
        }

        response(cats);
      }, select: function (event, ui) {
        var topic;
        if ($(this).attr("id")== "entity-category-input")
        topic = $parentScope.selectedTopic;
        else if ($(this).attr("id") == "popup-entity-category-input")
        topic = $scope.selectedTopic
        else
        topic = $scope.selectedSideTopic;

        topic = _.find($parentScope.topics,{id:topic.id});

        if (!_.find(topic.categories, {name: ui.item.value})) {
          ui.item.value = _.find(topic.categories, {name: 'Other'}).name;
        }

        this.value = ui.item.value;
        $scope.categoryInput = ui.item.value

        if($(this).attr("id") == "popup-entity-category-input") {
          if($scope.selectedTopic) {
            $scope.sideCategoryInput = ui.item.value
            $scope.selectedTopic.selectedCategory = {id: ui.item.id, name: ui.item.value, subCategories: ui.item.subCategories};
            $scope.selectedSideTopic.selectedCategory = {id: ui.item.id, name: ui.item.value, subCategories: ui.item.subCategories};
          }
        } else if ($(this).attr("id") == "entity-category-input") {
          if($parentScope.selectedTopic) {
            $parentScope.selectedTopic.selectedCategory = {id: ui.item.id, name: ui.item.value, subCategories: ui.item.subCategories};
          }
        } else {
          $scope.sideCategoryInput = ui.item.value
          $scope.selectedSideTopic.selectedCategory = {id: ui.item.id, name: ui.item.value, subCategories: ui.item.subCategories};
        }

        return false;
      }, change: function (event, ui) { // not-selected
      }
    });

    $(subCategoryClasses).autocomplete({
      minLength: 2,
      source: function (request, response) {
        var topic;
        if ($($(this)[0].element).attr("id") == "entity-subcategory-input")
        topic = $parentScope.selectedTopic;
        else if($($(this)[0].element).attr("id") == "popup-entity-subcategory-input")
        topic = $scope.selectedTopic;
        else
        topic = $scope.selectedSideTopic;

        var subcats = [];
        if (!topic || !topic.selectedCategory) {
          _.each($parentScope.topics, function (t) {
            _.each(t.categories, function (c) {
              c.topic = topic;
              _.each(c.subCategories, function (sc) {
                if (sc.name.toLowerCase().indexOf(request.term.toLowerCase()) != -1 && c.id != -1 && c.id != -2) {
                  subcats.push({id: sc.id, label: sc.name, value: sc.name, category: c});
                }
              });
            });
          });
        } else {
          // topic.selectedCategory.subCategories = _.find(_.find($parentScope.topics,{id:topic.id}).categories,{id:topic.selectedCategory.id}).subCategories;

          for (var i = 0; i < topic.selectedCategory.subCategories.length; i++) {
            var sc = topic.selectedCategory.subCategories[i];

            var c = topic.selectedCategory;
            c.topic = topic;
            // sc.category && sc.category.id == topic.selectedCategory.id &&
            if (sc.name.toLowerCase().indexOf(request.term.toLowerCase()) != -1)
            subcats.push({id: sc.id, label: sc.name, value: sc.name, category: c});
          }
        }

        response(subcats);
      }, select: function (event, ui) {
        var topic;
        if ($(this).attr("id") == "entity-subcategory-input")
        topic = $parentScope.selectedTopic;
        else if ($(this).attr("id") == "popup-entity-subcategory-input")
        topic = $scope.selectedTopic;
        else
        topic = $scope.selectedSideTopic;

        if (!topic) {
          topic = _.find($parentScope.topics,{id:ui.item.category.topic.id});
          topic.selectedCategory = ui.item.category;

          topic.selectedCategory = _.find($parentScope.topics,function(t) {
            return _.find(t.categories,{id:ui.item.category.id});
          });
        } else if (!topic.selectedCategory){
          topic.selectedCategory = _.find($parentScope.topics,function(t) {
            return _.find(t.categories,{id:ui.item.category.id});
          });
        }

        if (!_.find(topic.selectedCategory.subCategories, {name: ui.item.value})) {
          ui.item.value = _.find(topic.selectedCategory.subCategories, {name: 'Other'}).name;
        }

        this.value = ui.item.value;
        $scope.subCategoryInput = ui.item.value

        if($(this).attr("id") == "popup-entity-subcategory-input") {
          if($scope.selectedTopic && $scope.selectedTopic.selectedCategory) {
            $scope.sideSubCategoryInput = ui.item.value
            $scope.selectedTopic.selectedCategory.selectedSubCategory = {id: ui.item.id, name: ui.item.value};
            $scope.selectedSideTopic.selectedCategory.selectedSubCategory = {id: ui.item.id, name: ui.item.value};
          }
        } else if ($(this).attr("id") == "entity-subcategory-input") {
          if($parentScope.selectedTopic && $parentScope.selectedTopic.selectedCategory) {
            $parentScope.selectedTopic.selectedCategory.selectedSubCategory = {id: ui.item.id, name: ui.item.value};
          }
        } else {
          $scope.sideSubCategoryInput = ui.item.value
          $scope.selectedSideTopic.selectedCategory.selectedSubCategory = {id: ui.item.id, name: ui.item.value};
        }

        return false;
      }, change: function (event, ui) { // not-selected
      }
    });
  },
  configureNewEntityCategory($scope) {

    $("#new-category-input").autocomplete({
      minLength: 2,
      source: function (request, response) {
        var cats = [];
        for (var i = 0; i < $scope.categories.length; i++) {
          var c = $scope.categories[i];

          if (c.name.toLowerCase().indexOf(request.term.toLowerCase()) != -1)
          cats.push({id: c.id, label: c.name, value: c.name, subCategories: c.subCategories});
        }

        response(cats);
      }, select: function (event, ui) {
        this.value = ui.item.value;

        $scope.selectedCategory = {id: ui.item.id, value: ui.item.value, subCategories: ui.item.subCategories};

        console.log(JSON.stringify(ui.item));

        return false;
      }, change: function (event, ui) { // not-selected
      }
    });

    $("#new-subcategory-input").autocomplete({
      minLength: 2,
      source: function (request, response) {
        var subcats = [];
        for (var i = 0; i < $scope.selectedCategory.subCategories.length; i++) {
          var sc = $scope.selectedCategory.subCategories[i];

          if (sc.categoryId == $scope.selectedCategory.id && sc.name.toLowerCase().indexOf(request.term.toLowerCase()) != -1)
          subcats.push({id: sc.id, label: sc.name, value: sc.name});
        }

        response(subcats);
      }, select: function (event, ui) {
        this.value = ui.item.value;

        $scope.selectedSubCategory = {id: ui.item.id, value: ui.item.value};

        console.log(JSON.stringify(ui.item));

        return false;
      }, change: function (event, ui) { // not-selected
      }
    });
  }
}
