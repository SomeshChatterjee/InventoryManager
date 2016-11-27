/* 
 *  Created by Somesh Chatterjee.
 */

function Transporter()
{
    var _infoTransporter = new InfoTransporter();
    var _headerNames = _infoTransporter.TableHeaderNames;
    var _tableHeader= _infoTransporter.Data.TableHeader;
    
    var _idIndex = _tableHeader.indexOf(_headerNames.ID);
    var _transporterNameIndex = _tableHeader.indexOf(_headerNames.TransporterName);
    var _transporterAddressIndex = _tableHeader.indexOf(_headerNames.TransporterAddress);    
    var _transporterContactIndex = _tableHeader.indexOf(_headerNames.Contact);    
    
    this.Setup = function ()
    {
        DomFunctions.$("#Temp")[0].innerHTML = _infoTransporter.GetTable();
        SetupSubmit();
        SetupForID(true);        
        FormHelper.SetupDefaultValues(true);
        FormHelper.SetupDataTableWrapper(_infoTransporter, "");
    }
    
    function SetupSubmit()
    {
        DomFunctions.$("#TransporterForm")[0].onsubmit = TrySubmitForm;
    }    
    
    function SetupForID(addEventHandlers)
    {
        var ids = _infoTransporter.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        var firstId = 1;
                
        $("#TransporterIDInput").val(nextId);
                
        if (addEventHandlers)
        {
            $("#TransporterIDEnableEdit").click(function ()
            {
                ToggleIDField(firstId);
            });        

            $("#TransporterIDInput").blur(function ()
            {
                OnUserSelectedId(firstId);
            });            
        }
    }    
    
    function ToggleIDField(firstId)
    {
        var ids = _infoTransporter.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var isInputDisbaled = $("#TransporterIDInput").is(":disabled");
        if (isInputDisbaled)
        {
            $("#TransporterIDInput").val(firstId);
            SetValuesForId(firstId - 1);
            $("#TransporterIDInput").attr("disabled", false);    
        }
        else
        {
            ResetIDAndDisableField(nextId);
        }
    }
    
    function OnUserSelectedId(firstId)
    {
        var ids = _infoTransporter.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var userEditedId = $("#TransporterIDInput").val();
        if ((userEditedId != Number(userEditedId)) ||(userEditedId >= nextId) || (userEditedId < firstId))
        {
            ResetIDAndDisableField(nextId);
            return;
        }
        var indexOfId = ids.indexOf(userEditedId);
        SetValuesForId(indexOfId);
    }    
    
    function SetValuesForId(indexOfId)
    {
        $("#TransporterInput").val(_infoTransporter.GetDataFor(_transporterNameIndex)[indexOfId]);        
        $("#TransporterAddressInput").val(_infoTransporter.GetDataFor(_transporterAddressIndex)[indexOfId]);              
        $("#ContactDropdownInput").val(_infoTransporter.GetDataFor(_transporterContactIndex)[indexOfId]);        
    }
    
    function ResetIDAndDisableField(nextId)
    {
        $("#TransporterIDInput").val(nextId);
        $("#TransporterIDInput").attr("disabled", true);            
        FormHelper.SetupDefaultValues(false);
    }    
    
    function TrySubmitForm()
    {
        var transporterName = $("#TransporterInput").val();
        if (FormHelper.CheckIfInputHasValue(transporterName))
        {
            alert(Strings.TransporterNameNotDefined);
            return false;
        }
      
        var valuesArray = [transporterName];
        var arraysArray = [_infoTransporter.GetDataFor(_transporterNameIndex)];
        
        var duplicateIndex = FormHelper.GetIndexIfDuplicate(valuesArray, arraysArray);
        
        var userEnteredId = $("#TransporterIDInput").val();
        if (duplicateIndex !== -1)
        {
            var duplicateId = duplicateIndex + 1;
            if (duplicateId != userEnteredId)
            {
                alert(Strings.DuplicateEntryForTransporter + duplicateId);                
                return false;
            }
        }

        UpdatePageWithNewData(userEnteredId, transporterName);
        alert(Strings.SuccessfulSubmit + userEnteredId);                
        return false;
    }    
    
    function UpdatePageWithNewData(userEnteredId, companyName)
    {
        var companyAddress = $("#TransporterAddressInput").val();
        var contact = $("#ContactDropdownInput").val();
        
        var newRow = [];
        newRow[_idIndex]= userEnteredId;
        newRow[_transporterNameIndex] = companyName;
        newRow[_transporterAddressIndex] = companyAddress;
        newRow[_transporterContactIndex] = contact;
        
        var newRowAdded = FormHelper.UpdateDataTableWith(_infoTransporter, newRow, userEnteredId);
        _infoTransporter.SetTransporterData(newRowAdded, newRow);
        SetupForID(false);
        FormHelper.SetupDefaultValues(false);
        $("#TransporterIDInput").attr("disabled", true);  
    }    
    
}
