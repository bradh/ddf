var ManagedServiceFactory = Backbone.Model.extend({
    initialize: function(options) {
        _.bindAll(this,"createNewSource");
        this.metatype = new MetaType.Collection(options.metatype);
    },
    createNewSource: function() {
        var source = new Source();
        source.initializeFromMSF(this);
        return source;
    }
});

ManagedServiceFactory.Collection = Backbone.Collection.extend({
    model : ManagedServiceFactory,
    url : "/jolokia/exec/org.codice.ddf.ui.admin.api.ConfigurationAdmin:service=ui,version=2.3.0/listDefaultFilteredFactoryConfigurations/",
    sync: function(method, model, options) {
        options.dataType = "json";
        return Backbone.sync(method, model, options);
    },
    parse: function (response) {
        return response.value;
    }
});