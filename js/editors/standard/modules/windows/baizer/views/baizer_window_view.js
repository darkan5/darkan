var BaizerWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window baizer-window',

    template: _.template($('#window-baizer-template').html()),

    events: function(){
         return _.extend({},WindowView.prototype.events, {
             'click .animation-block': 'addAnimation',
         });
    },

    initialize: function( data ) {
        this.windowModel = new BaizerWindowModel();
        this.runListeners();

        this.triggerItem = data.data.triggerItem;


    },

    setBaizer: function(triggerItem){


        var triggerItem = triggerItem;

        var ease = triggerItem.getSelectedEase();

        var value = ease;
        var handles = this.handles;
        var graph = this.graph;

        var canvas = this.canvas;        
        var ctx = this.ctx;  


       
            //box = document.getElementById('box'),
            //code = document.getElementById('codeOutput'),
        this.supportsTouch = ('createTouch' in document);
        var time = this.time;  
        var timeVal = this.timeVal;  


        this.presetChange(value, handles, graph, canvas, ctx, time, timeVal);

        
    },

    presetChange: function (value, handles, graph, canvas, ctx, time, timeVal) {

        var coordinates = value.split(','),
            cp1 = handles[0],
            cp2 = handles[1];

        cp1.x = coordinates[0] * graph.width;
        cp1.y = graph.y + graph.height - (coordinates[1] * graph.height);
        cp2.x = coordinates[2] * graph.width;
        cp2.y = graph.y + graph.height - (coordinates[3] * graph.height);

        this.updateDrawing( handles, graph, canvas, ctx, time, timeVal);

    },

    updateDrawing: function( handles, graph, canvas, ctx, time, timeVal) {
        // clear
        ctx.clearRect(0,0,canvas[0].width,canvas[0].height);

        // draw graph
        graph.draw();

        // get handles
        var cp1 = handles[0],
            cp2 = handles[1];

        // draw bezier curve
        ctx.save();
        ctx.strokeStyle = '#4C84D3';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(graph.x, graph.y + graph.height);
        //start at bottom left, first handle is cp1, second handle is cp2, end is top right
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, graph.width, graph.y);
        ctx.stroke();
        ctx.restore();

        // draw anchor point lines
        ctx.strokeStyle = '#f00';
        ctx.beginPath();
        ctx.moveTo(graph.x, graph.y + graph.height);
        ctx.lineTo(cp1.x, cp1.y);
        ctx.moveTo(graph.width, graph.y);
        ctx.lineTo(cp2.x, cp2.y);
        ctx.stroke();

        // draw handles
        for (var i=0; i < handles.length; i++) {
            handles[i].draw();
        }



        //console.log(cp1.x, cp1.y, cp2.x, cp2.y)

        // output code
        var x1 = (cp1.x / graph.width).toFixed(3),
            y1 = ( (graph.height + graph.y - cp1.y) / graph.height ).toFixed(3),
            x2 = (cp2.x / canvas[0].width).toFixed(3),
            y2 = ( (graph.height + graph.y - cp2.y) / graph.height ).toFixed(3);

            //console.log( cp1.x, cp1.y )
            this.points = '' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + '';
//            bezier = 'cubic-bezier' + this.points,
//
//            easeName = $('#presets option:selected').text();
//
//            if ( easeName.indexOf('custom') > -1 ) {
//                easeName = 'custom';
//            }


//        var webkitTrans = '-webkit-transition: all ' + timeVal + 'ms ' + bezier;
//        var webkitTiming = '-webkit-transition-timing-function: ' + bezier;

