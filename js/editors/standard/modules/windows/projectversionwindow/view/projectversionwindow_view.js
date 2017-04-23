var ProjectVersionWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-project-version-view',

    template: _.template($('#window-project-version-template').html()),

    events: {
        'close': 'close',
        'click .window-close-button': 'close',
        'click .project-version-button-new': 'saveNewProjectVersioin',
        'click .PVersionDeleteButton': 'deleteProjectVersion',
        'click .PVersionRestoreButton': 'restoreProjectVersion'
    },

    afterRender: function() {
        this.getProjectVersionList();
    },

    deleteProjectVersion: function(e) {

        var _that = this;

        this.showModalWindowView();

        var target = $(e.currentTarget);
        var projectVersionID = target.attr('pid');

        var request = {
            request: 13,
            version_id: projectVersionID,
            project_id: __meta__.projectID
        };

        DataAccess.projectVersioinRequest(
            { request: request },
            function(data) {

                // udany resize

                var dataJ = JSON.parse(data);

                var projectVersionList = dataJ.list;

                _that.showProjectVersionList(projectVersionList);

                _that.hideModalWindowView();

            },
            function(data) { _log('data', data) }
        );
    },

    restoreProjectVersion: function(e) {

        var _that = this;

        this.showModalWindowView();

        var target = $(e.currentTarget);
        var projectVersionID = target.attr('pid');

        var request = {
            request: 12,
            project_id: __meta__.projectID,
            version_id: projectVersionID,
            save: 0             // 0 - nie zapisuje biezacego stanu do nowje wersji; 1 - zapisuje biezacy stan
        };


        DataAccess.projectVersioinRequest(
            { request: request },
            function(data) {

                // udany resize

                window.location.reload();

            },
            function(data) { _log('data', data) }
        );
    },

    getProjectVersionList: function() {

        var _that = this;

        var request = {
            request: 10,
            project_id: __meta__.projectID
        };

        DataAccess.projectVersioinRequest(
            { request: request },
            function(data) {

                // udany resize

                var dataJ = JSON.parse(data);

                var projectVersionList = dataJ.list;

                _that.showProjectVersionList(projectVersionList);

            },
            function(data) { _log('data', data) }
        );

    },

    showProjectVersionList: function(data) {

        var _that = this;


        var appendHTML = '<ul>';

        _.each(data, function(pVersion) {

            appendHTML += '<li pid="' + pVersion.id + '" title="Wielkość: ' + (pVersion.size / 1024 / 1024).toFixed(2) + 'MB<br>Opis: ' + pVersion.description + '">';
            appendHTML += '<div class="PVersionDate">' + pVersion.date + '</div>';
            appendHTML += '<div class="PVersionUser">' + pVersion.login + '</div>';
            appendHTML += '<div class="PVersionButtons">';
            appendHTML += '<div title="'+ _lang('PVERSION_PDELETE') +'" class="PVersionDeleteButton" pid="' + pVersion.id + '"></div>';
            appendHTML += '<div title="'+ _lang('PVERSION_PRESTORE') +'" class="PVersionRestoreButton" project_id="' + __meta__.projectID + '" pid="' + pVersion.id + '"></div>';
            appendHTML += '</div>';
            appendHTML += '</li>';
        });

        appendHTML += '</ul>';

        this.$el.find('.project-version-list-container').html(appendHTML);

    },

    saveNewProjectVersioin: function() {

        var _that = this;

        this.showModalWindowView();

        var czas = new Date();
        var hour = this.zeroWiodace(czas.getHours()) + ':' + this.zeroWiodace(czas.getMinutes()) + ':' + this.zeroWiodace(czas.getSeconds());
        var date = czas.getFullYear() + '-' + this.zeroWiodace(czas.getMonth()+1) + '-' + this.zeroWiodace(czas.getDate());

        var description = this.$el.find('.project-version-description-input').val();

        var request = {
            request: 11,
            description: description,
            project_id: __meta__.projectID,
            date: date + ' ' + hour
        }

        DataAccess.projectVersioinRequest(
            { request: request },
            function(data) {


                var dataJ = JSON.parse(data);

                var projectVersionList = dataJ.list;

                _that.showProjectVersionList(projectVersionList);

                _that.hideModalWindowView();

            },
            function(data) { _log('data', data) }
        );
    },

    zeroWiodace: function(i) {
        return (i < 10) ? '0'+i : i;
    }

});