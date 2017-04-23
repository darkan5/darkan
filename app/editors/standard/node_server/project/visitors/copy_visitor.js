var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js');

module.exports = CopyVisitor;


function CopyVisitor() {
    this.projectVariables = [];
}

CopyVisitor.prototype.visit = function(project) {
	var _that = this;
}

CopyVisitor.prototype.copyProjectVariables = function() {

    var sourceProjectOptions = this.getSourceProjectOptopns();
    var destinationProjectOptions = this.getDestinationProjectOptopns();

    var sourceProjectVariables = sourceProjectOptions.projectVariables;
    var destinationProjectVariables = destinationProjectOptions.projectVariables;

    var tempVariables = [];

    for (var i = 0; i < this.projectVariables.length; i++) {

        var varhash1 = this.projectVariables[i];


        var variableExist = false;

        for (var j = 0; j < destinationProjectVariables.length; j++) {
             var varhash2 = destinationProjectVariables[j].varhash;

             if(varhash1 == varhash2){
                variableExist = true;
                break;
             }
        };

        if(!variableExist){
            var variable = this.getSourceProjectVariablesByHash(varhash1, sourceProjectVariables);

            tempVariables.push(variable);
        }   
    };

    destinationProjectVariables = destinationProjectVariables.concat(tempVariables);


    destinationProjectOptions.projectVariables = destinationProjectVariables;

    this.setDestinationProjectOptopns(destinationProjectOptions);

    //console.log('projectVariables', this.projectVariables);
    console.log('sourceProjectVariables', sourceProjectVariables);
    console.log('tempVariables', tempVariables);
    console.log('destinationProjectOptions', destinationProjectOptions);

    return destinationProjectOptions;
}

CopyVisitor.prototype.getSourceProjectVariablesByHash = function(hash, sourceProjectVariables) {

    var variable = {};

    for (var k = 0; k < sourceProjectVariables.length; k++) {
         var varName = sourceProjectVariables[k].varhash;

         if(varName == hash){
            variable =  sourceProjectVariables[k];
            break;
         }
    };

    return variable;
};

CopyVisitor.prototype.getProjectOptopns = function(filepath) {

    var optionsFile = path.join(filepath, 'options.json' );
    var options = Utils.jsonParse(fs.readFileSync(optionsFile, 'utf8'));

    return options;
};


CopyVisitor.prototype.getSourceProjectOptopns = function() {

    return this.getProjectOptopns(this.sourcePageJson);
};

CopyVisitor.prototype.getDestinationProjectOptopns = function() {

    return this.getProjectOptopns(this.destPageJson);;
};

CopyVisitor.prototype.setProjectOptopns = function(filepath, options) {

    var optionsFile = path.join(filepath, 'options.json' );
    fs.writeFileSync(optionsFile, Utils.jsonStringify(options));
};

CopyVisitor.prototype.setDestinationProjectOptopns = function(options) {

    this.setProjectOptopns(this.destPageJson, options);
};

CopyVisitor.prototype.findVariables = function(subtriggers) {

    for (var m = 0; m < subtriggers.length; m++) {
        var subtrigger = subtriggers[m];


        var whattodo = subtrigger.whattodo;
        var objs = subtrigger.objs;


        if(whattodo == 'changevarvalue'){

            var varName = objs.varName; // hash

            console.log('varName', varName);

            if( this.projectVariables.indexOf(varName) == -1 ){
                this.projectVariables.push(varName);
            }

        }

        console.log('finded projectVariables', this.projectVariables);
    }
}
