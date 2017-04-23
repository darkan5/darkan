module.exports = EventDispatcher;


function EventDispatcher()
{
    this.listeners = {};
}

EventDispatcher.prototype.trigger = function(type, params, sender)
{
    if(this.listeners[type] != null)
    this.listeners[type](params, sender);
}

EventDispatcher.prototype.on = function(type, callback)
{
    this.listeners[type] = callback;
}

EventDispatcher.prototype.off = function(type)
{
    delete this.listeners[type];
}