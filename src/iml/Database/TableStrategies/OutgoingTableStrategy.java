/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database.TableStrategies;

import Logger.EventLogger;
import Logger.EventLoggerCodes;
import Logger.ExitProgram;
import iml.Database.Codes.ColumnNames;
import iml.Database.Codes.TableNames;
import iml.DisplayMessages;
import java.sql.ResultSet;
import java.util.ArrayList;
import org.json.simple.JSONArray;

/**
 *
 * @author somesh
 */
public class OutgoingTableStrategy implements ITableStrategy
{
    private final int NumberOfColumns = 13;
    private final EventLogger _eventLogger;
    private final TableNames TableName = TableNames.Outgoing;

    public OutgoingTableStrategy()
    {
        _eventLogger = EventLogger.GetLogger();
    }
    
    @Override
    public TableNames GetTableName()
    {
        return TableName;
    }

    @Override
    public String CreateTableQuery()
    {
        StringBuilder query = new StringBuilder("CREATE TABLE IF NOT EXISTS ");
        query.append(TableName);
        query.append(" ( ");
        query.append(ColumnNames.ID).append(" INTEGER PRIMARY KEY AUTOINCREMENT, ");
        query.append(ColumnNames.CompanyID).append(" CHAR(8), ");
        query.append(ColumnNames.MOCQualityCodeID).append(" CHAR(8) NOT NULL, ");
        query.append(ColumnNames.StockLoc).append(" TEXT, ");
        query.append(ColumnNames.Width).append(" REAL, ");
        query.append(ColumnNames.Length).append(" REAL, ");
        query.append(ColumnNames.NoOfRolls).append(" REAL, ");
        query.append(ColumnNames.LoomNo).append(" TEXT, ");
        query.append(ColumnNames.BatchNo).append(" TEXT, ");
        query.append(ColumnNames.PieceNo).append(" TEXT, ");
        query.append(ColumnNames.Date).append(" TEXT, "); //SQLite does not support date time type.
        query.append(ColumnNames.TransporterId).append(" CHAR(8), ");
        query.append(ColumnNames.Remarks).append(" TEXT ");
        query.append(" ); ");
        return query.toString();
    }

    @Override
    public String CreateRecordQuery(Object[] values)
    {
        String result = "";
        if (values.length != NumberOfColumns)
        {
            final String ErrorMessage = "Create new record failed for " + TableName + ". \nExpected number of columns:" + NumberOfColumns + " but was: " + values.length;
            DisplayMessages.DisplayAlert(ErrorMessage);
            String valuesInString = ConvertValuesToString(values);
            _eventLogger.LogToFile(EventLoggerCodes.Error, ErrorMessage + "\nValues: " + valuesInString);
        }
        else
        {
            StringBuilder query = new StringBuilder("INSERT INTO ").append(TableName);
            query.append(" (");
            query.append(ColumnNames.CompanyID).append(", ");
            query.append(ColumnNames.MOCQualityCodeID).append(", ");
            query.append(ColumnNames.StockLoc).append(", ");
            query.append(ColumnNames.Width).append(", ");
            query.append(ColumnNames.Length).append(", ");
            query.append(ColumnNames.NoOfRolls).append(", ");
            query.append(ColumnNames.LoomNo).append(", ");
            query.append(ColumnNames.BatchNo).append(", ");
            query.append(ColumnNames.PieceNo).append(", ");
            query.append(ColumnNames.Date).append(", ");
            query.append(ColumnNames.TransporterId).append(", ");
            query.append(ColumnNames.Remarks).append(" ");
            query.append(")");            
            query.append(" VALUES (");
            query.append(" '").append(values[1]).append("', ");
            query.append(" '").append(values[2]).append("', ");
            query.append(" '").append(values[3]).append("', ");
            query.append(" ").append(values[4]).append(", ");
            query.append(" ").append(values[5]).append(", ");
            query.append(" ").append(values[6]).append(", ");
            query.append(" '").append(values[7]).append("', ");
            query.append(" '").append(values[8]).append("', ");
            query.append(" '").append(values[9]).append("', ");
            query.append(" '").append(values[10]).append("', ");
            query.append(" '").append(values[11]).append("', ");
            query.append(" '").append(values[12]).append("' ");
            query.append(" ); ");
            result = query.toString();
        }
        return result;
    }

    @Override
    public String ReadQuery()
    {
        return "SELECT * FROM " + TableName + ";";
    }

