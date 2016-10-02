/* 
 *  Created by Somesh Chatterjee.
 */

function Dashboard()
{
    var _infoDashboard = new InfoDashboard();   
    this.Setup = function ()
    {
        var dashboardTableId = "Dashboard";
        var superLedgerTableId = "SuperLedger";
        var dashboardTableData = _infoDashboard.GetDashboardTableData();
        var superLedgerTableData = _infoDashboard.GetDashboardSuperLedgerTableData();
        DomFunctions.$("#DashboadDiv")[0].innerHTML = TableCreator.GetTable(dashboardTableData, dashboardTableId);
        var superLedgerTable = TableCreator.GetTable(superLedgerTableData, superLedgerTableId);
        DomFunctions.$("#DashboadSupLedger")[0].innerHTML = superLedgerTable;
        SetupDropdowns();
        SetupSubmit();
        SetupForID(true);        
        FormHelper.SetupDefaultValues(true);
        var dashboard = {
            Data: dashboardTableData,
            TableId: dashboardTableId
        };
        FormHelper.SetupDataTableWrapper(dashboard, "");
        var superLedger = {
            Data: superLedgerTableData,
            TableId: superLedgerTableId
        };
        var dateColumnNumber = superLedgerTableData.TableHeader.indexOf(TableHeaderNames.DashboardSuperLedger.Date);
        FormHelper.SetupDataTableWrapperWithSort(superLedger, "", dateColumnNumber, "desc");        
        SetupDatePickers();
    }
    
    function SetupDatePickers()
    {
        FormHelper.SetupDateRangePicker("#FromDateInput", "#ToDateInput", -30, 0);
    }    
    
    function SetupDropdowns()
    {
    }    
    
    function SetupSubmit()
    {
        DomFunctions.$("#DashboardForm")[0].onsubmit = TrySubmitForm;
    }    
    
    function SetupForID(addEventHandlers)
    {
    }    
    
    function ToggleIDField(firstId)
    {
    }
    
    function OnUserSelectedId(firstId)
    {
    }    
    
    function TrySubmitForm()
    {
        return false;
    }    
    
}