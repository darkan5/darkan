var DrawPages = function() {
	this.L = {
		optionsButton: $('.project-options-o3'),
		amountToDrawInput: $('.drawpages-amount-to-draw'),
		
		listOfPages: $('.drawpages-pages-list'),

		addNewDrawButton: $('.drawpages-add-new-draw'),

		listOfUserDraws: $('.drawpages-draws-wrapper'),

		mainMenuTab: $('.project-options-o3'),

		listOfPagesOptionsSelectAll: $('.drawpages-pages-list-selectall'),
		listOfPagesOptionsDeselectAll: $('.drawpages-pages-list-deselectall')
	};

	this.initButtons();

	this.selectedPages = [ ];
};

DrawPages.prototype.deleteNotExistingPagesFromDraws = function() {
	var _that = this;

	var pageList = _that.getListOfPages();
	var listOfExistingPages = [ ];
	var save = false;

	for (var i = pageList.length - 1; i >= 0; i--) {
		listOfExistingPages.push(pageList[i].pageid);
	};

	for (var draw in _that.dataContainer.draws) {
		
		var pagesInDraw = _that.dataContainer.draws[draw].pagesToDraw;

		for (var p = pagesInDraw.length - 1; p >= 0; p--) {
			var pageInDrawID = pagesInDraw[p];
			
			if (listOfExistingPages.indexOf(pageInDrawID) === -1) {
				_that.dataContainer.draws[draw].pagesToDraw.splice(pagesInDraw.indexOf(pageInDrawID), 1);
				save = true;
			}
		};

	}

	if (save) {
		_that.saveData();
	}
};

DrawPages.prototype.initButtons = function() {
	var _that = this;

	_that.L.addNewDrawButton.click(function() { _that.addNewDraw(); });

	_that.L.mainMenuTab.click(function() { _that.populateAllDrawWrappers(); });

	_that.L.listOfPagesOptionsSelectAll.click(function() { _that.options_SelectAllPages(); });
	_that.L.listOfPagesOptionsDeselectAll.click(function() { _that.options_DeselectAllPages(); });
};

DrawPages.prototype.refreshProjectListAvailability = function() {
	var _that = this;

	var pageScreenElements = _that.L.listOfPages.find('.drawpages-singlepage-wrapper');
	var usedPagesInDraws = [ ];

	for (var draw in _that.dataContainer.draws) {
		for (var i = _that.dataContainer.draws[draw].pagesToDraw.length - 1; i >= 0; i--) {
			usedPagesInDraws.push( _that.dataContainer.draws[draw].pagesToDraw[i] );
		};
	}

	pageScreenElements.each(function() {
		var pageID = parseInt($(this).attr('pageid'));
		if (usedPagesInDraws.indexOf(pageID) === -1) {
			$(this).removeClass('drawpages-disabled');
		} else {
			$(this).addClass('drawpages-disabled');
		}
	});
};

DrawPages.prototype.options_SelectAllPages = function() {
	var _that = this;

	_that.selectedPages = [ ];

	_that.L.listOfPages.find('> .drawpages-singlepage-wrapper:not(.drawpages-disabled)').each(function() {
		var pageID = $(this).attr('pageid');
		_that.selectedPages.push(parseInt(pageID));

		$(this).addClass('drawpages-selectedpage');
	});
};

DrawPages.prototype.options_DeselectAllPages = function() {
	var _that = this;

	_that.selectedPages = [ ];

	_that.L.listOfPages.find('> .drawpages-singlepage-wrapper').removeClass('drawpages-selectedpage');
};

DrawPages.prototype.populateAllDrawWrappers = function() {
	var _that = this;

	

	_that.drawListOfPagesHTML();

	_that.refreshAllDrawsHTML();

	_that.refreshProjectListAvailability();
};

DrawPages.prototype.refreshAllDrawsHTML = function() {
	var _that = this;

	_that.L.listOfUserDraws.html('');

	for (var draw in _that.dataContainer.draws) {
		var drawData = _that.dataContainer.draws[draw];

		var singleDrawHTML = _that.getSingleDrawHTML(draw);
		var pageList = singleDrawHTML.find('.drawpages-singledraw-list-ul');

		var addedPagesAmount = 0;
		for (var i = drawData.pagesToDraw.length - 1; i >= 0; i--) {
			var pageID = drawData.pagesToDraw[i];

			var pageData = _that.getPageDataByID(pageID);
			if (pageData !== false) {
				var pageDataHTML = _that.getSinglePageItemHTMLtoDraw(pageData, 'drawlist');
				if (pageDataHTML !== false) {
					pageList.append(pageDataHTML);
				}

				addedPagesAmount++;
			}
		};

		if (addedPagesAmount !== 0) {
			pageList.find('.drawpages-emptycontainer-info').remove();
		}

		_that.L.listOfUserDraws.append(singleDrawHTML);
	}
};

