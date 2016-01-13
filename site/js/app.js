var app = angular.module('organizr', []);

/*The Cube Package so far:
filePath : <string> (& whatever other files are required for saving)
cubeProperties: [<prop1>, <prop2>, <...>] (Validated upon Opening, Saving - later, cube always stored / returned as anonymous closure for security's sake)
cube:[
    { <prop1>: [<val1>, <val2>, <...>], <prop2>: [<val1>, <val2>, <...>],  <...>  },
    { <prop1>: [<val1>, <val2>, <...>], <prop2>: [<val1>, <val2>, <...>],  <...>  },
    { <prop1>: [<val1>, <val2>, <...>], <prop2>: [<val1>, <val2>, <...>],  <...>  },
    { <...> },
] (Array of objects. Each object has same properties, which should be accurately reflected in 'cubeProperties'. Each property's value is an array of STRINGS, as many as desired & technically feasible.)

Add Prop upon 'Column Add' - loop entire list and append a designated Property to each Object in the Cube array.
Delete Prop upon 'Column Delete - ditto above for deletion.
** Integrity Function? **
Add cube[obj][prop][value] upon submit of 'value button' in cell.
Delete cube[obj][prop][value] upon submit of 'value button' in cell.
** Preload autofill arrays? **

*/

var cubeProperties = [ //Contrived cubeProperties to thrash until Installation of "Real Cube" code.
    "House Address",
    "Manager",
    "Utilities",
    "Amenities",
    "Property Type",
    "Rent Amount / Mo"
];

var cube = [ //Example cube to thrash until Installation of "Real Cube" code.
    {
          "House Address" : ["510 NE 123rd St Seattle WA 98125"]
        , "Manager" : ["Thomas Knowles"]
        , "Utilities" : ["Gas Heat", "Electric Water Heater", "Electric Range", "Internet", "Phone"]
        , "Amenities": ["Small Front Yard", "Large Back Yard", "Wood Shed", "Covered Rear Porch", "Hardwood Floors"]
        , "Property Type" : ["Single Family"]
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
];