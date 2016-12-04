/* 
 *  Created by Somesh Chatterjee.
 */

function ItemMaster()
{
    var _infoItemMaster = new InfoItemMaster();
    var _headerNames = _infoItemMaster.TableHeaderNames;
    var _tableHeader= _infoItemMaster.Data.TableHeader;
    
    var _idIndex = _tableHeader.indexOf(_headerNames.ID);
    var _mocIndex = _tableHeader.indexOf(_headerNames.MOC);
    var _qualityCodeIndex = _tableHeader.indexOf(_headerNames.QualityCode);    
    
    this.Setup = function ()
    {
        DomFunctions.$("#Temp")[0].innerHTML = _infoItemMaster.GetTable();
        SetupDropdowns();
        SetupSubmit();
        SetupForID(true);        
        FormHelper.SetupDefaultValues(true);
        FormHelper.SetupDataTableWrapper(_infoItemMaster, "");
    }
    
    function SetupDropdowns()
    {
        FormHelper.SetupDropdown("#ItemMasterIDInput", _infoItemMaster.GetDataFor(_idIndex));
        FormHelper.SetupDropdown("#MOCInput", _infoItemMaster.GetDataFor(_mocIndex));
        FormHelper.SetupDropdown("#QualityCodeInput", _infoItemMaster.GetDataFor(_qualityCodeIndex));   
    }    
    
    function SetupSubmit()
    {
        DomFunctions.$("#ItemMasterForm")[0].onsubmit = TrySubmitForm;
    }    
    
    function SetupForID(addEventHandlers)
    {
        var ids = _infoItemMaster.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        var firstId = 1;
                
        $("#ItemMasterIDInput").val(nextId);
                
        if (addEventHandlers)
        {
            $("#ItemMasterIDEnableEdit").click(function ()
            {
                ToggleIDField(firstId);
            });        

            $("#ItemMasterIDInput").blur(function ()
            {
                OnUserSelectedId(firstId);
            });            
        }
    }    
    
    function ToggleIDField(firstId)
    {
        var ids = _infoItemMaster.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var isInputDisbaled = $("#ItemMasterIDInput").is(":disabled");
        if (isInputDisbaled)
        {
            $("#ItemMasterIDInput").val(firstId);
            SetValuesForId(firstId - 1);
            $("#ItemMasterIDInput").attr("disabled", false);    
        }
        else
        {
            ResetIDAndDisableField(nextId);
        }
    }
    
    function OnUserSelectedId(firstId)
    {
        var ids = _infoItemMaster.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var userEditedId = $("#ItemMasterIDInput").val();
        if ((userEditedId != Number(userEditedId)) ||(userEditedId >= nextId) || (userEditedId < firstId))
        {
            ResetIDAndDisableField(nextId);
            return;
        }
        var indexOfId = FormHelper.GetIndexOfFirstByNumberTypeThenOrigType(ids, userEditedId);
        SetValuesForId(indexOfId);
    }    
    
    function SetValuesForId(indexOfId)
    {
        $("#MOCInput").val(_infoItemMaster.GetDataFor(_mocIndex)[indexOfId]);        
        $("#QualityCodeInput").val(_infoItemMaster.GetDataFor(_qualityCodeIndex)[indexOfId]);              
    }
    
    function ResetIDAndDisableField(nextId)
    {
        $("#ItemMasterIDInput").val(nextId);
        $("#ItemMasterIDInput").attr("disabled", true);            
        FormHelper.SetupDefaultValues(false);
    }    
    
    function TrySubmitForm()
    {
        var moc = $("#MOCInput").val();
        var qualityCode = $("#QualityCodeInput").val();
        if (FormHelper.CheckIfInputHasValue(moc) ||
            FormHelper.CheckIfInputHasValue(qualityCode))
        {
            alert(Strings.EitherMOCOrQualityCodeNotDefined);
            return false;
        }
      
        var valuesArray = [moc, qualityCode];
        var arraysArray = [_infoItemMaster.GetDataFor(_mocIndex), _infoItemMaster.GetDataFor(_qualityCodeIndex)];
        
        var duplicateIndex = FormHelper.GetIndexIfDuplicate(valuesArray, arraysArray);
        
        var userEnteredId = $("#ItemMasterIDInput").val();
        if (duplicateIndex !== -1)
        {
            var duplicateId = duplicateIndex + 1;
            if (duplicateId != userEnteredId)
            {
                alert(Strings.DuplicateEntryForItemMaster + duplicateId);                
                return false;
            }
        }
        UpdatePageWithNewData(userEnteredId, moc, qualityCode);
        alert(Strings.SuccessfulSubmit + userEnteredId);                
        
        return false;
    }    
    
    function UpdatePageWithNewData(userEnteredId, moc, qualityCode)
    {     
        var newRow = [];
        newRow[_idIndex]= userEnteredId;
        newRow[_mocIndex] = moc;
        newRow[_qualityCodeIndex] = qualityCode;
        
        var newRowAdded = FormHelper.UpdateDataTableWith(_infoItemMaster, newRow, userEnteredId);
        _infoItemMaster.SetItemMasterData(newRowAdded, newRow);
        SetupDropdowns();
        SetupForID(false);
        FormHelper.SetupDefaultValues(false);
        $("#ItemMasterIDInput").attr("disabled", true);  
    }    
    
}