DrawPages.prototype.getPageDataByID = function(pageID) {
	var _that = this;

	var foundPage = false;

	var pageObject = $('.edition-data-ul > li[pageid="'+pageID+'"]');

	if (pageObject.push() == 1) {
		foundPage = {
			pageid: parseInt(pageObject.attr('pageid')),
			pageorder: parseInt(pageObject.attr('order')),
			thumb: pageObject.find('.edition-data-pagethumb-iframe').attr('src'),
			pagename: pageObject.find('.my-page-title').text()
		};
	}


	return foundPage;
};

DrawPages.prototype.getListOfPages = function() {
	var _that = this;

	var listOfPagesInProject = $('.edition-data-ul');

	var _listOfPages = [ ];

	var pageObjects = listOfPagesInProject.find('> li[pageid]');
	pageObjects.each(function() {

		var ob = $(this);

		var singlePage = {
			pageid: parseInt(ob.attr('pageid')),
			pageorder: parseInt(ob.attr('order')),
			thumb: ob.find('.edition-data-pagethumb-iframe').attr('src'),
			pagename: ob.find('.my-page-title').text()
		};

		_listOfPages.push(singlePage);
	});

	return _listOfPages;
};

DrawPages.prototype.drawListOfPagesHTML = function() {
	var _that = this;

	_that.L.listOfPages.html('');
	_that.selectedPages = [ ];

	var pages = _that.getListOfPages();

	for (var p = 0; p < pages.length; p++) {
		var pageData = pages[p];
		_that.L.listOfPages.append(_that.getSinglePageItemHTMLtoDraw(pageData, 'pagelist'));
	};
};

DrawPages.prototype.getSinglePageItemHTMLtoDraw = function(pageData, listType) {
	var _that = this;

	// li element
	var li = $('<li>', { class: 'drawpages-singlepage-wrapper', pageid: pageData.pageid, pageOrder: pageData.pageorder });

	// page thumbnail
	var thumbWrapper = $('<div>', { class: 'drawpages-thumb-wrapper' });
	var thumbImageSrc = pageData.thumb.indexOf('.jpg') !== -1 ? pageData.thumb : 'images/emptyimage-drawpages.png';
	var thumbItem = $('<div>', { class: 'drawpages-thumb-item'});
	thumbItem.css({
		'background-image': 'url('+ thumbImageSrc + ')',
		'text-align': 'center'
	});

	// page name
	var pagenameWrapper = $('<div>', { class: 'drawpages-pagename-wrapper' });
	var pagenameItem = $('<div>', { class: 'drawpages-pagename-item' });
	pagenameItem.text(pageData.pagename);

	// page counter
	var counterWrapper = $('<div>', { class: 'drawpages-counter-wrapper' });
	counterWrapper.text(pageData.pageorder+1);



	thumbWrapper.append(thumbItem);
	pagenameWrapper.append(pagenameItem);

	li.append(thumbWrapper);
	li.append(pagenameWrapper);
	li.append(counterWrapper);

	switch(listType) {
		case 'pagelist':
			_that.addEvents_pageListItem(li);
			break;

		case 'drawlist':
			_that.addEvents_drawListSinglePageItem(li);
			break;
	}
	
	return li;
};

DrawPages.prototype.addEvents_pageListItem = function(ob) {
	var _that = this;

	ob.mouseup(function() { 
		var selected = $(this).hasClass('drawpages-selectedpage');
		if (!selected) {
			_that.selectSinglePage($(this));
		} else {
			_that.deselectSinglePage($(this));
		}
	});

	// ob.mousedown(function() {
	// });

	ob.draggable({
		zIndex: 2000,
		delay: 100,

		start: function() {
			if (_that.selectedPages.length === 0) {
				return false;
			}
		},

		helper: function() {
			var helperWrapper = $('<div>', {
				'class': 'drawpages-draggablehelper'
			});
			helperWrapper.text('Ilość stron: ' + _that.selectedPages.length);
			return helperWrapper;
		}
	});
};


