/* 
 *  Created by Somesh Chatterjee.
 */

function Incoming()
{
    var _infoIncoming = new InfoIncoming();
    var _incomingHeaderNames = _infoIncoming.TableHeaderNames;
    var _tableHeader = _infoIncoming.Data.TableHeader;
    var _companyDetails = _infoIncoming.GetCompanyValues;
    var _transporterDetails = _infoIncoming.GetTransporterValues;
    
    var _idIndex = _tableHeader.indexOf(_incomingHeaderNames.ID);
    var _companyNameIndex = _tableHeader.indexOf(_incomingHeaderNames.CompanyName);
    var _companyAddressIndex = _tableHeader.indexOf(_incomingHeaderNames.CompanyAddress);
    var _MOCIndex = _tableHeader.indexOf(_incomingHeaderNames.MOC);
    var _qualityCodeIndex = _tableHeader.indexOf(_incomingHeaderNames.QualityCode);
    var _stockLocIndex = _tableHeader.indexOf(_incomingHeaderNames.StockLoc);
    var _widthIndex = _tableHeader.indexOf(_incomingHeaderNames.Width);
    var _lengthIndex = _tableHeader.indexOf(_incomingHeaderNames.Length);
    var _noOfRollsIndex = _tableHeader.indexOf(_incomingHeaderNames.NoOfRolls);
    var _loomNoIndex = _tableHeader.indexOf(_incomingHeaderNames.LoomNo);
    var _batchNoIndex = _tableHeader.indexOf(_incomingHeaderNames.BatchNo);
    var _pieceNoIndex = _tableHeader.indexOf(_incomingHeaderNames.PieceNo);
    var _dateIndex = _tableHeader.indexOf(_incomingHeaderNames.IncomingDate);
    var _transporterIndex = _tableHeader.indexOf(_incomingHeaderNames.TransporterName);
    var _transporterAddressIndex = _tableHeader.indexOf(_incomingHeaderNames.TransporterAddr);
    var _transporterContactIndex = _tableHeader.indexOf(_incomingHeaderNames.TransporterContact);
    var _invoiceIndex = _tableHeader.indexOf(_incomingHeaderNames.InvoiceNo);
    var _invoiceDateIndex = _tableHeader.indexOf(_incomingHeaderNames.InvoiceDate);
    var _remarksIndex = _tableHeader.indexOf(_incomingHeaderNames.Remarks);
    
    var _combinedInputOfMocAndQuality = FormHelper.MergeArrayWithMultiValuesForCombinedFiled(_infoIncoming.GetMOCAndQualityValues);
    
    this.Setup = function ()
    {
        DomFunctions.$("#Temp")[0].innerHTML = _infoIncoming.GetTable();
        SetupDropdowns();
        SetupDatePickers();
        SetupForAutoFillAddress();
        SetupSubmit();
        SetupEditableComboBox(true);
        FormHelper.SetupDefaultValues(true);
        SetupForID(true);
        FormHelper.SetupDataTableWrapper(_infoIncoming, "#ToggleColumnsForIncoming");
    };
    
    function SetupSubmit()
    {
        DomFunctions.$("#IncomingInputForm")[0].onsubmit = TrySubmitForm;
    }
    
    function TrySubmitForm()
    {
        var mocAndQualityCode = $("#IncomingMOCDropdownInput").val();
        if (FormHelper.CheckIfInputHasValue(mocAndQualityCode))
        {
            alert(Strings.MocAndQualityNotDefined);
            return false;
        }
        
        var mocAndQualityIndex = _combinedInputOfMocAndQuality.indexOf(mocAndQualityCode);
        var mocAndQualityValue = _infoIncoming.GetMOCAndQualityValues[mocAndQualityIndex];
        var indexOfMOCInTable = _infoIncoming.GetMOCAndQualityValuesIndex.MOC;
        var indexOfQualityInTable = _infoIncoming.GetMOCAndQualityValuesIndex.Quality;
        var moc = mocAndQualityValue[indexOfMOCInTable];
        var qualityCode = mocAndQualityValue[indexOfQualityInTable];
        
        var incomingDate = $("#IncomingDateInput").val();
        var batchNumber = $("#IncomingBatchNoDropdownInput").val();
        var pieceNumber = $("#IncomingPieceNoDropdownInput").val();
        var loomNumber = $("#IncomingLoomNoDropdownInput").val();
        var width = $("#IncomingWidthDropdownInput").val();
        
        var valuesArray = [moc, qualityCode, incomingDate, batchNumber, pieceNumber, loomNumber, width];
        var arraysArray = [_infoIncoming.GetDataFor(_MOCIndex),
                           _infoIncoming.GetDataFor(_qualityCodeIndex),
                           _infoIncoming.GetDataFor(_dateIndex),
                           _infoIncoming.GetDataFor(_batchNoIndex),
                           _infoIncoming.GetDataFor(_pieceNoIndex),
                           _infoIncoming.GetDataFor(_loomNoIndex),
                           _infoIncoming.GetDataFor(_widthIndex)];
        
        var duplicateIndex = FormHelper.GetIndexIfDuplicate(valuesArray, arraysArray);
        
        var userEnteredId = $("#IncomingIDInput").val();
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
            UpdatePageWithNewData(userEnteredId, moc, qualityCode, incomingDate, batchNumber, pieceNumber, loomNumber, width);
            alert(Strings.SuccessfulSubmit + userEnteredId);                
        }
        return false;
    }
    
    function UpdatePageWithNewData(userEnteredId, moc, qualityCode, incomingDate, batchNumber, pieceNumber, loomNumber, width)
    {
        var companyName = $("#IncomingCompanyNameDropdownInput").val();
        var companyAddress = $("#IncomingAddressInput").val();
        var stockLoc = $("#IncomingStockLocDropdownInput").val();
        var length = $("#IncomingLengthDropdownInput").val();
        var numberOfRolls = $("#IncomingNoOfRollsDropdownInput").val();
        var transporter = $("#IncomingTransporterDropdownInput").val();
        var transporterAddr = $("#IncomingTransporterAddrInput").val();
        var transporterName = $("#IncomingTransporterContactDropdownInput").val();
        var invoiceNumber = $("#IncomingInvoiceNoDropdownInput").val();
        var invoiceDate = $("#IncomingInvoiceDateDateInput").val();
        var remarks = $("#IncomingRemarksDropdownInput").val();
        
        var newRow = [];
        newRow[_idIndex]= userEnteredId;
        newRow[_MOCIndex] = moc;
        newRow[_qualityCodeIndex] = qualityCode;
        newRow[_dateIndex] = incomingDate;
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
        newRow[_invoiceIndex] = invoiceNumber;
        newRow[_invoiceDateIndex] = invoiceDate;
        newRow[_remarksIndex]= remarks;
        
        FormHelper.UpdateDataTableWith(_infoIncoming, newRow, userEnteredId);
        SetupDropdowns();
        SetupForID(false);
        SetupEditableComboBox(false);
        FormHelper.SetupDefaultValues(false);
        $("#IncomingIDInput").attr("disabled", true);  
    }
    
    function SetupForAutoFillAddress()
    {
        DomFunctions.$("#IncomingCompanyNameDropdownInput")[0].onblur =  SetCompanyAddress;
        DomFunctions.$("#IncomingTransporterDropdownInput")[0].onblur =  SetTransporterDetails;
    }
    
    function SetCompanyAddress()
    {
        var name = DomFunctions.$("#IncomingCompanyNameDropdownInput")[0].value;
        var columnNumberOfNameInTable = _infoIncoming.GetCompanyValuesIndex.CompanyName;
        var columnNumberOfAddress = _infoIncoming.GetCompanyValuesIndex.CompanyAddr;
        var indexOfName = FormHelper.GetIndexOfValueFromTable(_companyDetails, columnNumberOfNameInTable, name);
        if (indexOfName !== -1)
        {
            DomFunctions.$("#IncomingAddressInput")[0].value = _companyDetails[indexOfName][columnNumberOfAddress];
        }
        else
        {
            DomFunctions.$("#IncomingAddressInput")[0].value = FormHelper.NaText;            
        }

    }
    
    function SetTransporterDetails()
    {
        var name = DomFunctions.$("#IncomingTransporterDropdownInput")[0].value;
        var columnNumberOfNameInTable = _infoIncoming.GetTransporterTableIndexWithoutId.TransporterName;
        var columnNumberOfAddress = _infoIncoming.GetTransporterTableIndexWithoutId.TransporterAddr;        
        var columnNumberOfContact = _infoIncoming.GetTransporterTableIndexWithoutId.Contact;   
        var indexOfName = FormHelper.GetIndexOfValueFromTable(_transporterDetails, columnNumberOfNameInTable, name);
        
        if (indexOfName !== -1)
        {
            DomFunctions.$("#IncomingTransporterAddrInput")[0].value = _transporterDetails[indexOfName][columnNumberOfAddress];
            DomFunctions.$("#IncomingTransporterContactDropdownInput")[0].value = _transporterDetails[indexOfName][columnNumberOfContact];
        }   
        else
        {
            DomFunctions.$("#IncomingTransporterAddrInput")[0].value = FormHelper.NaText;
            DomFunctions.$("#IncomingTransporterContactDropdownInput")[0].value = FormHelper.NaText;            
        }
    }
    
    function SetupForID(addEventHandlers)
    {
        var ids = _infoIncoming.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        var firstId = 1;
                
        $("#IncomingIDInput").val(nextId);
                
        if (addEventHandlers)
        {
            $("#IncomingIDEnableEdit").click(function ()
            {
                ToggleIDField(firstId);
            });        

            $("#IncomingIDInput").blur(function ()
            {
                OnUserSelectedId(firstId);
            });            
        }
    }
    
    function ToggleIDField(firstId)
    {
        var ids = _infoIncoming.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var isInputDisbaled = $("#IncomingIDInput").is(":disabled");
        if (isInputDisbaled)
        {
            $("#IncomingIDInput").val(firstId);
            SetValuesForId(firstId - 1);
            $("#IncomingIDInput").attr("disabled", false);    
        }
        else
        {
            ResetIDAndDisableField(nextId);
        }
    }
    
    function OnUserSelectedId(firstId)
    {
        var ids = _infoIncoming.GetDataFor(_idIndex);
        var nextId = Number(ids[ids.length - 1]) + 1;
        
        var userEditedId = $("#IncomingIDInput").val();
        if ((userEditedId != Number(userEditedId)) ||(userEditedId >= nextId) || (userEditedId < firstId))
        {
            ResetIDAndDisableField(nextId);
            return;
        }
        var indexOfId = ids.indexOf(userEditedId);
        SetValuesForId(indexOfId);
    }
    
    function ResetIDAndDisableField(nextId)
    {
        $("#IncomingIDInput").val(nextId);
        $("#IncomingIDInput").attr("disabled", true);            
        FormHelper.SetupDefaultValues(false);
    }
    
    function SetValuesForId(indexOfId)
    {
        $("#IncomingCompanyNameDropdownInput").val(_infoIncoming.GetDataFor(_companyNameIndex)[indexOfId]);        
        $("#IncomingAddressInput").val(_infoIncoming.GetDataFor(_companyAddressIndex)[indexOfId]);        
        
        var combinedInputOfMocAndQuality = FormHelper.MergeArraysForCombinedField(_infoIncoming.GetDataFor(_MOCIndex), _infoIncoming.GetDataFor(_qualityCodeIndex));
        $("#IncomingMOCDropdownInput").val(combinedInputOfMocAndQuality[indexOfId]);
        $("#IncomingStockLocDropdownInput").val(_infoIncoming.GetDataFor(_stockLocIndex)[indexOfId]);
        $("#IncomingWidthDropdownInput").val(_infoIncoming.GetDataFor(_widthIndex)[indexOfId]);
        $("#IncomingLengthDropdownInput").val(_infoIncoming.GetDataFor(_lengthIndex)[indexOfId]);
        $("#IncomingNoOfRollsDropdownInput").val(_infoIncoming.GetDataFor(_noOfRollsIndex)[indexOfId]);
        $("#IncomingLoomNoDropdownInput").val(_infoIncoming.GetDataFor(_loomNoIndex)[indexOfId]);
        $("#IncomingBatchNoDropdownInput").val(_infoIncoming.GetDataFor(_batchNoIndex)[indexOfId]);
        $("#IncomingPieceNoDropdownInput").val(_infoIncoming.GetDataFor(_pieceNoIndex)[indexOfId]);
        $("#IncomingDateInput").val(_infoIncoming.GetDataFor(_dateIndex)[indexOfId]);
        $("#IncomingTransporterDropdownInput").val(_infoIncoming.GetDataFor(_transporterIndex)[indexOfId]);
        $("#IncomingTransporterAddrInput").val(_infoIncoming.GetDataFor(_transporterAddressIndex)[indexOfId]);
        $("#IncomingTransporterContactDropdownInput").val(_infoIncoming.GetDataFor(_transporterContactIndex)[indexOfId]);
        $("#IncomingInvoiceNoDropdownInput").val(_infoIncoming.GetDataFor(_invoiceIndex)[indexOfId]);
        $("#IncomingInvoiceDateDateInput").val(_infoIncoming.GetDataFor(_invoiceDateIndex)[indexOfId]);  
        $("#IncomingRemarksDropdownInput").val(_infoIncoming.GetDataFor(_remarksIndex)[indexOfId]);        
    }
    
    function SetupDropdowns()
    {
        FormHelper.SetupDropdown("#IncomingIDInput", _infoIncoming.GetDataFor(_idIndex));
        FormHelper.SetupDropdown("#IncomingStockLocDropdownInput", _infoIncoming.GetDataFor(_stockLocIndex));
        FormHelper.SetupDropdown("#IncomingWidthDropdownInput", _infoIncoming.GetDataFor(_widthIndex));
        FormHelper.SetupDropdown("#IncomingLengthDropdownInput", _infoIncoming.GetDataFor(_lengthIndex));
        FormHelper.SetupDropdown("#IncomingNoOfRollsDropdownInput", _infoIncoming.GetDataFor(_noOfRollsIndex));
        FormHelper.SetupDropdown("#IncomingLoomNoDropdownInput", _infoIncoming.GetDataFor(_loomNoIndex));
        FormHelper.SetupDropdown("#IncomingBatchNoDropdownInput", _infoIncoming.GetDataFor(_batchNoIndex));
        FormHelper.SetupDropdown("#IncomingPieceNoDropdownInput", _infoIncoming.GetDataFor(_pieceNoIndex));
        FormHelper.SetupDropdown("#IncomingInvoiceNoDropdownInput", _infoIncoming.GetDataFor(_invoiceIndex));
        FormHelper.SetupDropdown("#IncomingRemarksDropdownInput", _infoIncoming.GetDataFor(_remarksIndex));        
    }
    
    function SetupDatePickers()
    {
        FormHelper.SetupDatePicker("#IncomingDateInput");
        FormHelper.SetupDatePicker("#IncomingInvoiceDateDateInput");        
    }
    
    function SetupEditableComboBox(addEventHandlers)
    {
        FormHelper.SetupDropdown("#IncomingMOCDropdownInput", _combinedInputOfMocAndQuality);
        FormHelper.SetupComboBox("#IncomingMOCDropdownComboboxInput", _combinedInputOfMocAndQuality);
        
        var companyNames = FormHelper.GetDataValuesFromDoubleArray(_companyDetails, _infoIncoming.GetCompanyValuesIndex.CompanyName);
        companyNames.push(FormHelper.NaText);
        FormHelper.SetupDropdown("#IncomingCompanyNameDropdownInput", companyNames);
        FormHelper.SetupComboBox("#IncomingCompanyNameDropdownComboboxInput", companyNames);
        
        var transporters = FormHelper.GetDataValuesFromDoubleArray(_transporterDetails, _infoIncoming.GetTransporterTableIndexWithoutId.TransporterName);
        transporters.push(FormHelper.NaText);
        FormHelper.SetupDropdown("#IncomingTransporterDropdownInput", transporters);
        FormHelper.SetupComboBox("#IncomingTransporterDropdownComboboxInput", transporters);
        
        if (addEventHandlers)
        {
            FormHelper.SetupEditableComboBox("#IncomingMOCDropdownComboboxInput", "#IncomingMOCDropdownInput");            
            FormHelper.SetupEditableComboBox("#IncomingCompanyNameDropdownComboboxInput", "#IncomingCompanyNameDropdownInput");            
            FormHelper.SetupEditableComboBox("#IncomingTransporterDropdownComboboxInput", "#IncomingTransporterDropdownInput");
        }
    }
}
