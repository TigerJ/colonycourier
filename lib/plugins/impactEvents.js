ig.module
(
    'plugins.impactEvents'
)
.requires
(
    'impact.game'
)
.defines(function () {
    
    // event aggregator
    ig.Game.prototype._publishers = {};
    
    // if you want your callback to execute in a specific context
    // make sure to pass callback with bind()
    // ex. addListener(this, "onclick" (function () { [...] }).bind(this));
    ig.Game.prototype.addListener = function (publisher, event, callback) {
        if (!publisher._uniqueId === "undefined") {
            publisher._uniqueId = ig.game._nextId();
        }
    
        if (!this._publishers[publisher._uniqueId]) {
            this._publishers[publisher._uniqueId] = {};
        }
    
        if (!this._publishers[publisher._uniqueId][event] || !(this._publishers[publisher._uniqueId][event] instanceof Array)) {
            this._publishers[publisher._uniqueId][event] = [];
        }
    
        var nextId = ig.game._nextId();
    
        this._publishers[publisher._uniqueId][event].push({ callback: callback, uniqueId: nextId });
        
        return nextId;
    };
    
    ig.Game.prototype.fire = function (publisher, event) {
        if (this._publishers !== undefined && this._publishers[publisher._uniqueId] !== undefined) {
            
            // copy the list of methods to invoke to a local
            // array so that if publishers is modified by virtue
            // of any method invocation, we don't get any errors            
            var invokeList = [];
            for (var i = 0; i < this._publishers[publisher._uniqueId][event].length; i++) {
                invokeList.push(this._publishers[publisher._uniqueId][event][i].callback);
            }
            for (var i = 0; i < invokeList.length; i++){
                
                if (arguments[2] !== null && arguments[2] !== "undefined"){
                    invokeList[i](arguments[2]);    
                }
                else {
                    invokeList[i]();
                }
                
            }
            
            // yeah I know it's leaving scope now anyway
            delete invokeList;
        }
    };
    
    ig.Game.prototype.removeListener = function (publisher, event, uniqueId) {
        if (this._publishers !== undefined && this._publishers[publisher._uniqueId] !== undefined) {
            for (var i = 0; i < this._publishers[publisher._uniqueId][event].length; i++){
                if (this._publishers[publisher._uniqueId][event][i].uniqueId === uniqueId){
                    this._publishers[publisher._uniqueId][event].splice(i,1);
                    break;
                }
            }
        }
    }
    
    ig.Game.prototype._nextId = function () {
        if (!this._uniqueId) { this._uniqueId = 0; }
        
        return this._uniqueId++;
    };
    
    // direct entity API
    // if you want your callback to execute in a specific context
    // make sure to pass callback with bind()
    // ex. addListener("onclick" (function () { [...] }).bind(this));
    ig.Entity.prototype.addListener = function (event, callback) {
        return ig.game.addListener(this, event, callback);
    };
    
    ig.Entity.prototype.removeListener = function (event, uniqueAttachment) {
        ig.game.removeListener(this, event, uniqueAttachment);
    }
    
    ig.Entity.prototype.fire = function (event) {
        
        if (arguments[1] !== null && arguments[1] !== "undefined"){
            ig.game.fire(this, event, arguments[1]);
        }
        else {
            ig.game.fire(this, event);   
        }
    };
    
    ig.Entity.inject({
        kill: function () {
            this.parent();
            
            // delete publisher references in the aggregator
            if (ig.game._publishers !== undefined && this._uniqueId > 0 && ig.game._publishers[this._uniqueId] !== undefined){
                delete ig.game._publishers[this._uniqueId];
            }
        }           
    });
    
    // animation API
    ig.Animation.prototype.onComplete = function (callback) {
        var uniqueId = ig.game.addListener(this, "complete", callback);
        var completeData = {loopCount: this.loopCount, uniqueId: uniqueId};
        
        if (this._completeData === undefined || typeof(this._completeData) !== "array"){
            this._completeData = [];
        }
        
        this._completeData.push(completeData);
        
        return uniqueId;
    }

    ig.Animation.prototype.onKeyframe = function (keyframe, callback) {
        var uniqueId = ig.game.addListener(this, "onKeyframe" + keyframe, callback);
        var onKeyframe = { loopCount: this.loopCount, keyframe: keyframe, uniqueId: uniqueId };
        
        if (this._keyframeData === undefined || typeof(this._keyframeData) !== "array"){
            this._keyframeData = [];
        }
        
        this._keyframeData.push(onKeyframe);
        
        return uniqueId;
    }

    ig.Animation.inject({
        update: function () {

            this.parent();

            if (this._completeData && this._completeData.length > 0) {
                for (var i = 0; i < this._completeData.length; i++) {
                    if (this.loopCount > this._completeData[i].loopCount) {
                        try {
                            ig.game.fire(this, "complete");
                        }
                        finally {
                            // stop notifying automatically.
                            // extend or change to notify perpetually
                            ig.game.removeListener(this, "complete", this._completeData[i].uniqueId);
                        }
                    }
                }
            }

            if (this._keyframeData && this._keyframeData.length > 0) {
                for (var i = 0; i < this._keyframeData.length; i++) {
                    if (this.frame >= this._keyframeData[i].keyframe) {
                        try{
                            ig.game.fire(this, "onKeyframe" + this._keyframeData[i].keyframe);
                        }
                        finally{
                            // remove this from the notifications
                            ig.game.removeListener(this, "onKeyframe" + this._keyframeData[i].keyframe, this._keyframeData[i].uniqueId);
                        }
                    }
                }
            }
        }
    });
});