DrawPages.prototype.addEvents_drawListSinglePageItem = function(ob) {
	var _that = this;

	ob.click(function() { 
		var selected = $(this).hasClass('drawpages-draw-selectedpage');
		if (!selected) {
			_that.draws_selectSinglePage($(this));
		} else {
			_that.draws_deselectSinglePage($(this));
		}
	});
};

DrawPages.prototype.addEvents_drawWindow = function(ob, drawID) {
	var _that = this;


	var sortPagesByOrder = function(pagesArray) {
		var sortedIDByOrder = [ ];
		var idAndOrderPairs = { };

		for (var i = pagesArray.length - 1; i >= 0; i--) {
			var pageID = pagesArray[i];

			var pageOrder = _that.getPageDataByID(pageID).pageorder;
			idAndOrderPairs[pageOrder] = pageID;
		};

		for (var pOrder in idAndOrderPairs) {
			sortedIDByOrder.push(idAndOrderPairs[pOrder]);
		}

		_dl(sortedIDByOrder);
		return sortedIDByOrder;
	}

	ob.droppable({
		tolerance: "pointer",

		drop: function(evt, droppableObject) {



			var addedPagesAmount = 0;
			for (var i = _that.selectedPages.length - 1; i >= 0; i--) {
				var pageID = parseInt(_that.selectedPages[i]);
				var pageListInDraw = _that.dataContainer.draws[drawID].pagesToDraw;

				if (pageListInDraw.indexOf(pageID) === -1) {
					pageListInDraw.push(pageID);
					_that.dataContainer.draws[drawID].pagesToDraw = sortPagesByOrder(pageListInDraw);
					_that.dataContainer.draws[drawID].pagesToDraw.reverse();
					addedPagesAmount++;
				}
			};

			if (addedPagesAmount > 0) {
				_that.refreshAllDrawsHTML();
				_that.saveData();
				_that.refreshProjectListAvailability();
				_that.options_DeselectAllPages();
			}
		}
	})
};

DrawPages.prototype.addNewDraw = function() {
	var _that = this;


	var newDrawID = _that.dataContainer.lastDrawId++;

	var newDrawHtml = _that.getSingleDrawHTML(newDrawID);

	_that.dataContainer.draws[newDrawID] = {
		pagesToDraw: [ ],
		opts: { }
	};

	_that.L.listOfUserDraws.append(newDrawHtml);

	_that.saveData();
};

DrawPages.prototype.getSingleDrawHTML = function(drawID) {
	var _that = this;

	// wrapper
	var wrapper = $('<div>', { class: 'drawpages-singledraw-wrapper', drawid: drawID });

	// header
	var header = $('<div>', { class: 'drawpages-singledraw-header' });
	header.text(lang['DRAWPAGES_DRAWTITLE']);
	wrapper.append(header);

	// page list and ul element
	var pagelist = $('<div>', { class: 'drawpages-singledraw-list' });
	wrapper.append(pagelist);
	var pagelistUL = $('<ul>', { class: 'drawpages-singledraw-list-ul' });
	pagelist.append(pagelistUL);
	// empty container info
	var emptyContainerInfo = $('<div>', {
		class: 'drawpages-emptycontainer-info'
	});
	emptyContainerInfo.text(lang['DRAWPAGES_DRAWINFO']);
	pagelistUL.append(emptyContainerInfo);

	// add events to draw window
	_that.addEvents_drawWindow(pagelist, drawID);

	// delete whole draw button
	var deleteButton = $('<div>', { class: 'drawpages-singledraw-delete' });
	deleteButton.text('X');
	wrapper.append(deleteButton);
	deleteButton.click(function() { _that.deleteDraw(drawID) });

	// draw options wrapper
	var drawOptionsWrapper = $('<div>', { class: 'drawpages-optionswrapper' });
	wrapper.append(drawOptionsWrapper);

	// delete selected items button
	var deleteSelectedButton = $('<div>', { class: 'drawpages-deleteselectedfromdraw' });
	deleteSelectedButton.text(lang['DRAWPAGES_REMOVESELECTED']);
	drawOptionsWrapper.append(deleteSelectedButton);
	deleteSelectedButton.click(function() { _that.deletePagesFromDraw(drawID) });

	// amount to draw input
	var amountToDrawLabel = $('<label>', { class: 'drawpages-amounttodraw' });
	amountToDrawLabel.text(lang['DRAWPAGES_AMOUNTTODRAW']);
	drawOptionsWrapper.append(amountToDrawLabel);
	var amountToDrawInput = $('<input>', { class: 'drawpages-amounttodrawinput', type: 'number', min: '0' });
	if (isObject(_that.dataContainer.draws[drawID])) {
		amountToDrawInput.val(_that.dataContainer.draws[drawID].opts.amountToDraw);
		if (_that.dataContainer.draws[drawID].opts.amountToDraw > _that.dataContainer.draws[drawID].pagesToDraw.length) {
			amountToDrawInput.val(_that.dataContainer.draws[drawID].pagesToDraw.length);
			_that.dataContainer.draws[drawID].opts.amountToDraw = _that.dataContainer.draws[drawID].pagesToDraw.length;
		}
	} else {
		amountToDrawInput.val(0);
	}
	
	amountToDrawLabel.append(amountToDrawInput);
	amountToDrawInput.focusout(function() { 
		var userInput = parseInt(Math.abs($(this).val()));
		if (isNumber(userInput)) {
			var maxValue = _that.dataContainer.draws[drawID].pagesToDraw.length;
			if (parseInt(userInput) > maxValue) {
				$(this).val(maxValue);
				userInput = maxValue;
			} else {
				$(this).val(userInput);
			}
		} else {
			$(this).val(0);
			userInput = 0;
		}
		
		_that.changeDrawOptions(drawID, { amountToDraw: userInput }) 
	});

	return wrapper;
};

