var QuizConnectLinesComponentView = TextComponentView.extend({

    className : 'component quizconnectlines-component quiz',

    template: _.template($('#quizconnectlines-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'click .edit-component-button': 'startEditing',
    //         'click .answer-remove' : 'answerRemove',
    //         'click .add-new-answer' : 'addNewAnswer',
    //         'keyup .answer-input' : 'changeAnswerText',
    //         'click .answer-checkbox' : 'checkGoodAnswer'
    //     });
    // },

    addComponentListeners :function(){
        this.listenTo(this.model, 'change:buttonTitle', this.renderButtonShow);
    },

    renderButtonShow: function(model) {
        this.$el.find('.quiz-connectlines-component-inner').text(model.get('buttonTitle'));
    },

    afterRender: function() {
        this.objectOnResize();
    },

    // objectOnResize: function() {
    //     var fontSize = (this.$el.height()/6) < 15 ? 15 : (this.$el.height()/6);
    //     this.$el.find('.quiz-connectlines-component-inner').css({
    //         'font-size': fontSize + "px"
    //     });
    // },

//    select: function() {
//
//
//    },

    beforeUnselect: function() {
        this.resetDots();
    },

    resetDots: function() {
        jsPlumb.deleteEveryEndpoint();
    },

    paintDots: function() {
        var _that = this;

        _that.resetDots();

        _that.instance = jsPlumb.getInstance({
            
            DragOptions : { cursor: 'pointer', zIndex:500 },
            PaintStyle : { strokeStyle:'#5082A5' },
            EndpointHoverStyle: { fillStyle:"orange" },
            HoverPaintStyle: { strokeStyle:"orange" },
            EndpointStyle : { width:20, height:16, strokeStyle:'#5082A5' },
            Endpoint : "Rectangle",
            Anchors : ["TopCenter", "TopCenter"],
            Container: $('#scene')
        });  

        var connectorType = "Straight";

        var endpointFrom = false, 
            endpointTo = false;

        var objectsInitedArray = [ ];

        // _that.instance.doWhileSuspended(function() {

            // var deleteButtonList = $('<div class="qcl-delete-connection-action"></div>');
            // list.append(deleteButtonList);

            var answers = this.model.get('answers');
            var objs = this.model.get('objs');

            for (var i = 0; i < answers.length; i++) {
                var answer = answers[i];

                if(answer.from.length > 0){

                    var screenElementFrom = StageView.instance.getComponentModelByActionkey(answer.from).view.$el;
                    // var fromObject = $('<div class="ex-object ex-object-from" action="'+ screenElementFrom.attr('action') +'" obactionkey="'+ answer.from +'"></div>');
                    // td_from.append(fromObject);

                    var options = objs[answer.from];

                    var maxConnections1 = options.maxConnections;
                    maxConnections1 = maxConnections1 == 0 ? maxConnections1 = -1 : maxConnections1;

                    var point1 = {
                        endpoint:["Dot", { radius:options.size }],
                        paintStyle:{ fillStyle:options.color },
                        connectorStyle:{ strokeStyle:options.color, lineWidth:options.lineWidth },
                        connector : connectorType,
                        dropOptions : { tolerance:"touch" },
                        maxConnections:maxConnections1,
                        isSource:false,
                        isTarget:false
                    }

                    endpointFrom = jsPlumb.addEndpoint(screenElementFrom, { anchor:options.align }, point1);

                    objectsInitedArray.push(answer.from);
                    
                }
                
                for (var k = 0; k < answer.to.length; k++) {

                    var to = answer.to[k];

                        var screenElementTo = StageView.instance.getComponentModelByActionkey(to).view.$el;
                        // var toObject = $('<div class="ex-object ex-object-answer" action="'+ screenElementTo.attr('action') +'" obactionkey="'+ to +'"></div>');
                        // td_to.append(toObject);

                        var options = objs[to];

                        var maxConnections1 = options.maxConnections;
                        maxConnections1 = maxConnections1 == 0 ? maxConnections1 = -1 : maxConnections1;

                        var point1 = {
                            endpoint:["Dot", { radius:options.size }],
                            paintStyle:{ fillStyle:options.color },
                            connectorStyle:{ strokeStyle:options.color, lineWidth:options.lineWidth },
                            connector : connectorType,
                            dropOptions : { tolerance:"touch" },
                            maxConnections:maxConnections1,
                            isSource:false,
                            isTarget:false
                        }

                        endpointTo =  jsPlumb.addEndpoint(screenElementTo, { anchor:options.align }, point1);

                        if (endpointFrom && endpointTo) {
                            jsPlumb.connect({ source: endpointFrom, target: endpointTo });
                        }

                        objectsInitedArray.push(to);

                };
            };


            for (var o in objs) {
                if ( objectsInitedArray.indexOf(o) === -1 ) {
                    var options = objs[o];
                    var qclScreenOb = StageView.instance.getComponentModelByActionkey(o).view.$el;

                    var align = options.align;
                    var color1 = options.color;
                    var size1 = options.size;
                    var lineWidth1 = options.lineWidth;

                    var endpointOptions = {
                        endpoint: ["Dot", { radius:size1 }],
                        paintStyle: { fillStyle:color1 },
                        connectorStyle: { strokeStyle:color1, lineWidth:lineWidth1 },
                        connector : "Straight",
                        dropOptions : { tolerance:"touch" },
                        maxConnections: 0,
                        isSource: false,
                        isTarget: false
                    }
                    jsPlumb.addEndpoint( qclScreenOb, { anchor:align }, endpointOptions);
                }
            }
        
        jsPlumb.repaintEverything();
    },

    onRenderStyle: function() {
        this.objectOnResize();
    }

});

var QuizConnectLinesComponentViewNotEditable = ComponentView.createNotEditableComponentClass(QuizConnectLinesComponentView);