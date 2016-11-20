/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database.TableStrategies;

import Logger.EventLogger;
import Logger.EventLoggerCodes;
import iml.Database.Codes.ColumnNames;
import iml.Database.Codes.TableNames;
import iml.DisplayMessages;
import java.sql.ResultSet;
import java.util.ArrayList;

/**
 *
 * @author somesh
 */
public class CompanyMasterStrategy implements ITableStrategy
{
    private final int NumberOfColumns = 4;
    private final EventLogger _eventLogger;
    private final TableNames TableName = TableNames.CompanyMaster;

    public CompanyMasterStrategy()
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
        query.append(ColumnNames.Name).append(" TEXT NOT NULL, ");
        query.append(ColumnNames.Address).append(" TEXT, ");
        query.append(ColumnNames.Contact).append(" TEXT ");
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
            query.append(ColumnNames.Name).append(", ");
            query.append(ColumnNames.Address).append(", ");
            query.append(ColumnNames.Contact).append(" ");
            query.append(")");            
            query.append(" VALUES (");
            query.append(" '").append(values[1]).append("', ");
            query.append(" '").append(values[2]).append("', ");
            query.append(" '").append(values[3]).append("' ");
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
            query.append(ColumnNames.Name).append(" = '").append(values[1]).append("', ");
            query.append(ColumnNames.Address).append(" = '").append(values[2]).append("', ");
            query.append(ColumnNames.Contact).append(" = '").append(values[3]).append("' ");
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
                currentRow[1] = resultSet.getString(ColumnNames.Name.toString());
                currentRow[2] = resultSet.getString(ColumnNames.Address.toString());
                currentRow[3] = resultSet.getString(ColumnNames.Contact.toString());
                result.add(currentRow);
            }
        } catch (Exception ex)
        {
            final String errorMessage = "Data could not be fetched for" + TableName + ". Exception: " + ex;
            DisplayMessages.DisplayAlert(errorMessage);
            _eventLogger.LogToFile(EventLoggerCodes.Error, errorMessage);
        }
        return result.toArray(new Object[result.size()][NumberOfColumns]);
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
