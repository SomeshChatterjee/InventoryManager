/* 
 *  Created by Somesh Chatterjee.
 */

function Table(id, numberOfColumns)
{
    this.ClassForJQueryFormating = "display cell-border";
    this.TableClass = "";
    this.ID = id;
    this.NumberOfColumns = numberOfColumns;
    this.Header=[];
    this.Rows = [];
    this.AddHeader = function(header)
    {
        if(!VerifyCount(header, this.NumberOfColumns, "Header"))
        {
            return;
        }
        this.Header = [];
        for (var i = 0; i < header.length; ++i)
        {
            var element = new HTMLElement("th", this.ID + "[H" + i + "]", [GetClassNameWithColumnNumber(this.TableClass, i)]);
            element.AddContent(header[i]);
            this.Header.push(element);
        }
    };
    this.AddRow = function (rowContent)
    {
        if(!VerifyCount(rowContent, this.NumberOfColumns, "RowContent"))
        {
            return;
        }        
        var rowIndex = this.Rows.length;
        var row = [];
        for (var i = 0; i < rowContent.length; ++i)
        {
            var element = new HTMLElement("td", this.ID + "Td[R" + rowIndex + "][C" + i + "]", [GetClassNameWithColumnNumber(this.TableClass, i)]);
            element.AddContent(rowContent[i]);
            row.push(element);
        }
        this.Rows.push(row);
    };
    
    this.GetTable = function ()
    {
        var tableElement = new HTMLElement("table", this.ID, [this.TableClass, this.ClassForJQueryFormating]);
        SetHeaderContent(tableElement, this.ID, this.TableClass, this.Header, this.NumberOfColumns);
        var tableContent = "";
        for (var i = 0; i < this.Rows.length; i++)
        {
            var tableRow = GetTableRow(i, this.TableClass, this.ID, this.NumberOfColumns, this.Rows);
            tableContent = tableContent + tableRow.GetElement() + " ";
        }
        tableElement.AddContent(tableContent);
        return tableElement.GetElement();
    };
    
    function VerifyCount(array, arrayLength, arrayName)
    {
        if (array.length !== arrayLength)
        {
            alert(arrayName + " Count Mismatch");
            return false;
        }        
        return true;
    }
    
    function SetHeaderContent(tableElement, tableID, tableClass, header, numberOfColumns)
    {
        var tableHead = new HTMLElement("thead", "", [tableClass]);
        var tableFoot = new HTMLElement("tfoot", "", [tableClass]);
        var tableHeader = new HTMLElement("tr", tableID + "Header", [tableClass]);
        var tableHeaderContent = "";
        for (var i = 0; i < numberOfColumns; ++i)
        {
            tableHeaderContent = tableHeaderContent + " " +  (header[i].GetElement());
        }
        tableHeader.AddContent(tableHeaderContent);
        tableHead.AddContent(tableHeader.GetElement());
        tableFoot.AddContent(tableHeader.GetElement());
        tableElement.AddContent(tableHead.GetElement());        
        tableElement.AddContent(tableFoot.GetElement());        
    }
    
    function GetClassStringForRow(rowNumber, tableClass)
    {
        var classString = tableClass + " " ;
        if(rowNumber % 2 === 0)
        {
            classString+= "EvenRow";
        }
        else
        {
            classString+= "OddRow";
        }
        return "";
    }
    
    function GetTableRow(rowNumber, tableClass, tableID, numberOfColumns, rows)
    {
        var classString = GetClassStringForRow(rowNumber, tableClass);
        var tableRow = new HTMLElement("tr", tableID + "[R" + rowNumber + "]", [classString]);
        var tableRowContent = "";
        for (var j = 0; j < numberOfColumns; j++)
        {
            tableRowContent = tableRowContent + " " +  (rows[rowNumber][j].GetElement());
        }
        tableRow.AddContent(tableRowContent);        
        return tableRow;
    }
    
    function GetClassNameWithColumnNumber(className, columnNumber)
    {
        return ""; 
    }
}
