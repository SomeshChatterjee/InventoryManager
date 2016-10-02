/* 
 *  Created by Somesh Chatterjee.
 */
var TableCreator = (function (){
   
    function GetTable(tableData, tableID)
    {
        var numberOfColumns = tableData.TableHeader.length;
        var numberOfRows = tableData.TableData.length;
        
        var table = new Table(tableID, numberOfColumns);
        table.AddHeader(tableData.TableHeader);
        //<editor-fold defaultstate="collapsed" desc="Don't add rows for performance.">
        //for (var i = 0; i < numberOfRows; ++i)
        //{
        //table.AddRow(tableData.TableData[i]);
        //}
        //</editor-fold>

        return table.GetTable();        
    }
    
    return {
        GetTable: GetTable
    };
})();