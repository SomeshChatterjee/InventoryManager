/* 
 *  Created by Somesh Chatterjee.
 */

function InfoDashboard()
{
    this.TableId = "Dashboard";
    this.TableHeaderNames = TableHeaderNames.DashboardHeader;
    var _incomingID = 1;
    var _outgoingID = 2;
    
    var _columnsInIncoming;
    var _columnsInOutgoing;
    var _columnIndexInSuperLedger;
    
    var _incomingTable = DataProvider.GetIncomingTable();
    var _incomingTableHeaderNames = TableHeaderNames.IncomingHeaderNames;
    var _incomingTableHeaders = _incomingTable.TableHeader;
    var _incomingTableData = _incomingTable.TableData;
    
    var _outgoingTable = DataProvider.GetOutgoingTable();
    var _outgoingTableHeaderNames = TableHeaderNames.OutgoingHeaderNames;
    var _outgoingTableHeaders = _outgoingTable.TableHeader;
    var _outgoingTableData = _outgoingTable.TableData;
    
    var _indexOfMocInIncoming = _incomingTableHeaders.indexOf(_incomingTableHeaderNames.MOC);
    var _indexOfQualityInIncoming = _incomingTableHeaders.indexOf(_incomingTableHeaderNames.QualityCode);
    var _indexOfWidthInIncoming = _incomingTableHeaders.indexOf(_incomingTableHeaderNames.Width);

    var _indexOfMocInOutgoing = _outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.MOC);
    var _indexOfQualityInOutgoing = _outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.QualityCode);        
    var _indexOfWidthInOutgoing = _outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.Width);
    
    var _invalidLength = "   ";
    
    var _mergedIncomingAndOutgoing;
    var _mergedLength;
    
    GetInformationForDashboard();
    
    this.GetDashboardTableData = function()
    {
        var header = TableHeaderNames.DashboardHeader;
        return DataProvider.GetTable(_mergedLength, [header.MOC, header.QualityCode, header.Width, header.Length]);
    };
    
    this.GetDashboardSuperLedgerTableData = function()
    {
        var header = TableHeaderNames.DashboardSuperLedger;
        var mergedArray = [];
        for (var key in _mergedIncomingAndOutgoing)
        {
            var valuesForKey = _mergedIncomingAndOutgoing[key];
            CopyContentsOfArray(mergedArray, valuesForKey);
        }
        return DataProvider.GetTable(mergedArray, [header.MOC, header.QualityCode, header.Width, header.IncomingLength, header.OutgoingLength, header.ID, header.CompanyName, header.Date]);
    };    
    
    function GetInformationForDashboard()
    {        
        SetupColumnsToShow();
        var allIncomingGrouped = GetAllRecordsGroupedWithMOCQualityAndWidth(_indexOfMocInIncoming, _indexOfQualityInIncoming, _indexOfWidthInIncoming, _incomingTableData, _incomingID);
        var allOutgoingGrouped = GetAllRecordsGroupedWithMOCQualityAndWidth(_indexOfMocInOutgoing, _indexOfQualityInOutgoing, _indexOfWidthInOutgoing, _outgoingTableData, _outgoingID);
        _mergedIncomingAndOutgoing = MergeIncomingAndOutgoing(allIncomingGrouped, allOutgoingGrouped);     
        _mergedLength = MergeLengthAcrossMOCAndQuality(_mergedIncomingAndOutgoing);
    }
    
    function MergeLengthAcrossMOCAndQuality(mergedIncomingAndOutgoing)
    {
        var result = [];
        for (var key in mergedIncomingAndOutgoing)
        {
            var values = mergedIncomingAndOutgoing[key];
            var totalLength = 0;
            for (var i = 0; i < values.length; i++)
            {
                var row = values[i];
                var incomingLength = row[_columnIndexInSuperLedger.IncomingLength];
                var outgoingLength = row[_columnIndexInSuperLedger.OutgoingLength];
                if (incomingLength !== _invalidLength)
                {
                    totalLength = totalLength + incomingLength;
                }
                else if(outgoingLength !== _invalidLength)
                {
                    totalLength = totalLength - outgoingLength;                    
                }
                else
                {
                    alert("Error: Either incoming or outgoing length must have a value.");
                }
            }
            
            var firstRow = values[0];
            var moc = firstRow[_columnIndexInSuperLedger.MOC];
            var quality = firstRow[_columnIndexInSuperLedger.QualityCode];
            var width = firstRow[_columnIndexInSuperLedger.Width];
            result.push([moc, quality, width, totalLength]);
        }
        return result;
    }
    
    function MergeIncomingAndOutgoing(allIncomingGrouped, allOutgoingGrouped)
    {
        var groupedResults = {};
        for (var keyInIncoming in allIncomingGrouped)
        {
            groupedResults[keyInIncoming] = [];
            CopyContentsOfArray(groupedResults[keyInIncoming], allIncomingGrouped[keyInIncoming]);
            if ((keyInIncoming in allOutgoingGrouped) === true)
            {
                CopyContentsOfArray(groupedResults[keyInIncoming], allOutgoingGrouped[keyInIncoming]);
            }
        }
        for (var keyInOutgoing in allOutgoingGrouped)
        {
            if ((keyInOutgoing in groupedResults) === false) // Outgoig entry has not been processed.
            {
                groupedResults[keyInOutgoing] = [];
                CopyContentsOfArray(groupedResults[keyInOutgoing], allOutgoingGrouped[keyInOutgoing]);
            }
        }
        return groupedResults;
    }
    
    function CopyContentsOfArray(toArray, fromArray)
    {
        for (var i = 0; i < fromArray.length; ++i)
        {
            toArray.push(fromArray[i]);
        }        
    }
    
    function GetAllRecordsGroupedWithMOCQualityAndWidth(indexOfMOC, indexOfQuality, indexOfWidth, tableData, tableId)
    {
        var dictionary = {};
        for (var i = 0; i < tableData.length; i++)
        {
            var row = tableData[i];
            var moc = row[indexOfMOC];
            var quality = row[indexOfQuality];
            var width = row[indexOfWidth];
            
            var valueToSearch = (moc + "--" + quality + "--" + width).toUpperCase();
            if ((valueToSearch in dictionary) === false)
            {
                dictionary[valueToSearch] = [];
                row.push(tableId);
                PushSelectedDataValuesTo(dictionary[valueToSearch], row, tableId);
                for (var j = i + 1; j < tableData.length; j++)
                {
                    var rowToCompare = tableData[j];
                    var mocToCompare = rowToCompare[indexOfMOC];
                    var qualityToCompare = rowToCompare[indexOfQuality];
                    var widthToCompare = rowToCompare[indexOfWidth];
                    
                    var valueToCompare = (mocToCompare + "--" + qualityToCompare + "--" + widthToCompare).toUpperCase();
                    
                    if (valueToSearch === valueToCompare)
                    {
                        rowToCompare.push(tableId);
                        PushSelectedDataValuesTo(dictionary[valueToSearch], rowToCompare, tableId);
                    }
                }
            }
        }
        return dictionary;
    }
    
    function PushSelectedDataValuesTo(rows, rowWithOriginalValues, tableId)
    {
        var columsToSelect = tableId === _incomingID ? _columnsInIncoming : _columnsInOutgoing;
        var extractedRow = [];
        for (var i = 0; i < columsToSelect.length; ++i)
        {
            if ((tableId === _incomingID)&&(i===_columnIndexInSuperLedger.OutgoingLength))
            {
                extractedRow.push(_invalidLength);
            }
            else if ((tableId === _outgoingID)&&(i===_columnIndexInSuperLedger.IncomingLength))
            {
                extractedRow.push(_invalidLength);
            }
            extractedRow.push(rowWithOriginalValues[columsToSelect[i]]);
        }
        rows.push(extractedRow);
    }
    
    function SetupColumnsToShow()
    {
        _columnsInIncoming = [];
        _columnsInIncoming.push(_incomingTableHeaders.indexOf(_incomingTableHeaderNames.MOC));
        _columnsInIncoming.push(_incomingTableHeaders.indexOf(_incomingTableHeaderNames.QualityCode));
        _columnsInIncoming.push(_incomingTableHeaders.indexOf(_incomingTableHeaderNames.Width));
        _columnsInIncoming.push(_incomingTableHeaders.indexOf(_incomingTableHeaderNames.Length));
        _columnsInIncoming.push(_incomingTableHeaders.indexOf(_incomingTableHeaderNames.ID));
        _columnsInIncoming.push(_incomingTableHeaders.indexOf(_incomingTableHeaderNames.CompanyName));
        _columnsInIncoming.push(_incomingTableHeaders.indexOf(_incomingTableHeaderNames.IncomingDate));
        
        _columnsInOutgoing = [];
        _columnsInOutgoing.push(_outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.MOC));
        _columnsInOutgoing.push(_outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.QualityCode));
        _columnsInOutgoing.push(_outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.Width));
        _columnsInOutgoing.push(_outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.Length));
        _columnsInOutgoing.push(_outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.ID));
        _columnsInOutgoing.push(_outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.CompanyName));
        _columnsInOutgoing.push(_outgoingTableHeaders.indexOf(_outgoingTableHeaderNames.OutgoingDate));
        
        _columnIndexInSuperLedger = {
            MOC: 0,
            QualityCode: 1,
            Width: 2,
            IncomingLength: 3,
            OutgoingLength: 4,
            ID: 5,
            CompanyName: 6,
            Date: 7
        };
    }
}
