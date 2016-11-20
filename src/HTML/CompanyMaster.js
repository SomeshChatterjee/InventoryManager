/* 
 *  Created by Somesh Chatterjee.
 */

function CompanyMaster()
{
    var _infoCompanyMaster = new InfoCompanyMaster();
    var _headerNames = _infoCompanyMaster.TableHeaderNames;
    var _tableHeader= _infoCompanyMaster.Data.TableHeader;
    
    var _idIndex = _tableHeader.indexOf(_headerNames.ID);
    var _companyNameIndex = _tableHeader.indexOf(_headerNames.CompanyName);
    var _companyAddressIndex = _tableHeader.indexOf(_headerNames.CompanyAddress);    
    var _companyContactIndex = _tableHeader.indexOf(_headerNames.Contact);    
    
    this.Setup = function ()
    {
        DomFunctions.$("#Temp")[0].innerHTML = _infoCompanyMaster.GetTable();
        SetupSubmit();
        SetupForID(true);        
        FormHelper.SetupDefaultValues(true);
        FormHelper.SetupDataTableWrapper(_infoCompanyMaster, "");
        FormHelper.RedrawTables("#" + _infoCompanyMaster.TableId);
    }
    
    function SetupSubmit()
    {
        DomFunctions.$("#CompanyMasterForm")[0].onsubmit = TrySubmitForm;
    }    
    
    function SetupForID(addEventHandlers)
    {
        var ids = _infoCompanyMaster.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        var firstId = 1;
                
        $("#CompanyMasterIDInput").val(nextId);
                
        if (addEventHandlers)
        {
            $("#CompanyMasterIDEnableEdit").click(function ()
            {
                ToggleIDField(firstId);
            });        

            $("#CompanyMasterIDInput").blur(function ()
            {
                OnUserSelectedId(firstId);
            });            
        }
    }    
    
    function ToggleIDField(firstId)
    {
        var ids = _infoCompanyMaster.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var isInputDisbaled = $("#CompanyMasterIDInput").is(":disabled");
        if (isInputDisbaled)
        {
            $("#CompanyMasterIDInput").val(firstId);
            SetValuesForId(firstId - 1);
            $("#CompanyMasterIDInput").attr("disabled", false);    
        }
        else
        {
            ResetIDAndDisableField(nextId);
        }
    }
    
    function OnUserSelectedId(firstId)
    {
        var ids = _infoCompanyMaster.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var userEditedId = $("#CompanyMasterIDInput").val();
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
        $("#CompanyDropdownInput").val(_infoCompanyMaster.GetDataFor(_companyNameIndex)[indexOfId]);        
        $("#CompanyAddressInput").val(_infoCompanyMaster.GetDataFor(_companyAddressIndex)[indexOfId]);              
        $("#ContactDropdownInput").val(_infoCompanyMaster.GetDataFor(_companyContactIndex)[indexOfId]);        
    }
    
    function ResetIDAndDisableField(nextId)
    {
        $("#CompanyMasterIDInput").val(nextId);
        $("#CompanyMasterIDInput").attr("disabled", true);            
        FormHelper.SetupDefaultValues(false);
    }    
    
    function TrySubmitForm()
    {
        var companyName = $("#CompanyDropdownInput").val();
        if (FormHelper.CheckIfInputHasValue(companyName))
        {
            alert(Strings.CompanyNameNotDefined);
            return false;
        }
      
        var valuesArray = [companyName];
        var arraysArray = [_infoCompanyMaster.GetDataFor(_companyNameIndex)];
        
        var duplicateIndex = FormHelper.GetIndexIfDuplicate(valuesArray, arraysArray);
        
        var userEnteredId = $("#CompanyMasterIDInput").val();
        if (duplicateIndex !== -1)
        {
            var duplicateId = duplicateIndex + 1;
            if (duplicateId != userEnteredId)
            {
                alert(Strings.DuplicateEntryForCompanyMaster + duplicateId);                
                return false;
            }
        }
        UpdatePageWithNewData(userEnteredId, companyName);
        alert(Strings.SuccessfulSubmit + userEnteredId);                
        
        return false;
    }    
    
    function UpdatePageWithNewData(userEnteredId, companyName)
    {
        var companyAddress = $("#CompanyAddressInput").val();
        var contact = $("#ContactDropdownInput").val();
        
        var newRow = [];
        newRow[_idIndex]= userEnteredId;
        newRow[_companyNameIndex] = companyName;
        newRow[_companyAddressIndex] = companyAddress;
        newRow[_companyContactIndex] = contact;
        
        FormHelper.UpdateDataTableWith(_infoCompanyMaster, newRow, userEnteredId);
        SetupForID(false);
        FormHelper.SetupDefaultValues(false);
        $("#CompanyMasterIDInput").attr("disabled", true);  
    }    
}
