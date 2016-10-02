/* 
 *  Created by Somesh Chatterjee.
 */
var DomFunctions = (function ()
{
    function $(path, parent)
    {
        parent = parent || document;
        return parent.querySelectorAll(path);
    }

    function hasClass(element, className)
    {
        element = GetElement(element);
        var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
        return regex.test(element.className);
    }

    function addClass(element, className)
    {
        element = GetElement(element);
        if (!hasClass(element, className))
        {
            element.className += " " + className;
        }
    }
    
    function removeClass(element, className)
    {
        element = GetElement(element);
        var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
        element.className = element.className.replace(regex, "");
    }
    
    function bind(element, event, handler)
    {
        element = GetElement(element);
        element.addEventListener(event, handler, false);
    }
    
    function GetElement(element)
    {
        if (typeof element == "string")
        {
            element = $(element)[0];
        }
        return element;
    }
    
    return {
        $: $,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        bind: bind
    };

})();