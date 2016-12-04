/* 
 *  Created by Somesh Chatterjee.
 */

function Outgoing()
{
    var _infoOutgoing = new InfoOutgoing();
    var _outgoingHeaderNames = _infoOutgoing.TableHeaderNames;
    var _tableHeader = _infoOutgoing.Data.TableHeader;
    var _companyDetails = _infoOutgoing.GetCompanyValues;
    var _transporterDetails = _infoOutgoing.GetTransporterValues;
    
    var _idIndex = _tableHeader.indexOf(_outgoingHeaderNames.ID);
    var _companyNameIndex = _tableHeader.indexOf(_outgoingHeaderNames.CompanyName);
    var _companyAddressIndex = _tableHeader.indexOf(_outgoingHeaderNames.CompanyAddress);
    var _MOCIndex = _tableHeader.indexOf(_outgoingHeaderNames.MOC);
    var _qualityCodeIndex = _tableHeader.indexOf(_outgoingHeaderNames.QualityCode);
    var _stockLocIndex = _tableHeader.indexOf(_outgoingHeaderNames.StockLoc);
    var _widthIndex = _tableHeader.indexOf(_outgoingHeaderNames.Width);
    var _lengthIndex = _tableHeader.indexOf(_outgoingHeaderNames.Length);
    var _noOfRollsIndex = _tableHeader.indexOf(_outgoingHeaderNames.NoOfRolls);
    var _loomNoIndex = _tableHeader.indexOf(_outgoingHeaderNames.LoomNo);
    var _batchNoIndex = _tableHeader.indexOf(_outgoingHeaderNames.BatchNo);
    var _pieceNoIndex = _tableHeader.indexOf(_outgoingHeaderNames.PieceNo);
    var _dateIndex = _tableHeader.indexOf(_outgoingHeaderNames.OutgoingDate);
    var _transporterIndex = _tableHeader.indexOf(_outgoingHeaderNames.TransporterName);
    var _transporterAddressIndex = _tableHeader.indexOf(_outgoingHeaderNames.TransporterAddr);
    var _transporterContactIndex = _tableHeader.indexOf(_outgoingHeaderNames.TransporterContact);
    var _remarksIndex = _tableHeader.indexOf(_outgoingHeaderNames.Remarks);    
    
    var _combinedInputOfMocAndQuality = FormHelper.MergeArrayWithMultiValuesForCombinedFiled(_infoOutgoing.GetMOCAndQualityValues);
    
    this.Setup = function ()
    {
        DomFunctions.$("#Temp")[0].innerHTML = _infoOutgoing.GetTable();
        SetupDropdowns();
        SetupDatePickers();
        SetupForAutoFillAddress();
        SetupSubmit();
        SetupEditableComboBox(true);
        FormHelper.SetupDefaultValues(true);
        SetupForID(true);
        FormHelper.SetupDataTableWrapper(_infoOutgoing, "#ToggleColumnsForOutgoing");
    };
    
    function SetupSubmit()
    {
        DomFunctions.$("#OutgoingInputForm")[0].onsubmit = TrySubmitForm;
    }
    
    function TrySubmitForm()
    {
        var mocAndQualityCode = $("#OutgoingMOCDropdownInput").val();
        if (FormHelper.CheckIfInputHasValue(mocAndQualityCode))
        {
            alert(Strings.MocAndQualityNotDefined);
            return false;
        }
        
        var mocAndQualityIndex = _combinedInputOfMocAndQuality.indexOf(mocAndQualityCode);
        var mocAndQualityValue = _infoOutgoing.GetMOCAndQualityValues[mocAndQualityIndex];
        var indexOfMOCInTable = _infoOutgoing.GetMOCAndQualityValuesIndex.MOC;
        var indexOfQualityInTable = _infoOutgoing.GetMOCAndQualityValuesIndex.Quality;
        var moc = mocAndQualityValue[indexOfMOCInTable];
        var qualityCode = mocAndQualityValue[indexOfQualityInTable];
        
        var outgoingDate = $("#OutgoingDateInput").val();
        var batchNumber = $("#OutgoingBatchNoDropdownInput").val();
        var pieceNumber = $("#OutgoingPieceNoDropdownInput").val();
        var loomNumber = $("#OutgoingLoomNoDropdownInput").val();
        var width = $("#OutgoingWidthDropdownInput").val();
        
        var valuesArray = [moc, qualityCode, outgoingDate, batchNumber, pieceNumber, loomNumber, width];
        var arraysArray = [_infoOutgoing.GetDataFor(_MOCIndex),
                           _infoOutgoing.GetDataFor(_qualityCodeIndex),
                           _infoOutgoing.GetDataFor(_dateIndex),
                           _infoOutgoing.GetDataFor(_batchNoIndex),
                           _infoOutgoing.GetDataFor(_pieceNoIndex),
                           _infoOutgoing.GetDataFor(_loomNoIndex),
                           _infoOutgoing.GetDataFor(_widthIndex)];
        
        var duplicateIndex = FormHelper.GetIndexIfDuplicate(valuesArray, arraysArray);
        
        var userEnteredId = $("#OutgoingIDInput").val();
        if (duplicateIndex !== -1)
        {
            var duplicateId = duplicateIndex + 1;
            if (duplicateId != userEnteredId)
            {
                alert(Strings.DuplicateEntry + duplicateId);                
                return false;
            }
        }
        
        var confirmation = true;
        if (batchNumber === FormHelper.NaText || 
            pieceNumber === FormHelper.NaText ||
            loomNumber === FormHelper.NaText ||
            width === "0")
        {
            confirmation = confirm(Strings.ConfirmSubmit);
        }
        
        if (confirmation)
        {
            UpdatePageWithNewData(userEnteredId, moc, qualityCode, outgoingDate, batchNumber, pieceNumber, loomNumber, width);
            alert(Strings.SuccessfulSubmit + userEnteredId);                
        }
        return false;
    }
    
    function UpdatePageWithNewData(userEnteredId, moc, qualityCode, outgoingDate, batchNumber, pieceNumber, loomNumber, width)
    {
        var companyName = $("#OutgoingCompanyNameDropdownInput").val();
        var companyAddress = $("#OutgoingAddressInput").val();
        var stockLoc = $("#OutgoingStockLocDropdownInput").val();
        var length = $("#OutgoingLengthDropdownInput").val();
        var numberOfRolls = $("#OutgoingNoOfRollsDropdownInput").val();
        var transporter = $("#OutgoingTransporterDropdownInput").val();
        var transporterAddr = $("#OutgoingTransporterAddrInput").val();
        var transporterName = $("#OutgoingTransporterContactDropdownInput").val();
        var remarks = $("#OutgoingRemarksDropdownInput").val();
        
        var newRow = [];
        newRow[_idIndex]= userEnteredId;
        newRow[_MOCIndex] = moc;
        newRow[_qualityCodeIndex] = qualityCode;
        newRow[_dateIndex] = outgoingDate;
        newRow[_batchNoIndex] = batchNumber;
        newRow[_pieceNoIndex] = pieceNumber;
        newRow[_loomNoIndex] = loomNumber;
        newRow[_widthIndex] = width;
        newRow[_companyNameIndex] = companyName;
        newRow[_companyAddressIndex] = companyAddress;
        newRow[_stockLocIndex] = stockLoc;
        newRow[_lengthIndex] = length;
        newRow[_noOfRollsIndex] = numberOfRolls;
        newRow[_transporterIndex] = transporter;
        newRow[_transporterAddressIndex] = transporterAddr;
        newRow[_transporterContactIndex] = transporterName;
        newRow[_remarksIndex]= remarks;
        
        var newRowAdded = FormHelper.UpdateDataTableWith(_infoOutgoing, newRow, userEnteredId);
        _infoOutgoing.SetOutgoingData(_infoOutgoing, newRowAdded, newRow);
        SetupDropdowns();
        SetupForID(false);
        SetupEditableComboBox(false);
        FormHelper.SetupDefaultValues(false);
        $("#OutgoingIDInput").attr("disabled", true);  
    }
    
    function SetupForAutoFillAddress()
    {
        DomFunctions.$("#OutgoingCompanyNameDropdownInput")[0].onblur =  SetCompanyAddress;
        DomFunctions.$("#OutgoingTransporterDropdownInput")[0].onblur =  SetTransporterDetails;
    }
    
    function SetCompanyAddress()
    {
        var name = DomFunctions.$("#OutgoingCompanyNameDropdownInput")[0].value;
        var columnNumberOfNameInTable = _infoOutgoing.GetCompanyValuesIndex.CompanyName;
        var columnNumberOfAddress = _infoOutgoing.GetCompanyValuesIndex.CompanyAddr;
        var indexOfName = FormHelper.GetIndexOfValueFromTable(_companyDetails, columnNumberOfNameInTable, name);
        if (indexOfName !== -1)
        {
            DomFunctions.$("#OutgoingAddressInput")[0].value = _companyDetails[indexOfName][columnNumberOfAddress];
        }
        else
        {
            DomFunctions.$("#OutgoingAddressInput")[0].value = FormHelper.NaText;            
        }

    }
    
    function SetTransporterDetails()
    {
        var name = DomFunctions.$("#OutgoingTransporterDropdownInput")[0].value;
        var columnNumberOfNameInTable = _infoOutgoing.GetTransporterTableIndexWithoutId.TransporterName;
        var columnNumberOfAddress = _infoOutgoing.GetTransporterTableIndexWithoutId.TransporterAddr;        
        var columnNumberOfContact = _infoOutgoing.GetTransporterTableIndexWithoutId.Contact;   
        var indexOfName = FormHelper.GetIndexOfValueFromTable(_transporterDetails, columnNumberOfNameInTable, name);
        
        if (indexOfName !== -1)
        {
            DomFunctions.$("#OutgoingTransporterAddrInput")[0].value = _transporterDetails[indexOfName][columnNumberOfAddress];
            DomFunctions.$("#OutgoingTransporterContactDropdownInput")[0].value = _transporterDetails[indexOfName][columnNumberOfContact];
        }   
        else
        {
            DomFunctions.$("#OutgoingTransporterAddrInput")[0].value = FormHelper.NaText;
            DomFunctions.$("#OutgoingTransporterContactDropdownInput")[0].value = FormHelper.NaText;            
        }
    }
    
    function SetupForID(addEventHandlers)
    {
        var ids = _infoOutgoing.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        var firstId = 1;
                
        $("#OutgoingIDInput").val(nextId);
                
        if (addEventHandlers)
        {
            $("#OutgoingIDEnableEdit").click(function ()
            {
                ToggleIDField(firstId);
            });        

            $("#OutgoingIDInput").blur(function ()
            {
                OnUserSelectedId(firstId);
            });            
        }
    }
    
    function ToggleIDField(firstId)
    {
        var ids = _infoOutgoing.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var isInputDisbaled = $("#OutgoingIDInput").is(":disabled");
        if (isInputDisbaled)
        {
            $("#OutgoingIDInput").val(firstId);
            SetValuesForId(firstId - 1);
            $("#OutgoingIDInput").attr("disabled", false);    
        }
        else
        {
            ResetIDAndDisableField(nextId);
        }
    }
    
    function OnUserSelectedId(firstId)
    {
        var ids = _infoOutgoing.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var userEditedId = $("#OutgoingIDInput").val();
        if ((userEditedId != Number(userEditedId)) ||(userEditedId >= nextId) || (userEditedId < firstId))
        {
            ResetIDAndDisableField(nextId);
            return;
        }
        var indexOfId = FormHelper.GetIndexOfFirstByNumberTypeThenOrigType(ids, userEditedId);
        alert(indexOfId);
        SetValuesForId(indexOfId);
    }
    
    function ResetIDAndDisableField(nextId)
    {
        $("#OutgoingIDInput").val(nextId);
        $("#OutgoingIDInput").attr("disabled", true);            
        FormHelper.SetupDefaultValues(false);
    }
    
    function SetValuesForId(indexOfId)
    {
        $("#OutgoingCompanyNameDropdownInput").val(_infoOutgoing.GetDataFor(_companyNameIndex)[indexOfId]);        
        $("#OutgoingAddressInput").val(_infoOutgoing.GetDataFor(_companyAddressIndex)[indexOfId]);        
        
        var combinedInputOfMocAndQuality = FormHelper.MergeArraysForCombinedField(_infoOutgoing.GetDataFor(_MOCIndex), _infoOutgoing.GetDataFor(_qualityCodeIndex));
        $("#OutgoingMOCDropdownInput").val(combinedInputOfMocAndQuality[indexOfId]);
        $("#OutgoingStockLocDropdownInput").val(_infoOutgoing.GetDataFor(_stockLocIndex)[indexOfId]);
        $("#OutgoingWidthDropdownInput").val(_infoOutgoing.GetDataFor(_widthIndex)[indexOfId]);
        $("#OutgoingLengthDropdownInput").val(_infoOutgoing.GetDataFor(_lengthIndex)[indexOfId]);
        $("#OutgoingNoOfRollsDropdownInput").val(_infoOutgoing.GetDataFor(_noOfRollsIndex)[indexOfId]);
        $("#OutgoingLoomNoDropdownInput").val(_infoOutgoing.GetDataFor(_loomNoIndex)[indexOfId]);
        $("#OutgoingBatchNoDropdownInput").val(_infoOutgoing.GetDataFor(_batchNoIndex)[indexOfId]);
        $("#OutgoingPieceNoDropdownInput").val(_infoOutgoing.GetDataFor(_pieceNoIndex)[indexOfId]);
        $("#OutgoingDateInput").val(_infoOutgoing.GetDataFor(_dateIndex)[indexOfId]);
        $("#OutgoingTransporterDropdownInput").val(_infoOutgoing.GetDataFor(_transporterIndex)[indexOfId]);
        $("#OutgoingTransporterAddrInput").val(_infoOutgoing.GetDataFor(_transporterAddressIndex)[indexOfId]);
        $("#OutgoingTransporterContactDropdownInput").val(_infoOutgoing.GetDataFor(_transporterContactIndex)[indexOfId]);
        $("#OutgoingRemarksDropdownInput").val(_infoOutgoing.GetDataFor(_remarksIndex)[indexOfId]);        
    }
    
    function SetupDropdowns()
    {
        FormHelper.SetupDropdown("#OutgoingIDInput", _infoOutgoing.GetDataFor(_idIndex));
        FormHelper.SetupDropdown("#OutgoingStockLocDropdownInput", _infoOutgoing.GetDataFor(_stockLocIndex));
        FormHelper.SetupDropdown("#OutgoingWidthDropdownInput", _infoOutgoing.GetDataFor(_widthIndex));
        FormHelper.SetupDropdown("#OutgoingLengthDropdownInput", _infoOutgoing.GetDataFor(_lengthIndex));
        FormHelper.SetupDropdown("#OutgoingNoOfRollsDropdownInput", _infoOutgoing.GetDataFor(_noOfRollsIndex));
        FormHelper.SetupDropdown("#OutgoingLoomNoDropdownInput", _infoOutgoing.GetDataFor(_loomNoIndex));
        FormHelper.SetupDropdown("#OutgoingBatchNoDropdownInput", _infoOutgoing.GetDataFor(_batchNoIndex));
        FormHelper.SetupDropdown("#OutgoingPieceNoDropdownInput", _infoOutgoing.GetDataFor(_pieceNoIndex));
        FormHelper.SetupDropdown("#OutgoingRemarksDropdownInput", _infoOutgoing.GetDataFor(_remarksIndex));        
    }
    
    function SetupDatePickers()
    {
        FormHelper.SetupDatePicker("#OutgoingDateInput");  
    }
    
    function SetupEditableComboBox(addEventHandlers)
    {
        FormHelper.SetupDropdown("#OutgoingMOCDropdownInput", _combinedInputOfMocAndQuality);
        FormHelper.SetupComboBox("#OutgoingMOCDropdownComboboxInput", _combinedInputOfMocAndQuality);
        
        var companyNames = FormHelper.GetDataValuesFromDoubleArray(_companyDetails, _infoOutgoing.GetCompanyValuesIndex.CompanyName);
        companyNames.push(FormHelper.NaText);
        FormHelper.SetupDropdown("#OutgoingCompanyNameDropdownInput", companyNames);
        FormHelper.SetupComboBox("#OutgoingCompanyNameDropdownComboboxInput", companyNames);
        
        var transporters = FormHelper.GetDataValuesFromDoubleArray(_transporterDetails, _infoOutgoing.GetTransporterTableIndexWithoutId.TransporterName);
        transporters.push(FormHelper.NaText);
        FormHelper.SetupDropdown("#OutgoingTransporterDropdownInput", transporters);
        FormHelper.SetupComboBox("#OutgoingTransporterDropdownComboboxInput", transporters);
        
        if (addEventHandlers)
        {
            FormHelper.SetupEditableComboBox("#OutgoingMOCDropdownComboboxInput", "#OutgoingMOCDropdownInput");            
            FormHelper.SetupEditableComboBox("#OutgoingCompanyNameDropdownComboboxInput", "#OutgoingCompanyNameDropdownInput");            
            FormHelper.SetupEditableComboBox("#OutgoingTransporterDropdownComboboxInput", "#OutgoingTransporterDropdownInput");
        }
    }    
}
