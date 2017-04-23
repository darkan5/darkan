var StageSelector = Backbone.View.extend({

    scc: new ComponentCollection(),

    initialize: function(){

    },

    start: function(){

        this.startListenOnSelectComponentsByUser();

        this.scc.on('add', this.onAdd, this);
        this.scc.on('remove', this.onRemove, this);
        this.scc.on('reset', this.onReset, this);
        this.scc.on('add remove reset', this.onChange, this);
    },

    endEditing: function(){

        this.scc.each(function(cModel){
            if(cModel.view){
                cModel.view.endEditing();
            }
        });
    },

    selectOneComponent: function(cModel, e){

        var _that = this;

        e = e || {};

        var scc = this.scc;

        //this.endEditing();

        this.add(cModel, e.shiftKey);


        // if(e.shiftKey){

        //     if(scc.contains( model )){
        //         if (!$(e.target).hasClass('ui-resizable-handle')) {
        //             scc.remove(model);
        //             model.setActive( false );
        //         }
        //     }else{

        //         if(!model.get('locked') && !model.get('hidden')){
        //             this.addToSelectedComponentsCollection( model );
        //         }

        //         model.setActive( true, scc );
        //     }

        //     return;

        // }


        // scc.reset();

        // this.setComponentsAsNotActive(cModel);
        // this.setComponentAsActive(cModel);


        // //User.getModel().set('activeComponent', model);

        // //if(!model.get('locked') && !model.get('hidden')){
        // if(!model.get('locked')){
        //     this.addToSelectedComponentsCollection( model );
        // }


        // //this.trigger('select-component', model);

        // this.trigger('select-multiple-components', scc, this );

    },

    selectMultiComponents: function(cModel, e){

        var _that = this;

        e = e || {};

        var scc = this.scc;

        //this.endEditing();

        this.addMulti(cModel, true);
    },

    selectMultiComponentsSilent: function(cModel, e){

        var _that = this;

        e = e || {};

        var scc = this.scc;

        //this.endEditing();

        this.addMultiSilent(cModel, true);
    },


    add: function(cModel, shiftKey){

        if(cModel.get('locked')){
            return;
        }

        // if(cModel.get('hidden')){
        //     return;
        // }

        if(shiftKey){

            if(this.scc.contains(cModel)){

                this.scc.remove(cModel);
                return;
            }else{
                this.scc.add(cModel);
                return;
            }
        }

        this.reset();
        this.scc.add(cModel);
    },

    addMulti: function(cModel, shiftKey){

        if(cModel.get('locked')){
            return;
        }

        if(cModel.get('hidden')){
            return;
        }

        this.scc.add(cModel);
    },

    addMultiSilent: function(cModel, shiftKey){

        if(cModel.get('locked')){
            return;
        }


        this.scc.add(cModel, { s:true });
    },

    remove: function(cModel){
        this.scc.remove(cModel);
    },

    reset: function(){
        this.scc.each(this.onRemove, this);
        this.scc.reset();
    },

    onAdd: function(cModel, cc, params){
        // _log('onAdd', cModel);
        // _log('onAdd', params);
        //_log('onAdd', params);
        // _log('this.scc', this.scc);

        cModel.setActive( true, this.scc, params );
    },

    onRemove: function(cModel, i){
        // _log('onRemove', cModel);
        // _log('this.scc', this.scc);
        // _log('length', this.scc.length);

        cModel.setActive( false);
    },

    onReset: function(models){

        // models.collection.each(function(cModel){
        //     cModel.setActive( false );
        // });

        // _log('onReset', models);
        // _log('this.scc', this.scc);
    },

    onChange: function(cModel, cc, params){

        _log('onChange', params);
        // _log('this.scc', this.


        this.trigger('change', this.scc, params);
    },

    createSelector: function(e){
        var _that = this;

        //this.unsetActiveModels( );

        //this.selectedComponentsCollection.reset();

        //this.trigger('on-stage-selected', this.model);

        this.selection = $('<div>').addClass('selection-box');
        this.$el.append(this.selection);



//                if($(e.target).attr('id') == 'scene'){

        var offset = this.$el.offset();

        //}else{

//                    var offset = { left:$(e.target).offset().left + componentModel.get('x') + this.$el.offset().left,
//                                   top:$(e.target).offset().top + componentModel.get('y') + this.$el.offset().top
//                    };
        //}

        var scrollTopStart = _that.$el.scrollTop();
        var scrollLeftStart = _that.$el.scrollLeft();
        _log('scrollTopStart', scrollTopStart);
        _log('offset', offset);




        var click_x = e.pageX - offset.left - 5 + scrollLeftStart;
        var click_y = e.pageY - offset.top - 5 + scrollTopStart;

        _that.selection.css({
            'top':    click_y + 'px',
            'left':   click_x + 'px',
            'width':  '0px',
            'height': '0px'
        });

//                debugger;

        $('body').on('mousemove', function(e) {

            var scrollTop = _that.$el.scrollTop();// - scrollTopStart;
            var scrollLeft = _that.$el.scrollLeft();// - scrollLeftStart;

            var move_x = e.pageX - offset.left + scrollLeft - 5;
            var move_y = e.pageY - offset.top + scrollTop - 5;
            var width  = Math.abs(move_x - click_x),
                height = Math.abs(move_y - click_y),
                new_x, new_y;


            new_x = (move_x < click_x) ? (click_x - width) : click_x;
            new_y = (move_y < click_y) ? (click_y - height) : click_y;


            // if (scrollTop > 0) {
            //     height = height + scrollTop;
            // }

            _that.selection.css({
                'width': width,
                'height': height,
                'top': new_y,
                'left': new_x
            });

        }).one('mouseup', function(e) {

                _that.reset();

                var w = parseInt(_that.selection.css('width'));
                var h = parseInt(_that.selection.css('height'));


                if(w >= 5 || h >= 5){
                    _that.findComponents( _that.selection );
                }


                $('body').off('mousemove');
                _that.selection.remove();



                //_that.setActiveModels( _that.selectedComponentsCollection, true );
        });
    },

    findComponents: function( selection ){

        var _that = this;
        var scrollTop = this.$el.scrollTop();
        var scrollLeft = this.$el.scrollLeft();
        var stageOffset = this.$el.find('.stage-view').offset();


        var menuLeftWidth = $('#menu-left').width();
        var menuTopHeight = $('#menu-top-tabs').height();
        var stageViewPaddingTop = parseInt(this.$el.css('padding-top'));
        var stageViewPaddingLeft = parseInt(this.$el.css('padding-left'));
        if (scrollLeft == 0){
            stageViewPaddingLeft = stageOffset.left - menuLeftWidth;
        }

        var x1 = parseInt(selection.css('left')) + scrollLeft;
        var y1 = parseInt(selection.css('top')) + scrollTop;
        var x2 = parseInt(selection.css('width')) + x1;
        var y2 = parseInt(selection.css('height')) + y1;

        var htmlObjectsArray = [];

        this.$el.find('.component').each(function() {

            var actualX1 = parseInt($(this).css('left')) +  scrollLeft + stageViewPaddingLeft;
            var actualY1 = parseInt($(this).css('top')) + stageViewPaddingTop + scrollTop;
            var actualX2 = parseInt($(this).css('width')) + actualX1;
            var actualY2 = parseInt($(this).css('height')) + actualY1;

            var allObject = true;

            var corner1 = _that.checkPosition(actualX1, actualY1, x1, y1, x2, y2);
            var corner2 = _that.checkPosition(actualX2, actualY1, x1, y1, x2, y2);
            var corner3 = _that.checkPosition(actualX2, actualY2, x1, y1, x2, y2);
            var corner4 = _that.checkPosition(actualX1, actualY2, x1, y1, x2, y2);

            if (corner1 && corner2 && corner3 && corner4) {

                htmlObjectsArray.push( $(this) );

            } else {

                if (_that.checkRect(x1, y1, x2, y2, actualX1, actualY1, actualX2, actualY2)) {
                    htmlObjectsArray.push( $(this) );
                }
            }
        });



        for (var i = 0; i < htmlObjectsArray.length; i++) {
            var htmlObject = $(htmlObjectsArray[i]);


            htmlObject.trigger('multi-select', true);

        };


    },

    checkRect: function(firstX1, firstY1, firstX2, firstY2, secondX1, secondY1, secondX2, secondY2) {
        if (firstX1 < secondX2 && firstX2 > secondX1 && firstY1 < secondY2 && firstY2 > secondY1) {
            return true;
        }

        return false;
    },

    checkPosition : function(pointX, pointY, x1, y1, x2, y2) {
        if (pointX >= x1 && pointX <= x2 && pointY >= y1 && pointY <= y2) {
            return true;
        }

        return false;
    },

    startListenOnSelectComponentsByUser: function() {

        var _that = this;

        DataAccess.onSelectComponentsByUser(
            { },
            function(data) { 
                _log('On select Components by user result: ', data, _log.dataaccessOutResult); 

                _that.onSelectComponentsByUser(data);   
            },
            function(data) { 
                _log('On select page by user fault: ', data, _log.dataaccessOutFault);  
            }
        );
    },

    onSelectComponentsByUser: function(data){

        var components = data;

        this.resetSelectedByUser();

        if(!_.isObject(components)){
            return;
        }

        var cc = ProjectModel.instance.getAllComponents();

        cc.each(function(componentModel){
            var selectedBy = componentModel.selectedBy || [];

            if(selectedBy.length > 0){
                var index = selectedBy.indexOf(__meta__.login);
                selectedBy.splice(index, 1);
                componentModel.selectedBy = selectedBy;
            }
        });


        for (var item in components) {

            var actionkey = item;

            _log('actionkey', actionkey);

            if(!_.isString(actionkey)){
                continue;
            }

            var pageId = parseInt(actionkey.split('-')[2]);
            var pageModel = ProjectModel.instance.getPageModelByPageId(pageId);

            _log('onSelectComponentsByUser pageModel', pageModel);

            if(!pageModel){
                continue;
            }

            var componentModel = pageModel.getComponentModelByActionkey(actionkey);

            _log('componentModel', componentModel);

            if(!componentModel){
                continue;
            }

            var selectedBy = components[item];

            var arrSelectedBy = _.pluck(selectedBy, 'login');

            var filterArrSelectedBy = _.filter(arrSelectedBy, function(login){ return login != __meta__.login; });

            componentModel.selectedBy = filterArrSelectedBy;

            if(componentModel.view){
                componentModel.view.renderSelectedBy(filterArrSelectedBy);
            }
        }; 
    },

    selectComponentsByUser: function(cc) {

        var actionkeysShort = [];

        var actionkeys = _.pluck(cc.toJSON(), 'actionkey');

        // for (var i = 0; i < actionkeys.length; i++) {
        //     var actionkey = actionkeys[i];
        //     var a = actionkey.split('-');
        //     actionkeysShort.push(a[1]);
        // };

        //_log('selectComponentsByUser', actionkeysShort);

       DataAccess.selectComponentsByUser({ pageId: this.model.get('options').get('pageid'), actionkeys:actionkeys } );
    },

    resetSelectedByUser: function() {
        this.model.get('lines').each(function(rowModel){
            rowModel.get('objects').each(function(cModel){
                cModel.selectedBy = [];
                cModel.view.renderSelectedBy([]);
            });
        });
    }
});