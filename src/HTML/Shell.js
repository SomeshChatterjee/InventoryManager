/* 
 *  Created by Somesh Chatterjee.
 */
var ShellFunctions = (function ()
{
    function pageX(elem) 
    {
        return elem.offsetParent ? (elem.offsetLeft + pageX(elem.offsetParent)) : elem.offsetLeft;
    }                

    function resizeIframe() 
    {
        var dashboard = DomFunctions.$("#Dashboard")[0];
        var header = DomFunctions.$("#HeaderArea")[0];
        var menu = DomFunctions.$("#LeftNavigation")[0];
        dashboard.style.maxHeight = menu.scrollHeight + "px";
        dashboard.style.maxWidth = header.scrollWidth - menu.scrollWidth + "px";
        dashboard.style.height = menu.scrollHeight + "px";
        dashboard.style.width = header.scrollWidth - menu.scrollWidth + "px";
    }              
    
    var MenuExpanderCloser = ["#MenuExpander", "#MenuCloser"];
    var MenuItemSelector = ["#MenuBodyDasboard", "#MenuBodyIncoming", "#MenuBodyOutgoing", "#MenuBodyCompanyMaster", "#MenuBodyTransporter", "#MenuBodyItemMaster"];
    
    function RegisterEventHandlers()
    {
        DomFunctions.bind("#MenuExpander", "click", ExpandMenu);
        DomFunctions.bind("#MenuCloser", "click", CloseMenu);
        
        DomFunctions.bind("#MenuBodyDasboard", "click", ShowMenuBodyDasboard);
        DomFunctions.bind("#MenuBodyIncoming", "click", ShowMenuBodyIncoming);
        DomFunctions.bind("#MenuBodyOutgoing", "click", ShowMenuBodyOutgoing);
        DomFunctions.bind("#MenuBodyCompanyMaster", "click", ShowMenuBodyCompanyMaster);
        DomFunctions.bind("#MenuBodyTransporter", "click", ShowMenuBodyTransporter);
        DomFunctions.bind("#MenuBodyItemMaster", "click", ShowMenuBodyMenuBodyItemMaster);
    }
    
    function SetDefaultPage()
    {
        SetMainPageTo("Dashboard.html");
    }
    
    function ExpandMenu(e)
    {
        DomFunctions.removeClass("#MenuHeader", "Hidden");
        DomFunctions.removeClass("#MenuBody", "Hidden");
        DomFunctions.addClass("#MenuExpander", "Hidden");
        var navigation = DomFunctions.$("#LeftNavigation")[0];
        navigation.style.width = "230px";
        resizeIframe();
    }
    
    function CloseMenu(e)
    {
        DomFunctions.addClass("#MenuHeader", "Hidden");
        DomFunctions.addClass("#MenuBody", "Hidden");
        DomFunctions.removeClass("#MenuExpander", "Hidden");        
        var navigation = DomFunctions.$("#LeftNavigation")[0];
        navigation.style.width = "30px";
        resizeIframe();
    }
    
    function ShowMenuBodyDasboard(e)
    {
        AddClassNameTo("#MenuBodyDasboard", MenuItemSelector);
        SetMainPageTo("Dashboard.html");
    }
    
    function ShowMenuBodyIncoming(e)
    {
        AddClassNameTo("#MenuBodyIncoming", MenuItemSelector);
        SetMainPageTo("Incoming.html");
    }
    
    function ShowMenuBodyOutgoing(e)
    {
        AddClassNameTo("#MenuBodyOutgoing", MenuItemSelector);
        SetMainPageTo("Outgoing.html");
    }
    
    function ShowMenuBodyCompanyMaster(e)
    {
        AddClassNameTo("#MenuBodyCompanyMaster", MenuItemSelector);
        SetMainPageTo("CompanyMaster.html");
    }    
    
    function ShowMenuBodyTransporter(e)
    {
        AddClassNameTo("#MenuBodyTransporter", MenuItemSelector);
        SetMainPageTo("Transporter.html");
    }        
    
    function ShowMenuBodyMenuBodyItemMaster(e)
    {
        AddClassNameTo("#MenuBodyItemMaster", MenuItemSelector);
        SetMainPageTo("ItemMaster.html");
    }        
    
    function AddClassNameTo(addTo, removeFrom)
    {
        for (var i = 0; i < removeFrom.length; ++i)
        {
            if (removeFrom[i] === addTo)
            {
                DomFunctions.addClass(removeFrom[i], "MenuBodySelected");
            }
            else
            {
                DomFunctions.removeClass(removeFrom[i], "MenuBodySelected");
            }

        }
    }
    
    function SetMainPageTo(address)
    {
        var dashboard = DomFunctions.$("#Dashboard")[0];
        dashboard.src = address;
        dashboard.onload = function () {
            resizeIframe();
        };
    }
    
    return {
        RegisterEventHandlers: RegisterEventHandlers,
        SetDefaultPage: SetDefaultPage
    };
})();