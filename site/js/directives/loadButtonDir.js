angular.module('organizr')

.directive('loadButton', ['CubeService', 'LoadService', function(cs, ls){
    return {

        restrict : 'A',

        scope: {},

        link: function(scope, element, attrs) {

            element.find('input')

            .bind('click', function(event) {
                event.target.value = '';
                console.log('loadButtonDirective "click" binding');
            })

            .bind('change', function(event){
                console.log('loadButtonDirective "change" binding');
                scope.file = event.target.files[0];
                scope.reader = new FileReader();
                scope.reader.onload = function(event){
                    scope.$apply(function() {
                        scope.newFile = event.target.result;
                        console.log('loadButtonDirective reader "onload" binding. scope.newFile.length:' + scope.newFile.length);
                        var newCube = cs.validateCubeData(scope.newFile);
                        if (newCube[0] === "success"){
                            cs.overwriteCube(newCube[1]);
                        } else {
                            console.log('loadButtonDirective reader "onload" binding. Load Failed.\n' + newCube[1]);
                            //Alerts, etc. - Fill in later.
                        }
                    })
                };


                scope.reader.readAsText(scope.file);
            });

        },

        templateUrl: '/organiz-r/site/templates/loadButtonTemplate.html'
    }
}]);

/*
Make 'LoadService'. LoadService has 'triggerLoad()'. triggerLoad() targets the dummy, hidden #loadInput element.
The dummy #loadInput element is rendered via a full directive (called the 'loadButton' directive)
'loadButton' has...
1) a template that includes its HTML component (an <input> element and its styling),
2) its 'click' event binding (triggered by the triggerLoad() function in the LoadService), and
3) its 'change' event (triggered by the selection of a file from the summoned File Browser window).
Then, by injecting the CubeService and LoadService into the 'loadButton' directive, heavy code can be delegated back out of the loadButton directive, back to the appropriate service.
Therefore, to load files...
1) inject the 'LoadService' into the controller that contains the element which will be used (via whatever event) to load a file.
2) add a passthrough function to that controller, linking to LoadService.triggerLoad().
3) then, bind the '[controllerAlias].triggerLoad()' function to the target element-&-event.
 */