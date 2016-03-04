angular.module('organizr')
    .factory("LoadService", function LoadServiceFactory() {
        return {
            incomingData : undefined,
            triggerLoad : function() {
                console.log('LoadService.triggerLoad().');
                $('#loadButton').trigger('click');
            },
            testService : function(data) {
                console.log('LS.testService(). data: \n' + data)
            }
        }
    });