DrawPages.prototype.changeDrawOptions = function(drawID, data) {
	var _that = this;

	if (!isUndefined(data.amountToDraw)) {

		_that.dataContainer.draws[drawID].opts.amountToDraw = parseInt(data.amountToDraw);
		_that.saveData();	
	}
};

DrawPages.prototype.deletePagesFromDraw = function(drawID) {
	var _that = this;

	var selectedPages = $('#project-options-o3 .drawpages-singledraw-wrapper[drawid="'+drawID+'"] .drawpages-draw-selectedpage');

	var save = false;

	selectedPages.each(function() {
		var pageID = parseInt($(this).attr('pageid'));
		var indexOfPage = _that.dataContainer.draws[drawID].pagesToDraw.indexOf(pageID);
		_that.dataContainer.draws[drawID].pagesToDraw.splice(indexOfPage, 1);
		$(this).remove();

		if (_that.dataContainer.draws[drawID].pagesToDraw.length < _that.dataContainer.draws[drawID].opts.amountToDraw) {
			_that.dataContainer.draws[drawID].opts.amountToDraw = _that.dataContainer.draws[drawID].pagesToDraw.length;
			$('#project-options-o3 .drawpages-singledraw-wrapper[drawid="'+drawID+'"] .drawpages-amounttodrawinput').val(_that.dataContainer.draws[drawID].opts.amountToDraw);
		}

		save = true;
	});

	if (save) {
		_that.refreshProjectListAvailability();
		_that.saveData();
	}
};

DrawPages.prototype.selectSinglePage = function(ob) {
	var _that = this;
	if (!ob.hasClass('drawpages-disabled')) {
		ob.addClass('drawpages-selectedpage');
		_that.selectedPages.push(parseInt(ob.attr('pageid')));
	}
};

DrawPages.prototype.deselectSinglePage = function(ob) {
	var _that = this;
	_that.selectedPages.splice(_that.selectedPages.indexOf(parseInt(ob.attr('pageid'))), 1);
	ob.removeClass('drawpages-selectedpage');
};

DrawPages.prototype.draws_selectSinglePage = function(ob) {
	ob.addClass('drawpages-draw-selectedpage');
};

DrawPages.prototype.draws_deselectSinglePage = function(ob) {
	ob.removeClass('drawpages-draw-selectedpage');
};

DrawPages.prototype.deleteDraw = function(drawID) {
	var _that = this;

	delete _that.dataContainer.draws[drawID];

	_that.refreshAllDrawsHTML();
	_that.refreshProjectListAvailability();
	_that.saveData();
};

DrawPages.prototype.saveData = function() {
	var _that = this;

	ACV.pageDraws = _that.dataContainer;
	update_changes('', 'update_options');
};





/////////////////////////////////////////
// Init DrawPages
////////////////////////////////////////
var drawpages;
$(document).ready(function() {
	drawpages = new DrawPages();
	drawpages.drawListOfPagesHTML();
});