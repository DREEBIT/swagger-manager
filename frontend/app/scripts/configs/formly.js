'use strict';

angular.module('amApp')
    .run(function (formlyConfig, formlyValidationMessages) {

        formlyValidationMessages.addStringMessage('required', 'This field is required');
        formlyValidationMessages.addStringMessage('email', 'This field has to be a valid email, i.e. john.doe@example.com');
        formlyValidationMessages.addStringMessage('url', 'This field has to be a valid url, i.e. http://example.com');

        formlyConfig.setType({
            name: 'input-focus',
            extends: 'input',
            template: '<input ng-model="model[options.key]" formly-focus="{{options.templateOptions.focus}}" focus-wait="600">'
        });

        formlyConfig.setType({
            name: 'checkbox',
            overwriteOk: true,
            template: '<md-checkbox class="md-primary" ng-model="model[options.key]">{{to.label}}</md-checkbox>'
        });

        formlyConfig.setType({
            name: 'ui-select-single',
            template: '<ui-select data-ng-model="model[options.key]" data-required="{{to.required}}" data-disabled="{{to.disabled}}" theme="bootstrap">'+
            '<ui-select-match placeholder="{{to.placeholder}}" data-allow-clear="true">{{$select.selected[to.labelProp]}}</ui-select-match>'+
            '<ui-select-choices data-repeat="{{to.ngOptions}}">'+
            '<div ng-bind-html="option[to.labelProp] | highlight: $select.search"></div>'+
            '</ui-select-choices>'+
            '</ui-select>'
        });

        formlyConfig.setType({
            name: 'ui-select-multiple',
            extends: 'select',
            overwriteOk: true,
            template: '<ui-select multiple data-ng-model="model[options.key]" data-required="{{to.required}}" data-disabled="{{to.disabled}}" theme="bootstrap"> <ui-select-match placeholder="{{to.placeholder}}">{{$item[to.labelProp]}}</ui-select-match> <ui-select-choices data-repeat="{{to.ngOptions}}"> <div ng-bind-html="option[to.labelProp] | highlight: $select.search"></div> </ui-select-choices> </ui-select>'
        });

        formlyConfig.setType({
            name: 'md-auto-complete',
            template: '<md-autocomplete md-selected-item="model[options.key]" ng-disabled="{{to.disabled}}" placeholder="{{to.placeholder}}" ' +
            'md-items="item in {{to.options}}" md-item-text="item[to.labelProp]"' +
            'md-search-text="searchText" md-min-length="1">' +
            '<md-item-template><span md-highlight-text="searchText" md-highlight-flags="^i">{{item[to.labelProp]}}</span></md-item-template>' +
            '<md-not-found>No states matching "{{searchText}}" were found.</md-not-found>' +
            '</md-autocomplete>'
        });
    });
