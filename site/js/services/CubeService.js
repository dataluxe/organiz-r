angular.module('organizr')
.factory("CubeService", function CubeServiceFactory(){
    return {

        oldCube : {}
        //oldCube is overwritten with the current Cube just before the Cube is emptied or overwritten, as when the 'New' or 'Load' sequences execute.

        , cubeProperties : [ //Contrived cubeProperties to thrash until Installation of "Real Cube" code.
        "House Address",
        "Manager",
        "Utilities",
        "Amenities",
        "Property Type",
        "Rent Amount / Unit"
        ],

        cube: [ //Example cube to thrash until Installation of "Real Cube" code.
            {
                "House Address" : ["510 NE 123rd St Seattle WA 98125"]
                , "Manager" : ["Thomas Knowles"]
                , "Utilities" : ["Gas Heat", "Electric Water Heater", "Electric Range", "Internet", "Phone"]
                , "Amenities": ["Small Front Yard", "Large Back Yard", "Wood Shed", "Covered Rear Porch", "Hardwood Floors"]
                , "Property Type" : ["Single Family","No Pets"]
                , "Rent Amount / Unit" : ["1850.00"]
            },{
                "House Address" : ["11316 2nd Ave NW Seattle WA 98125"]
                , "Manager" : ["Thomas Knowles"]
                , "Utilities" : ["Gas Heat", "Electric Water Heater", "Electric Range", "Internet", "Phone"]
                , "Amenities": ["Medium Front Yard", "Medium Back Yard", "Back Patio", "Covered Front Porch", "Hardwood Floors"]
                , "Property Type" : ["Single Family"]
                , "Rent Amount / Unit" : ["1850.00"]
            },{
                "House Address" : ["11410 Roosevelt Way NE Seattle WA 98125"]
                , "Manager" : ["Danny Phung"]
                , "Utilities" : ["Electric HVAC", "Electric Water Heater", "Electric Range", "Internet"]
                , "Amenities": ["Medium Back Yard", "Covered Back Patio", "Second-Story Deck", "Hardwood Floors", "Skylights"]
                , "Property Type" : ["Double-Family Duplex"]
                , "Rent Amount / Unit" : ["1700.00"]
            },{
                "House Address" : ["11716 8th Ave NE Seattle WA 98125"]
                , "Manager" : ["Danny Phung"]
                , "Utilities" : ["Electric HVAC", "Electric Water Heater", "Electric Range", "Internet", "Phone", "Cable"]
                , "Amenities": ["Medium Back Yard", "Second-Story Deck", "Hardwood Floors", "Skylights", "Single-Car Garage"]
                , "Property Type" : ["Four-Family Quadplex"]
                , "Rent Amount / Unit" : ["1600.00"]
            },{
                "House Address" : ["2330 N 122nd St Seattle WA 98133"]
                , "Manager" : ["Anna Alexeyev"]
                , "Utilities" : ["Electric Heat", "Electric Water Heater", "Electric Range", "Internet"]
                , "Amenities": ["Covered Designated Parking", "Hardwood Floors"]
                , "Property Type" : ["Six-Unit Apartment"]
                , "Rent Amount / Unit" : ["1200.00"]
            },{
                "House Address" : ["12028 1st Ave NE Seattle WA 98125"]
                , "Manager" : ["Anna Alexeyev"]
                , "Utilities" : ["Electric HVAC", "Gas On-Demand Water Heater", "Gas Range", "Internet", "Phone", "Cable"]
                , "Amenities": ["Large Dinner Patio", "Three-Car Garage", "Large Back Yard", "Large Front Yard", "Outbuilding", "Tile Floors", "Skylights"]
                , "Property Type" : ["Single Family"]
                , "Rent Amount / Unit" : ["2700.00"]
            },{
                "House Address" : ["16203 6th Ave NE Shoreline WA 98155"]
                , "Manager" : ["Thomas Knowles"]
                , "Utilities" : ["Gas Heat", "Gas Water Heater", "Gas Range", "Internet", "Phone", "Cable"]
                , "Amenities": ["Tile Floors", "Hardwood Floors", "Single-Car Garage w/ Storage", "Medium Back Yard", "Small Front Yard", "Patio"]
                , "Property Type" : ["Double-Family Duplex"]
                , "Rent Amount / Unit" : ["1800"]
            }
        ]

        , ogrRegex: /^\[(?:\{(?:"(?:[\u0020\u0021\u0023-\u005B\u005D-\uffff]|(?:\\\\)|(?:\\\")){1,50}":\[(?:"(?:(?:[\u0020\u0021\u0023-\u005B\u005D-\uffff]|(?:\\\\)|(?:\\\")){0,500})"(?:,(?="))?){0,20}\](?:,(?=\"))?){0,19}\}(?:,(?=\{))?){0,499}\]$/


        , cellRemoveValue : function(row, cell, value){
            cell.splice(cell.indexOf(value), 1);
        }

        , cellAddValue : function(newValue, cell){
            if (["", null, undefined].indexOf(newValue) != -1){console.log("Tiles must have a value.");return}
            cell.push(newValue);
        }

        , columnAdd : function(newColumn){
            var cp = this.cubeProperties;
            if (cp.indexOf(newColumn) != -1) {console.log("Duplicate column names not allowed!");return}
            cp.push(newColumn);
            this.cube.forEach(function(element, index, array){
                element[newColumn] = [];
            });
        }

        , rowRemove : function(item){
            this.cube.splice(this.cube.indexOf(item), 1);
        }

        , columnRemove : function(column){
            var cp = this.cubeProperties;
            cp.splice(cp.indexOf(column), 1);
            for(var i = 0; i < this.cube.length;){
                delete this.cube[i][column];
                if (Object.keys(this.cube[i]).length === 0) {
                    this.cube.splice(this.cube[i], 1)
                }
                else {i++}
            }
        }

        //this.rowAddNewRowBlank = function(){
        //    var returnObject = {};
        //    for (var i = 0; i < this.cubeProperties.length; i++) {
        //        returnObject[this.cubeProperties[i]] = [];
        //    }
        //    this.cube.push(returnObject);
        //};

        , rowAddNewRowData : function(){
            var elementArray = $("#newRow :input"); //The 'Add Row' row has an ID of 'newRow'.
            var returnObject = {};
            for (var i = 0, ret; i < elementArray.length; i++) {
                ret = (elementArray[i].value || null);
                //then, clear the text...
                elementArray[i].value = null;
                returnObject[this.cubeProperties[i]] = (ret === null ? [] : [ret])
            }
            this.cube.push(returnObject);
        }

        , validateCubeData : function(data) {
            //return array: [ [success/failure] string, [message] string ]

            //1. Validate that incoming Data is in JSON.
            try {
                var testParse = JSON.parse(data)
            }
            catch (e) {
                console.log("Failure: Target File does not contain data in JSON.");
                return ["failure", "Target file does not contain valid JSON data."];
            }

            console.log("CubeService.validateCubeData(): data successfully parsed in JSON.");

            //2. Validate OGR structure, number of items at each level (Rows, Columns, Values), number of characters in Headers/Values

            if (this.ogrRegex.test(data) === false) {
                console.log("CubeService.validateCubeData(): data FAILED OGR regex match.");
                return ["failure", "Target file contains valid JSON data, but is not in valid OGR format."]
            }

            console.log("CubeService.validateCubeData(): data successfully parsed as OGR format via regex.");

            //3. Validate uniformity of Columns.

            var loadCube = JSON.parse(data);

            if (loadCube.length < 2) {
            console.log("Success: Number of OGR Rows < 2. No Column validation required.");
            return ["success", loadCube];
            }

            var leadKeys = Object.keys(loadCube[0]);

            for (var i=1; i<loadCube.length; i++) {
                var s = Object.keys(loadCube[i]);
                for (var j=0; j< s.length; j++) {
                    if (!(s[j]===leadKeys[j])) {
                        console.log("Failure: Property [" + j + "] of OGR item [" + i + "] don't match that of the lead OGR item.");
                        return ["failure", "Some Rows' properties are misnamed, or out-of-order."];
                    }
                }
            }

            //4. If all is well, return success
            console.log("Success: All Rows' properties match.");
            return ["success", loadCube];

        }

        , overwriteCube : function (data){

            //This block contains reference-overwrite code, which results in non-renders.
            // ------------------------------------------------------------------
            console.log("CubeService.overwriteCube() fired. Data: " + data);
            if (data == null) {
                this.oldCube = [];
                this.cube = [];
                this.cubeProperties = [];
            } else {
                this.oldCube = this.cube;
                this.cube = data;
                this.cubeProperties = Object.keys(this.cube[0]);
            }
            // ------------------------------------------------------------------

            //This block contains modify-in-place code, which results in proper renders.
            // ------------------------------------------------------------------
            //if (data == null) {
            //    this.cube.splice(0);
            //    this.cubeProperties.splice(0);
            //} else {
            //    this.cube.splice(0);
            //    for (var i = 0; i < data.length; i++) {
            //        this.cube.splice(i, 0, data[i]);
            //    }
            //    this.cubeProperties.splice(0);
            //    var keys = Object.keys(this.cube[0]);
            //    for (i = 0; i < keys.length; i++) {
            //        this.cubeProperties.splice(i, 0, keys[i]);
            //    }
            //}
            // ------------------------------------------------------------------

        }

        , isCubeChanged : function () {
            return _.isEqual(this.oldCube, this.cube)
        }

    }
});