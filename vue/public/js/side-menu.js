var sideMenu = (function () {

    var create = function($scope) {
        var $graphsMenu = $('.graph-box-edge.graphs');
        var $albumsMenu = $('.graph-box-edge.albums');
        var $artistsMenu = $('.graph-box-edge.artists');
        var $tracksMenu = $('.graph-box-edge.tracks');

        $scope.sideMenus.push({$el: $graphsMenu, isOpen: false});
        $scope.sideMenus.push({$el: $albumsMenu, isOpen: false});
        $scope.sideMenus.push({$el: $artistsMenu, isOpen: false});
        $scope.sideMenus.push({$el: $tracksMenu, isOpen: false});

        $scope.openMenu = null;

        $scope.openGraphMenu = function () {
            putOtherMenusBack($graphsMenu);

            if (isOpen($graphsMenu)) {
                $('.graph-box-edge').animate({left: '-290px'}, 300);
            }
            else {
                $('.graph-box-edge').animate({left: '0px'}, 300);
            }

            setOpen($graphsMenu, !isOpen($graphsMenu));
        };

        $scope.albumMenuOpen = false;
        $scope.openAlbumMenu = function () {
            putOtherMenusBack($albumsMenu);

            if (isOpen($albumsMenu))
                $('.graph-box-edge').animate({left: '-290px'}, 300);
            else
                $('.graph-box-edge').animate({left: '0px'}, 300);

            setOpen($albumsMenu, !isOpen($albumsMenu));
        };

        $scope.artistMenuOpen = false;
        $scope.openArtistMenu = function () {
            putOtherMenusBack($artistsMenu);

            if (isOpen($artistsMenu))
                $('.graph-box-edge').animate({left: '-290px'}, 300);
            else
                $('.graph-box-edge').animate({left: '0px'}, 300);

            setOpen($artistsMenu, !isOpen($artistsMenu));
        };

        $scope.trackMenuOpen = false;
        $scope.openTrackMenu = function () {
            putOtherMenusBack($tracksMenu);

            if (isOpen($tracksMenu))
                $('.graph-box-edge').animate({left: '-290px'}, 300);
            else
                $('.graph-box-edge').animate({left: '0px'}, 300);

            setOpen($tracksMenu, !isOpen($tracksMenu));
        };

        function putOtherMenusBack($thisMenu) {
            $thisMenu.css({'z-index': 999});

            _.each($scope.sideMenus, function (menu) {
                if ($thisMenu[0] != menu.$el[0]) {
                    menu.$el.css({'z-index': 1});
                    menu.isOpen = false;
                    $(menu.$el).removeClass("selected");
                }
            });
        }

        function setOpen($el, isOpen) {
            _.each($scope.sideMenus, function (item) {
                if (item.$el[0] == $el[0]) {
                    item.isOpen = isOpen;
                    $(item.$el).addClass("selected");
                }
            });
        }

        function isOpen($el) {
            var ret = false;
            _.each($scope.sideMenus, function (item) {
                if (item.$el[0] == $el[0]) {
                    ret = item.isOpen;
                }
            });

            return ret;
        }
    }

    return {
        create: create
    }
})();