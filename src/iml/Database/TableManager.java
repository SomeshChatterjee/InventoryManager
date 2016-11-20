/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database;

import Logger.EventLogger;
import Logger.EventLoggerCodes;
import iml.Database.Codes.DatabaseName;
import iml.Database.TableStrategies.ITableStrategy;

/**
 *
 * @author somesh
 */
public class TableManager
{
    private final DatabaseAccessor _databaseAccessor;
    private final EventLogger _eventLogger;

    public TableManager()
    {
        _databaseAccessor = DatabaseAccessor.GetDatabaseAccessor();
        _eventLogger = EventLogger.GetLogger();
    }
    
    public void CreateTableIfNotExist(ITableStrategy tableStrategy)
    {
        _databaseAccessor.ExecuteQueryWithResult(DatabaseName.IML, tableStrategy.CreateTableQuery(), null);
    }
    
    public void CreateRecord(ITableStrategy tableStrategy, Object[] values)
    {
        String query = tableStrategy.CreateRecordQuery(values);
        if (query.equals("") == false)
        {
            _eventLogger.LogToFile(EventLoggerCodes.Info, "Creating a new record in" + tableStrategy.GetTableName());
            _databaseAccessor.ExecuteQueryWithResult(DatabaseName.IML, query, null);
        }
    }
    
    public Object[][] ReadRecords(ITableStrategy tableStrategy)
    {
        _eventLogger.LogToFile(EventLoggerCodes.Info, "Reading values from table: " + tableStrategy.GetTableName());
        return _databaseAccessor.ExecuteQueryWithResult(DatabaseName.IML, tableStrategy.ReadQuery(), tableStrategy);
    }
    
    public void UpdateRecord(ITableStrategy tableStrategy, int id, Object[] values)
    {
        String query = tableStrategy.UpdateQuery(id, values);
        if (query.equals("") == false)
        {
            _eventLogger.LogToFile(EventLoggerCodes.Info, "Updating record in table: "+ tableStrategy.GetTableName());
            _databaseAccessor.ExecuteQueryWithResult(DatabaseName.IML, query, null);
        }
    }
}