//        if (y1 > 1 ||
//            y1 < 0 ||
//            y2 > 1 ||
//            y2 < 0) {
//
//                var webkitY1 = y1,
//                    webkitY2 = y2;
//
//                if (y1 > 1) webkitY1 = 1;
//                if (y1 < 0) webkitY1 = 0;
//                if (y2 > 1) webkitY2 = 1;
//                if (y2 < 0) webkitY2 = 0;
//
//                webkitTrans = '-webkit-transition: all ' + timeVal + 'ms ' + 'cubic-bezier(' + x1 + ', ' + webkitY1 + ', ' + x2 + ', ' + webkitY2 + ')' + '; /* older webkit */' +
//                              '<br>-webkit-transition: all ' + timeVal + 'ms ' + bezier;
//                webkitTiming = '-webkit-transition-timing-function: cubic-bezier(' + x1 + ', ' + webkitY1 + ', ' + x2 + ', ' + webkitY2 + ')' + '; /* older webkit */' +
//                               '<br>-webkit-transition-timing-function: ' + bezier;
//
//        }

        // output code snippets
        // code.innerHTML =
        //                 '<p>' +
        //                 webkitTrans +
        //                 '; <br>&nbsp;&nbsp; -moz-transition: all ' + timeVal + 'ms ' + bezier +
        //                 '; <br>&nbsp;&nbsp;&nbsp;&nbsp; -o-transition: all ' + timeVal + 'ms ' + bezier +
        //                 '; <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; transition: all ' + timeVal + 'ms ' + bezier +
        //                 '; /* ' + easeName + ' */</p>' +
        //                 '<p>' +
        //                 webkitTiming +
        //                 '; <br>&nbsp;&nbsp; -moz-transition-timing-function: ' + bezier +
        //                 '; <br>&nbsp;&nbsp;&nbsp;&nbsp; -o-transition-timing-function: ' + bezier +
        //                 '; <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; transition-timing-function: ' + bezier +
        //                 '; /* ' + easeName + ' */</p>';

    },


    addAnimation: function(e){

        this.close();
    },

    getOffSet: function(obj) {
        var curleft = curtop = 0;



        if (obj.offsetParent) {
            do {



                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            }
            while (obj = obj.offsetParent);

            // return {
            //     left: curleft,
            //     top: curtop
            // };

            
        }

        // return {
        //         left: 135,
        //         top: -80
        // };

        return {
                left: 0,
                top: 0
        };
    },

    getPos: function(event) {
        // var mouseX = event.pageX - this.getOffSet(event.target).left,
        //     mouseY = event.pageY - this.getOffSet(event.target).top;

        var mouseX = event.offsetX - this.getOffSet(event.target).left,
            mouseY = event.offsetY - this.getOffSet(event.target).top;


        // var mouseX = event.offsetX,
        //     mouseY = event.offsetY;

        return {
            x: mouseX,
            y: mouseY
        };
    },

    onPress: function(event) {



        var _that = this;

        var handles = this.handles;


        event.preventDefault();
        event.stopPropagation(); //not sure if this is needed

        var cursorEvent = this.supportsTouch ? event.touches[0] : event;

        var mouseCoordinates = this.getPos(cursorEvent),
            x = mouseCoordinates.x,
            y = mouseCoordinates.y;



        //check to see if over any handles
        for (var i=0; i < handles.length; i++) {
            var current = handles[i],
                curLeft = current.left,
                curRight = current.right,
                curTop = current.top,
                curBottom = current.bottom;


            //20 px padding for chubby fingers
            if ( this.supportsTouch ) {
                curLeft -= 20;
                curRight += 20;
                curTop -= 20;
                curBottom += 20;
            }

            //console.log('current.x:',current.x, 'current.y:',current.y)


            if (x >= curLeft &&
                x <= curRight &&
                y >= curTop &&
                y <= curBottom
                ) {
                    //over the current handle
                    //console.log('over')
                    //drag = true;
                    draggingObj = current;
                    oldX = event.pageX;
                    oldY = event.pageY;

                    // var currentlySelected = $('#presets option:selected');

                    // currentlySelected.removeAttr('selected')
                    //                  .parent().parent().find('option').last().attr('selected', 'selected');


                    var baizerWrapper = this.$el.find('.baizer-wrapper');

                    baizerWrapper.on('mouseup', function(e){
                        _that.onRelease(e);
                    });
                    baizerWrapper.on('touchend', function(e){
                        _that.touchEnd(e);
                    });

                    baizerWrapper.on('mousemove', function(e){
                        _that.onMove(e);
                    });
                    baizerWrapper.on('touchmove', function(e){
                        _that.touchMove(e);
                    });





                    // set move cursor
                    document.body.style.cursor = this.canvas[0].style.cursor = 'move';

            }
        }
    },

    onMove: function(event) {



        var cursorEvent = this.supportsTouch ? event.touches[0] : event;

            var canvas = this.canvas[0];
            var graph = this.graph;

            var x = cursorEvent.offsetX - this.getOffSet(canvas).left,
                y = cursorEvent.offsetY - this.getOffSet(canvas).top;

            if (x > graph.width) {
                x = graph.width;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > canvas.height) {
                y = canvas.height;
            }
            if (y < 0) {
                y = 0;
            }

            draggingObj.x = x;
            draggingObj.y = y;


        var handles = this.handles;
        var graph = this.graph;

        var canvas = this.canvas;        
        var ctx = this.ctx;  
        var time = this.time;  
        var timeVal = this.timeVal;


        this.updateDrawing(handles, graph, canvas, ctx, time, timeVal);

    },

    touchMove: function (event) {
        this.onMove(event);
        event.preventDefault();
    },

    onRelease: function(event) {

        var _that = this;


        //console.log('release')
        drag = false;

        // restore pointer cursor
        this.canvas[0].style.cursor = 'pointer';
        document.body.style.cursor = 'default';

        var baizerWrapper = this.$el.find('.baizer-wrapper');

        baizerWrapper.off('mousemove');
        baizerWrapper.off('touchmove');
        baizerWrapper.off('mouseup');
        baizerWrapper.off('touchend');

        this.canvas[0].removeEventListener('mousedown');
        this.canvas[0].removeEventListener('touchstart');


        var triggerCustomGroup = this.triggerItem.$el.find('.trigger-easeing-type-select .trigger-custom-group');
        triggerCustomGroup.remove();


        var optgroup = $('<optgroup class="trigger-custom-group" label="custom">\
            <option value="'+ this.points +'">custom</option>\
        </optgroup> ');

        var triggerEaseingInput = this.triggerItem.$el.find('.trigger-easeing-type-select');

        triggerEaseingInput.append(optgroup);
        triggerEaseingInput.val(this.points);



        var opts = this.triggerItem.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');
        transition.ease = this.points;


        opts.set('transition', transition);
        this.triggerItem.model.set('opts', opts);
        this.triggerItem.saveChanges();

    },

    touchEnd: function(event) {
        this.onRelease(event);
        event.preventDefault();
    },

    afterRender: function() {

        var _that = this;


        var time = 15;  
        var timeVal = 500;  

        this.time = time;  
        this.timeVal = timeVal;  

        var canvas = this.$el.find('canvas');
        var ctx = canvas[0].getContext('2d');

        canvas[0].addEventListener('mousedown', function(e){
            _that.onPress(e);
        }, false);

        canvas[0].addEventListener('touchstart', function(e){
            _that.onPress(e);
        }, false);

        this.canvas = canvas;        
        this.ctx = ctx;        

        function BezierHandle(x, y) {
            this.x = x;
            this.y = y;
            this.width = 12;
            this.height = 12;
        }

        BezierHandle.prototype = {

            // get the edges for easy grabby coordinates
            getSides : function() {
                this.left = this.x - (this.width / 2);
                this.right = this.left + this.width;
                this.top = this.y - (this.height / 2);
                this.bottom = this.top + this.height;
            },

            draw : function() {
                // figure out the edges
                this.getSides();
                ctx.fillStyle = "#222";
                ctx.fillRect(this.left, this.top, this.width, this.height);
            }

        };

        var handles = [
                new BezierHandle(50,280),
                new BezierHandle(150,180)
                ];

        this.handles = handles;        

        function Graph() {
            this.x = 0;
            this.y = 130;
            this.height = 200;
            this.width = 200;
        }

        Graph.prototype = {

            draw : function() {

                ctx.save();

                ctx.fillStyle = "#fff";
                ctx.fillRect(this.x, this.y, this.width, this.height);

                // the 0.5 offset is to account for stroke width to make lines sharp
                ctx.strokeStyle = '#666';
                ctx.lineWidth = 1;
                ctx.strokeRect(this.x + 0.5, this.y - 0.5, this.width - 1, this.height );

                ctx.restore();
            }

        };

        var graph = new Graph();
        this.graph = graph;


        this.setBaizer(this.triggerItem);
    },

    onClose : function(){
        this.trigger('on-close');
    }
});