function History(){

}

History.start = function(){
    this.index = 0;
    this.history = [];
}

History.clearAfterIndex = function(){

    this.history = this.history.slice(0, this.index + 1 );
}

History.clear = function(index){

    this.index = 0;
    this.history = [];
}

History.back = function(){


    if(this.index > 0){
        this.index--;

        var data = this.history[this.index];
        data.direction = 'back';

        DataAccess.saveHistory(
                data,
                function(responce){
                    _log('Save history result', responce, _log.dataaccessOutResult);
                },
                function(responce){
                    _log('Save history fault', responce, _log.dataaccessOutFault);
                }
        )

        return data.page;



    }

    return undefined;
}

History.prew = function(){

    if(this.index < this.history.length){
        this.index++;

        var data = this.history[this.index];
        data.direction = 'prew';

        DataAccess.saveHistory(
            data,
            function(responce){
                _log('Save history result', responce, _log.dataaccessOutResult);
            },
            function(responce){
                _log('Save history fault', responce, _log.dataaccessOutFault);
            }
        )

        return data.page;
    }

    return undefined;
}

History.remember = function(data){

//    var page = data.page;
//    var action = data.action;
//    var components = '';
//
//    if(data.component != undefined){
//
//        if(data.component.toJSON != undefined){
//            components = data.component.toJSON();
//        }
//    }
//
//
//    var deleteCount = this.history.length - 1 - this.index;
//
//
//    this.history = this.history.slice(0, this.index + 1 );
//
//
//
//    if(page != undefined){
//
//        if(page.toJSON != undefined){
//            this.history.push( { page:page.toJSON(), action:action, components:components } );
//        } else{
//            this.history.push( { page:page, action:action, components:components } );
//        }
//
//
//        this.index++;
//    }
//


}

History.start();
