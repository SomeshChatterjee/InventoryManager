/* 
 *  Created by Somesh Chatterjee.
 */
function HTMLElement(type, id, classNames) 
{
    this.Type = type;
    this.ID = id;
    this.Content = [];
    this.ClassNames = classNames;
    this.Events = [];
    this.Attributes = [];
    
    this.GetElement= function ()
    {
        return "<"+this.Type+" id='"+this.ID+"' class='"+this.ClassNames.join(" ")+"' "+ this.Events.join(" ") +" " + this.Attributes.join(" ") + " >" + this.Content.join(" ") + "</" + this.Type + ">";
    };
    this.RemoveClass = function(className)
    {
        var index = this.ClassNames.indexOf(className);
        this.ClassNames.splice(index, 1);
    };
    this.AddClass = function(className)
    {
        this.ClassNames.push(className);
    };
    this.AddContent = function (content)
    {
        this.Content.push(content);
    };
    
    this.AddEvent = function (event)
    {
        this.Events.push(event);
    };
    
    this.AddAttribute = function (attribute)
    {
        this.Attributes.push(attribute);
    };
}