    @Override
    public String UpdateQuery(int id, Object[] values)
    {
        String result = "";
        if (values.length != NumberOfColumns)
        {
            final String ErrorMessage = "Update record failed for " + TableName + ". \nExpected number of columns:" + NumberOfColumns + " but was: " + values.length;
            DisplayMessages.DisplayAlert(ErrorMessage);
            _eventLogger.LogToFile(EventLoggerCodes.Error, ErrorMessage + " \nValues: " + ConvertValuesToString(values));
        }
        else
        {
            StringBuilder query = new StringBuilder("UPDATE ").append(TableName);
            query.append(" SET ");
            query.append(ColumnNames.CompanyID).append(" = '").append(values[1]).append("', ");
            query.append(ColumnNames.MOCQualityCodeID).append(" = '").append(values[2]).append("', ");
            query.append(ColumnNames.StockLoc).append(" = '").append(values[3]).append("', ");
            query.append(ColumnNames.Width).append(" = ").append(values[4]).append(", ");
            query.append(ColumnNames.Length).append(" = ").append(values[5]).append(", ");
            query.append(ColumnNames.NoOfRolls).append(" = ").append(values[6]).append(", ");
            query.append(ColumnNames.LoomNo).append(" = '").append(values[7]).append("', ");
            query.append(ColumnNames.BatchNo).append(" = '").append(values[8]).append("', ");
            query.append(ColumnNames.PieceNo).append(" = '").append(values[9]).append("', ");
            query.append(ColumnNames.Date).append(" = '").append(values[10]).append("', ");
            query.append(ColumnNames.TransporterId).append(" = '").append(values[11]).append("', ");
            query.append(ColumnNames.Remarks).append(" = '").append(values[12]).append("' ");
            query.append("WHERE ").append(ColumnNames.ID).append(" = ").append(id).append(";");
            result = query.toString();
        }
        return result;
    }

    @Override
    public Object[][] GetValuesFromResultSet(ResultSet resultSet)
    {
        ArrayList<Object[]> result = new ArrayList<>();       
        try
        {   
            while(resultSet.next())
            {
                final Object[] currentRow = new Object[NumberOfColumns];
                currentRow[0] = resultSet.getInt(ColumnNames.ID.toString());
                currentRow[1] = resultSet.getString(ColumnNames.CompanyID.toString());
                currentRow[2] = resultSet.getString(ColumnNames.MOCQualityCodeID.toString());
                currentRow[3] = resultSet.getString(ColumnNames.StockLoc.toString());
                currentRow[4] = resultSet.getFloat(ColumnNames.Width.toString());
                currentRow[5] = resultSet.getFloat(ColumnNames.Length.toString());
                currentRow[6] = resultSet.getFloat(ColumnNames.NoOfRolls.toString());
                currentRow[7] = resultSet.getString(ColumnNames.LoomNo.toString());
                currentRow[8] = resultSet.getString(ColumnNames.BatchNo.toString());
                currentRow[9] = resultSet.getString(ColumnNames.PieceNo.toString());
                currentRow[10] = resultSet.getString(ColumnNames.Date.toString());
                currentRow[11] = resultSet.getString(ColumnNames.TransporterId.toString());
                currentRow[12] = resultSet.getString(ColumnNames.Remarks.toString());
                result.add(currentRow);
            }
        } catch (Exception ex)
        {
            final String errorMessage = "Data could not be fetched for " + TableName + ". Exception: " + ex;
            DisplayMessages.DisplayAlert(errorMessage);
            _eventLogger.LogToFile(EventLoggerCodes.Error, errorMessage);
        }
        return result.toArray(new Object[result.size()][NumberOfColumns]);
    }
    
    @Override
    public Object[] GetObjectArrayFromJSONArray(JSONArray jsonArray)
    {
        Object[] result = new Object[NumberOfColumns];
        if (jsonArray.size() != NumberOfColumns)
        {
            ExitProgram.ExitProgramWith("OutgoingStrategy", "Count mismatch in GetObjectArrayFromJSONArray. Expected: " + NumberOfColumns + " but was " + jsonArray.size(), null);
        }
        result[0] = Integer.parseInt((String) jsonArray.get(0));
        result[1] = (String) jsonArray.get(1);
        result[2] = (String) jsonArray.get(2);
        result[3] = (String) jsonArray.get(3);
        result[4] = Float.parseFloat((String) jsonArray.get(4));
        result[5] = Float.parseFloat((String) jsonArray.get(5));
        result[6] = Float.parseFloat((String) jsonArray.get(6));
        result[7] = (String) jsonArray.get(7);
        result[8] = (String) jsonArray.get(8);
        result[9] = (String) jsonArray.get(9);
        result[10] = (String) jsonArray.get(10);
        result[11] = (String) jsonArray.get(11);
        result[12] = (String) jsonArray.get(12);
        return result;                
    }    
    
    private String ConvertValuesToString(Object[] values)
    {
        String valuesInString = "";
        for (Object value : values)
        {
            valuesInString += value + " ";
        }
        return valuesInString;
    }        
}
